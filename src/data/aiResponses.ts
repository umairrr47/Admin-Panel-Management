export interface AISuggestion {
  id: string;
  text: string;
  category: 'reply' | 'action' | 'insight';
  hasInternalInfo?: boolean;
  tags?: string[];
}

export interface AIMessage {
  id: string;
  text: string;
  rating?: 'positive' | 'negative' | 'neutral';
}

export interface AIConversationSummary {
  id: string;
  chatId: string;
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  nextSteps?: string[];
}

export const aiSuggestions: Record<string, AISuggestion[]> = {
 
  'chat1': [
    {
      id: 'sug1',
      text: "I can see the issue with your webhook URL. It should be 'webhooks' instead of 'webooks'. Could you update that and try again?",
      category: 'reply',
      tags: ['solution', 'technical']
    },
    {
      id: 'sug2',
      text: "I'll send over our webhook setup guide which includes examples and troubleshooting tips.",
      category: 'reply',
      tags: ['helpful', 'educational']
    },
    {
      id: 'sug3',
      text: "Transfer this conversation to the technical support team",
      category: 'action',
      tags: ['escalation']
    },
    {
      id: 'sug4',
      text: "Would you like me to set up a quick call with one of our integration specialists to help resolve this faster?",
      category: 'reply',
      tags: ['premium-support', 'vip']
    }
  ],
  
  'chat2': [
    {
      id: 'sug5',
      text: "Yes, our Enterprise plan includes all our latest AI features including the sentiment analysis and automated response tools announced last week. I'll send you our detailed feature comparison.",
      category: 'reply',
      tags: ['sales', 'feature-explanation']
    },
    {
      id: 'sug6',
      text: "I can schedule a demo call to show you the new AI features in action if you'd like.",
      category: 'reply',
      tags: ['sales', 'demo']
    },
    {
      id: 'sug7',
      text: "Based on your company size, I'd recommend our Enterprise Plus tier which includes dedicated support and custom training.",
      category: 'reply',
      hasInternalInfo: true,
      tags: ['internal-info', 'pricing']
    },
    {
      id: 'sug8',
      text: "Customer is evaluating competitors - prioritize this conversation",
      category: 'insight',
      hasInternalInfo: true,
      tags: ['internal-info', 'sales-intelligence']
    }
  ],
  
  'generic': [
    {
      id: 'gen1',
      text: "I understand your concern. Let me look into this further for you.",
      category: 'reply',
      tags: ['empathy', 'general']
    },
    {
      id: 'gen2',
      text: "Thank you for bringing this to our attention. We're working on a solution.",
      category: 'reply',
      tags: ['appreciation', 'general']
    },
    {
      id: 'gen3',
      text: "Would you mind providing more details so I can better assist you?",
      category: 'reply',
      tags: ['information-gathering', 'general']
    },
    {
      id: 'gen4',
      text: "Is there anything else I can help you with today?",
      category: 'reply',
      tags: ['closing', 'general']
    }
  ]
};

export const aiConversationSummaries: Record<string, AIConversationSummary> = {
  'chat1': {
    id: 'sum1',
    chatId: 'chat1',
    summary: "Customer is experiencing issues with webhook callbacks not being received. Problem identified as a typo in the webhook URL ('webooks' instead of 'webhooks').",
    keyPoints: [
      "Enterprise customer with API integration issue",
      "Webhook callbacks not being received",
      "URL typo identified as root cause",
      "Customer has premium support status"
    ],
    sentiment: 'neutral',
    nextSteps: [
      "Follow up to confirm issue is resolved after URL correction",
      "Offer to review their integration setup for other potential issues",
      "Share webhook best practices documentation"
    ]
  },
  'chat2': {
    id: 'sum2',
    chatId: 'chat2',
    summary: "Customer is interested in upgrading to the Enterprise plan and has specific questions about the recently announced AI features.",
    keyPoints: [
      "Trial user interested in Enterprise upgrade",
      "Inquiring about new AI features",
      "Potential high-value conversion opportunity",
      "Requesting detailed plan comparison"
    ],
    sentiment: 'positive',
    nextSteps: [
      "Send Enterprise plan feature comparison",
      "Highlight new AI capabilities",
      "Offer personalized demo",
      "Discuss pricing options"
    ]
  },
  'chat3': {
    id: 'sum3',
    chatId: 'chat3',
    summary: "Technical support case regarding contact import errors. Customer is using CSV format but missing required 'email' column.",
    keyPoints: [
      "Contact import functionality issue",
      "CSV missing required field",
      "Customer provided error screenshot",
      "Simple fix identified"
    ],
    sentiment: 'neutral',
    nextSteps: [
      "Confirm issue resolution after column addition",
      "Share import template for future reference",
      "Consider improving error message clarity"
    ]
  }
};

export function getAISuggestionsForChat(chatId: string): AISuggestion[] {
  return aiSuggestions[chatId] || aiSuggestions['generic'] || [];
}

export function getAIConversationSummary(chatId: string): AIConversationSummary | undefined {
  return aiConversationSummaries[chatId];
}

export function generateAIResponse(prompt: string): AIMessage {
  
  const responses = [
    {
      id: 'air1',
      text: "Based on the conversation, I would recommend explaining that the webhook URL needs to be corrected from 'webooks' to 'webhooks' and providing a link to our documentation on proper webhook setup.",
      rating: 'positive'
    },
    {
      id: 'air2',
      text: "The customer appears to be experiencing a common integration issue. I'd suggest mentioning that our system logs show their callbacks are being sent to an incorrect endpoint and offering to provide sample code for proper configuration.",
      rating: 'positive'
    },
    {
      id: 'air3',
      text: "This looks like a case where our debugging tools would be helpful. You could offer to enable enhanced logging temporarily on their account to identify exactly where the integration is failing.",
      rating: 'neutral'
    },
    {
      id: 'air4',
      text: "Since this is a VIP customer, I recommend escalating this to our integration specialists team who can provide direct assistance with setting up their webhooks correctly.",
      rating: 'positive'
    }
  ] as AIMessage[];
  
  return responses[Math.floor(Math.random() * responses.length)];
}