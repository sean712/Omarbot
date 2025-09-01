import React, { useState } from 'react';
import { User } from 'lucide-react';
import { BotConfig } from '../../config/bots';

interface ChatHeaderProps {
  bot: BotConfig;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ bot }) => {
  return (
    <div className="p-6 bg-imperial-navy text-white flex items-center shadow-md">
      <User className="h-6 w-6 mr-3 text-imperial-teal" />
      <div>
        <h2 className="text-xl font-semibold">Chat with {bot.instructor}</h2>
        <p className="text-imperial-teal text-sm font-medium">{bot.module} • {bot.program}</p>
      </div>
    </div>
  );
};

export default ChatHeader;