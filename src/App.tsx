import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageComposer from './components/MessageComposer';
import AICopilot from './components/AICopilot';
import UserDetailsPanel from './components/UserDetailsPanel';
import { Chat, chats, findChatById, findUserForChat } from './data/dummyChats';
import { getAIConversationSummary, getAISuggestionsForChat } from './data/aiResponses';
import { MessageSquareText, User } from 'lucide-react';

function App() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    const selectedChat = findChatById(chatId);
    setActiveChat(selectedChat || null);
  };


  const handleSendMessage = (content: string) => {
    if (!activeChat) return;
    
    console.log(`Sending message: ${content} to chat ${activeChat.id}`);
    
    const newMessage = {
      id: `new-${Date.now()}`,
      senderId: 'agent',
      content,
      timestamp: new Date().toISOString(),
      type: 'agent' as const
    };
    
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastMessageTime: '1 second ago'
    };
    
    setActiveChat(updatedChat);
  };

  const handleAddToComposer = (text: string) => {
    setAiSuggestion(text);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        chats={chats}
        activeChat={activeChatId}
        onChatSelect={handleChatSelect}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {!activeChat ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquareText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to BeyondChats</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a conversation from the sidebar to begin chatting with your customers.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col">
              <ChatWindow chat={activeChat} />
              <MessageComposer 
                onSendMessage={handleSendMessage} 
                aiSuggestion={aiSuggestion}
                onClearSuggestion={() => setAiSuggestion(null)}
              />
            </div>
            
            <AICopilot 
              suggestions={getAISuggestionsForChat(activeChat.id)} 
              conversationSummary={getAIConversationSummary(activeChat.id)}
              onAddToComposer={handleAddToComposer}
            />
          </div>
        </div>
      )}

      <UserDetailsPanel 
        user={activeChatId ? findUserForChat(activeChatId) : null}
        visible={showUserDetails}
        onClose={() => setShowUserDetails(false)}
      />

      {activeChat && (
        <button
          onClick={() => setShowUserDetails(!showUserDetails)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50 md:hidden"
        >
        </button>
      )}
    </div>
  );
}

export default App;