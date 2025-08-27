import React, { useState } from 'react';
import { User } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="p-6 bg-imperial-navy text-white flex items-center shadow-md">
      <User className="h-6 w-6 mr-3 text-imperial-teal" />
      <div>
        <h2 className="text-xl font-semibold">Chat with Professor Omar Merlo</h2>
        <p className="text-imperial-teal text-sm font-medium">Marketing Management • Global MBA Programme</p>
      </div>
    </div>
  );
};

export default ChatHeader;