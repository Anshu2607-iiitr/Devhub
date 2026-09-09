import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, ShieldAlert, Sparkles } from 'lucide-react';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to FundGuard AI Assistant. Ask why any project was flagged, inspect Computer Vision divergence, or understand the explainable risk factors in plain language.',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userQuery, time: 'Just now' }]);

    setTimeout(() => {
      let reply = 'The project risk score is computed by fusing Computer Vision physical progress, GPS distance deviation, expenditure pace, and citizen counter-reports. AI highlights anomalies to prioritize human verification — it does not declare guilt.';

      const q = userQuery.toLowerCase();
      if (q.includes('82') || q.includes('ranchi') || q.includes('road') || q.includes('089')) {
        reply = 'Project MPLAD-JH-2026-089 is rated 82/100 (Critical) because the submitted photo GPS coordinates (23.3552°N, 85.3214°E) deviate by 1.42 km from the registered sanction location, reported expenditure (85.5%) is far ahead of observed physical progress (45%), and the granular sub-base milestone is overdue by 42 days. These signals warrant immediate field verification.';
      } else if (q.includes('khunti') || q.includes('76') || q.includes('114') || q.includes('reuse')) {
        reply = 'Project MPLAD-JH-2026-114 is rated 76/100 because Computer Vision perceptual hash matching flagged an 88% similarity between the August progress photo and an archived 2025 project in Torpa Block. Plinth work is also delayed by 75 days.';
      } else if (q.includes('mismatch') || q.includes('financial') || q.includes('expenditure')) {
        reply = 'An Expenditure–Progress Mismatch occurs when disbursed funds significantly exceed visual completion (e.g., 75% outlay vs 54% progress). This is treated as a financial anomaly requiring verification, not an automated accusation of fraud.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[460px] overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">FundGuard AI Assistant</h4>
                <span className="text-[10px] text-blue-200 font-medium">Explainable Risk Dialogue</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-blue-200 hover:text-white hover:bg-blue-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[10px] text-slate-600">
            <button
              onClick={() => setInput('Why did project 089 get risk score 82?')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap border border-slate-200 transition"
            >
              Why Project 089 is 82?
            </button>
            <button
              onClick={() => setInput('Explain Expenditure vs Progress Mismatch')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap border border-slate-200 transition"
            >
              Explain Mismatch
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask why risk score changed..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition text-xs font-semibold flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-full shadow-lg flex items-center gap-2.5 text-xs border border-blue-700 transition"
        >
          <Bot className="w-4 h-4 text-blue-300" />
          <span>Ask FundGuard AI</span>
        </button>
      )}
    </div>
  );
}
