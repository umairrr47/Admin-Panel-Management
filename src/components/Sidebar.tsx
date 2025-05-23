import React from 'react';
import { ChevronDown, Filter, Inbox, Search, Settings, User } from 'lucide-react';
import { Chat, findUserById } from '../data/dummyChats';
import { formatRelativeTime } from '../utils/formatters';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  onChatSelect,
  collapsed = false,
  onToggleCollapse,
}) => {
  if (collapsed) {
    return (
      <div className="w-16 border-r border-gray-200 bg-white flex flex-col h-full">
        <div className="p-2 flex justify-center">
          <button 
            onClick={onToggleCollapse}
            className="text-gray-500 hover:text-indigo-600"
          >
            <ChevronDown className="w-5 h-5 transform rotate-90" />
          </button>
        </div>
        <div className="flex flex-col items-center p-2 space-y-4 mt-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Inbox className="w-5 h-5 text-gray-600" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <button 
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-indigo-600"
        >
          <ChevronDown className="w-5 h-5 transform -rotate-90" />
        </button>
      </div>

      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-indigo-500 focus:bg-white"
          />
          <Search className="w-4 h-4 text-gray-500 absolute top-3 left-3" />
        </div>
      </div>

      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Inbox className="w-4 h-4 mr-2" />
          <span>All Conversations</span>
        </div>
        <button className="text-gray-500 hover:text-indigo-600">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        {chats.map((chat) => {
          const user = findUserById(chat.userId);
          const lastMessage = chat.messages[chat.messages.length - 1];
          
          return (
            <div
              key={chat.id}
              className={`p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                chat.id === activeChat ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {chat.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{user?.name}</h3>
                    <span className="text-xs text-gray-500">{formatRelativeTime(chat.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">{chat.subject}</p>
                  <p className="text-xs text-gray-600 truncate mt-1">{lastMessage?.content}</p>
                  {user?.isVIP && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs rounded">VIP</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;