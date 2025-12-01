import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, Terminal } from 'lucide-react';
import { sendMessageToZetsu, resetChat } from '../services/gemini';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Bonjour. Je suis Zetsu AI. Comment puis-je vous aider à sécuriser votre système aujourd\'hui ? Je peux analyser des scénarios de risque ou vous expliquer nos fonctionnalités.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a placeholder for the model response
      const modelMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      const stream = await sendMessageToZetsu(userMessage.text);
      
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: fullText }
            : msg
        ));
      }

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Erreur de connexion au module neuronal. Veuillez réessayer.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetChat();
    setMessages([{
      id: Date.now().toString(),
      role: 'model',
      text: 'Session réinitialisée. En attente de nouvelles directives de sécurité.',
      timestamp: new Date()
    }]);
  };

  return (
    <div id="assistant" className="py-20 bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Zetsu <span className="text-zetsu-accent">Cyber-Assistant</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Utilisez notre IA entraînée sur des millions de menaces pour obtenir des conseils immédiats ou comprendre comment Zetsu vous protège.
          </p>
        </div>

        <div className="bg-zetsu-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
          {/* Sidebar / Info Panel */}
          <div className="hidden md:flex flex-col w-1/3 bg-zetsu-900 p-6 border-r border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-zetsu-accent/10 rounded-lg">
                <Bot className="w-8 h-8 text-zetsu-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white">État du Système</h3>
                <span className="flex items-center gap-2 text-xs text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  En ligne
                </span>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Terminal size={14} /> Capacités
                </h4>
                <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                  <li>Analyse de risques potentiels</li>
                  <li>Explication technique des malwares</li>
                  <li>Recommandations de confidentialité</li>
                  <li>Support technique Zetsu</li>
                </ul>
              </div>
              
              <div className="mt-auto pt-4 text-xs text-gray-500">
                Propulsé par Google Gemini 2.5 Flash
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-900/50 relative">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                    } ${msg.isError ? 'border-red-500 bg-red-900/20' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
                        {msg.role === 'model' ? <Bot size={12} /> : <User size={12} />}
                        <span>{msg.role === 'model' ? 'Zetsu AI' : 'Vous'}</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-zetsu-800 border-t border-gray-700">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Réinitialiser la conversation"
                >
                  <RefreshCw size={20} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez une question sur la sécurité..."
                  className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-zetsu-accent focus:border-transparent placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-zetsu-accent text-zetsu-900 font-bold p-3 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;