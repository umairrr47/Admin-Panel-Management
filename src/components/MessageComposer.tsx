import React, { useState } from 'react';
import { Paperclip, Send, Smile, Sparkles } from 'lucide-react';

interface MessageComposerProps {
  onSendMessage: (content: string) => void;
  aiSuggestion?: string | null;
  onClearSuggestion?: () => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ 
  onSendMessage, 
  aiSuggestion,
  onClearSuggestion
}) => {
  const [message, setMessage] = useState('');
  const [showSuggestionButtons, setShowSuggestionButtons] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (onClearSuggestion) {
        onClearSuggestion();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAISuggestionUse = () => {
    if (aiSuggestion) {
      setMessage(aiSuggestion);
      if (onClearSuggestion) {
        onClearSuggestion();
      }
    }
  };

  const enhanceButtons = [
    { id: 'friendly', text: 'Make it more friendly' },
    { id: 'shorter', text: 'Make it shorter' },
    { id: 'professional', text: 'Make it more professional' },
  ];

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {aiSuggestion && (
        <div className="mb-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm">
          <div className="flex items-start mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" />
            <span className="text-sm font-medium text-gray-700">AI Suggested Reply</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{aiSuggestion}</p>
          <button 
            onClick={handleAISuggestionUse}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            Use this reply
          </button>
        </div>
      )}

      <div className="relative">
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            onFocus={() => setShowSuggestionButtons(true)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows={3}
          ></textarea>

          {showSuggestionButtons && message.length > 0 && (
            <div className="absolute -top-10 left-0 flex space-x-2 animate-fade-in">
              {enhanceButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className="flex items-center bg-white text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
                  onClick={() => {
                  
                    console.log(`Enhance message with: ${btn.text}`);
                  }}
                >
                  <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                  {btn.text}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-gray-500 hover:text-indigo-600 transition"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-indigo-600 transition"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className={`px-4 py-2 rounded-md flex items-center ${
                message.trim()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="mr-1">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageComposer;