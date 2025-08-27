import OpenAI from 'openai';
import { OPENAI_API_KEY, OPENAI_ASSISTANT_ID } from '../config/env';

class OpenAIService {
  private static instance: OpenAIService;
  private client: OpenAI | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  initialize() {
    if (!OPENAI_API_KEY || !OPENAI_ASSISTANT_ID) {
      this.initialized = false;
      return;
    }

    this.client = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy
    });
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async createThread() {
    if (!this.initialized || !this.client) {
      throw new Error('OpenAI service not initialized. Please check your environment variables.');
    }
    return await this.client.beta.threads.create();
  }

  async sendMessage(threadId: string, content: string) {
    if (!this.initialized || !this.client) {
      throw new Error('OpenAI service not initialized. Please check your environment variables.');
    }

    await this.client.beta.threads.messages.create(threadId, {
      role: 'user',
      content
    });

    const run = await this.client.beta.threads.runs.create(threadId, {
      assistant_id: OPENAI_ASSISTANT_ID!
    });

    // Poll for the run completion
    let runStatus = await this.client.beta.threads.runs.retrieve(threadId, run.id);
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await this.client.beta.threads.runs.retrieve(threadId, run.id);
    }

    // Check if the run completed successfully
    if (runStatus.status === 'failed') {
      throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
    }

    if (runStatus.status !== 'completed') {
      throw new Error(`Assistant run did not complete successfully. Status: ${runStatus.status}`);
    }

    // Get the messages after the run completes
    const messages = await this.client.beta.threads.messages.list(threadId);
    
    // Find the first message from the assistant (should be the most recent)
    const assistantMessage = messages.data.find(message => message.role === 'assistant');
    
    if (!assistantMessage) {
      throw new Error('No assistant response found');
    }

    // Make sure the message has content
    if (!assistantMessage.content || assistantMessage.content.length === 0) {
      throw new Error('Assistant response is empty');
    }

    // Remove source citations like 【6:7†source】 from the response
    const responseText = assistantMessage.content[0].text.value;
    const cleanedText = responseText.replace(/【.*?】/g, '');
    
    return cleanedText;
  }
}

export const openAIService = OpenAIService.getInstance();