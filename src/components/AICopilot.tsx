import React, { useState } from 'react';
import { AlertTriangle, MessageSquare, Plus, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import { AISuggestion, AIConversationSummary, generateAIResponse } from '../data/aiResponses';

interface AICopilotProps {
  suggestions: AISuggestion[];
  conversationSummary?: AIConversationSummary;
  onAddToComposer: (text: string) => void;
}

const AICopilot: React.FC<AICopilotProps> = ({
  suggestions,
  conversationSummary,
  onAddToComposer,
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const response = generateAIResponse(aiPrompt);
      setAiResponse(response.text);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-72 bg-gray-50 border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-800 flex items-center">
          <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
          AI Copilot
        </h2>
      </div>

      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleAskAI}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Ask AI for help
          </label>
          <div className="relative">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="How do I explain webhooks?"
              className="w-full p-2 pr-10 border border-gray-200 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!aiPrompt.trim() || loading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                !aiPrompt.trim() || loading ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-3 text-center">
            <div className="animate-pulse flex space-x-2 justify-center">
              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
              <div className="h-2 w-2 bg-indigo-500 rounded-full animation-delay-200"></div>
              <div className="h-2 w-2 bg-indigo-500 rounded-full animation-delay-400"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Thinking...</p>
          </div>
        )}

        {aiResponse && !loading && (
          <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-3">{aiResponse}</p>
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-green-600">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onAddToComposer(aiResponse)}
                className="text-xs flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add to composer
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
     
        {conversationSummary && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">Conversation Summary</h3>
            <p className="text-xs text-gray-600 mb-2">{conversationSummary.summary}</p>
            
            <h4 className="text-xs font-medium text-gray-700 mt-3 mb-1">Key Points</h4>
            <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
              {conversationSummary.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            
            {conversationSummary.nextSteps && (
              <>
                <h4 className="text-xs font-medium text-gray-700 mt-3 mb-1">Suggested Next Steps</h4>
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                  {conversationSummary.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Suggested Replies</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className={`p-3 rounded-lg border ${suggestion.hasInternalInfo ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-white'}`}
              >
                {suggestion.hasInternalInfo && (
                  <div className="flex items-center text-amber-600 mb-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    <span className="text-xs font-medium">Contains internal info</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-2">{suggestion.text}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {suggestion.tags?.map((tag, i) => (
                      <span key={i} className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onAddToComposer(suggestion.text)}
                    className="text-xs flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICopilot;