import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, User, ShieldCheck, 
  ArrowRight, Globe, RefreshCw 
} from 'lucide-react';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function CitizenAIAssistantPage({ onNavigate, lang = 'en' }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: lang === 'en' 
        ? 'Namaste! I am the FundGuard Citizen AI Assistant. You can ask me about sanctioned MPLADS works, expenditure records, or how to submit ground feedback in your constituency.'
        : 'नमस्ते! मैं फंडगार्ड नागरिक एआई सहायक हूँ। आप मुझसे स्वीकृत एमपीलैड्स कार्यों, खर्च के विवरण या अपनी शिकायत दर्ज करने के बारे में पूछ सकते हैं।'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const replyText = lang === 'en'
      ? `Based on official MoSPI registers for Ranchi constituency, there are 842 active sanctioned works. Would you like to view project MPLAD-JH-2026-089 or file a grievance report?`
      : `रांची संसदीय क्षेत्र के आधिकारिक रिकॉर्ड के अनुसार, 842 सक्रिय स्वीकृत कार्य हैं। क्या आप परियोजना MPLAD-JH-2026-089 का विवरण देखना चाहते हैं?`;

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: replyText }]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <Bot className="w-4 h-4 text-[#168A78]" />
            <span>Bilingual Citizen AI Assistant (English / हिन्दी)</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Conversational Public Works Intelligence & Scheme Queries
          </h1>
        </div>
      </div>

      <GovernancePrincipleBanner />

      {/* Chat Container */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col h-[480px] justify-between space-y-4">
        
        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#123B67] text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`p-3 rounded-xl max-w-md leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-[#123B67] text-white font-medium rounded-tr-none' 
                  : 'bg-[#F6F8FB] border border-[#E4E9EF] text-slate-800 rounded-tl-none'
              }`}>
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  U
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'en' ? "Ask about any MPLADS project or funds..." : "किसी भी एमपीलैड्स कार्य या राशि के बारे में पूछें..."}
            className="flex-1 bg-[#F6F8FB] border border-[#E4E9EF] rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1D5D9B]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#123B67] hover:bg-[#1D5D9B] text-white font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  );
}
