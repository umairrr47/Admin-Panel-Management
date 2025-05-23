import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { Chat, findUserById } from '../data/dummyChats';
import { formatTime } from '../utils/formatters';

interface ChatWindowProps {
  chat: Chat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No chat selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a conversation from the sidebar to get started
          </p>
        </div>
      </div>
    );
  }

  const user = findUserById(chat.userId);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-xs text-gray-500">{chat.subject}</p>
          </div>
        </div>
        <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
          <span>View Profile</span>
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => {
          const isUser = message.type === 'user';
          const avatar = isUser ? user?.avatar : '/path/to/agent-avatar.jpg';
          const name = isUser ? user?.name : 'Support Agent';
          
          return (
            <div key={message.id} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex max-w-[75%] ${isUser ? 'flex-row' : 'flex-row-reverse'}`}>
                {isUser && (
                  <img 
                    src={avatar} 
                    alt={name} 
                    className="h-8 w-8 rounded-full object-cover mr-2 flex-shrink-0"
                  />
                )}
                <div>
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      isUser 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-left' : 'text-right'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {!isUser && (
                  <img 
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Agent" 
                    className="h-8 w-8 rounded-full object-cover ml-2 flex-shrink-0"
                  />
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;