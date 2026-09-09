import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, CheckCircle2, User, 
  HelpCircle, FileText, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function CitizenAIAssistantPage({ onNavigate, lang = 'en' }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: lang === 'hi' 
        ? 'नमस्ते! मैं फंडगार्ड नागरिक एआई सहायक हूँ। मैं एमपीलैड्स परियोजनाओं की जानकारी देने और आपकी शिकायत को संरचित रूप से दर्ज करने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?'
        : 'Hello! I am the FundGuard Citizen AI Assistant. I can help you find MPLADS projects, understand work progress, and structure a ground report. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const samplePrompts = lang === 'hi' ? [
    'सड़क निर्माण में देरी की शिकायत कैसे दर्ज करें?',
    'एमपीलैड्स निधि क्या है और इसका उपयोग कैसे होता है?',
    'मेरे गांव की सड़क का काम रुका हुआ है, क्या करूं?',
    'शिकायत की स्थिति कैसे ट्रैक करें?'
  ] : [
    'I think the road work near my village is suspicious.',
    'How does MPLADS constituency fund allocation work?',
    'What evidence is needed to report a stalled work?',
    'How is my citizen credibility score calculated?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = '';
      if (query.toLowerCase().includes('suspicious') || query.toLowerCase().includes('सड़क') || query.toLowerCase().includes('stalled') || query.toLowerCase().includes('ruka')) {
        reply = lang === 'hi'
          ? 'मैं आपकी शिकायत दर्ज करने में मदद करूँगा। कृपया निम्नलिखित विवरण दें:\n1. कौन सी परियोजना है?\n2. आपने क्या विसंगति देखी?\n3. क्या आपके पास कोई तस्वीर या वीडियो है?\n\nआप सीधे "समस्या दर्ज करें" पृष्ठ पर जाकर भी फोटो अपलोड कर सकते हैं।'
          : 'I can help you report this. Please select the project or share the location:\n\n1. Which project?\n2. What seems unusual (e.g. stalled work, substandard gravel)?\n3. When did you notice it?\n4. Do you have a geo-tagged photograph?\n\nYour report will be submitted for government verification.';
      } else if (query.toLowerCase().includes('credibility') || query.toLowerCase().includes('score')) {
        reply = 'Citizen Credibility Weighting (85/100) is assigned based on verified Mobile OTP and optional Voter ID. It prioritizes genuine reports for inspection without suppressing anonymous reports.';
      } else {
        reply = 'MPLADS provides ₹5 Crore annually to each Member of Parliament for local developmental infrastructure. FundGuard AI correlates contractor claims with citizen ground reality.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>Screen 16: Citizen AI Conversational Assistant</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Natural-Language Complaint Structuring & MPLADS Guidance
          </h2>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
          Bilingual AI Agent
        </span>
      </div>

      {/* Chat Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[460px]">
        
        {/* Messages Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                m.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-700 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed whitespace-pre-line ${
                m.sender === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Sample Questions Ribbon */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-1.5 text-[11px]">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg text-slate-700 transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder={lang === 'hi' ? 'यहाँ अपना प्रश्न या समस्या लिखें...' : 'Type your question or report here...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-sm"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
