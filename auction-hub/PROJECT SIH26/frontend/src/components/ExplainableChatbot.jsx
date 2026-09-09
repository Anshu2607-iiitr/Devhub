import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, AlertOctagon, HelpCircle, 
  CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, Cpu 
} from 'lucide-react';

const PRESET_QUERIES = [
  "Why is Project PRJ-2026-089 scored 88 (Critical Risk)?",
  "Why did the risk score increase after Milestone 2?",
  "What visual progress divergence did Computer Vision detect?",
  "Explain the MoSPI allocation ceiling breach in Varanasi constituency.",
  "What evidence triggered the split-vendor duplicate collision alert?"
];

export default function ExplainableChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am the MPLADS Vigil Explainable AI Assistant. You can ask me why any project's risk score changed, inspect Computer Vision divergence, or understand financial and allocation ceiling anomalies in plain language.",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAnswer = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('089') || q.includes('88') || q.includes('critical')) {
      return `**Project PRJ-2026-089** is scored at **88/100 (Critical Risk)** due to 4 converging high-risk signals:
1. **Computer Vision Progress Divergence (+32 pts):** Contractor reported 65% completion, but Computer Vision stage classification estimated only 35% physical progress on ground.
2. **Financial Cost Inflation (+26 pts):** Proposed sanction of ₹68.5 Lakhs exceeds the Varanasi regional benchmark median (₹14.2 Lakhs) by 2.4x (Z-Score: +2.8σ).
3. **NLP Semantic Duplicate Collision (+18 pts):** 89% text & ward similarity match with existing contract PRJ-2026-041 awarded to a different vendor (split-vendor anomaly).
4. **MoSPI Quota Strain (+12 pts):** Single project consumes 38.6% of the MP's remaining multi-year statutory allocation limit.`;
    }

    if (q.includes('milestone') || q.includes('increase')) {
      return `**Risk Score Trajectory Analysis:**
The composite risk score increased from **42 (Moderate)** to **84 (Critical)** at Milestone 2 because:
• **Tranche Release vs Physical Stagnation:** 70% of funds (₹48 Lakhs) were disbursed while physical progress remained frozen at 25% for >90 days.
• **Citizen Counter-Reports:** 14 geo-verified local residents submitted photographic evidence confirming zero activity on-site.
• **Hazard Rate Exceeded:** Timeline analysis flagged a 180-day delay beyond standard Poisson baseline duration.`;
    }

    if (q.includes('computer vision') || q.includes('cv') || q.includes('visual')) {
      return `**Computer Vision (CV) Diagnostics Breakdown:**
• **Sector Stage Model:** Deep Vision classifier identified 'Earthwork & Foundation' (Stage 1), whereas reported milestone claimed 'Bituminous Paving' (Stage 3).
• **Image Authenticity Score:** 98.2% Genuine Exif metadata (no photoshop alteration).
• **Duplicate Hash Match:** No prior photo re-use detected.
• **Recommendation:** Impose payment freeze on Tranche 2 until physical verification by District Technical Committee.`;
    }

    if (q.includes('allocation') || q.includes('ceiling') || q.includes('varanasi')) {
      return `**MoSPI Statutory Allocation Ceiling Analysis (Varanasi):**
• **Hon'ble MP Allocation Cap:** ₹14.70 Crores (18th Lok Sabha 3-year statutory corpus).
• **Monitored Sanction Outlay:** ₹11.20 Crores across 14 sanctioned works.
• **Current Utilization:** 76.2% of total statutory quota.
• **Ceiling Pressure:** 2 recent high-value tenders threaten to breach the 100% allocation ceiling before year-end.`;
    }

    if (q.includes('split-vendor') || q.includes('duplicate')) {
      return `**Split-Vendor Duplicate Collision Explanation:**
• **Detected Pattern:** Two separate contracts with 88%+ semantic scope similarity were awarded to two different contractors (ABC Infra LLP vs Ganga Builders) in the exact same ward within 4 months.
• **Risk:** High probability of duplicate public billing on a single physical asset.
• **AI Action:** Flagged for physical site geo-audit before releasing final settlement.`;
    }

    return `**AI Explainability Assessment for:** "${query}"
• **Composite Risk Model:** Analyzed across Computer Vision visual progress, cost Z-score deviation, Poisson sanction burst frequency, and citizen feedback credibility.
• **Auditor Recommendation:** Review the project's evidence dossier in Flagged Projects Explorer or simulate de-risking scenarios in the What-If Sandbox.`;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' }
    ]);
    
    setLoading(true);
    setTimeout(() => {
      const botResponse = generateAnswer(userText);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botResponse, time: 'Just now' }
      ]);
      setLoading(false);
    }, 700);
  };

  const handlePresetClick = (q) => {
    setInput(q);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Bot className="w-5 h-5" />
            <span>Explainable AI (XAI) Chatbot Assistant</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ask why any project's risk score changed, inspect Computer Vision evidence, or query MoSPI allocation ceiling pressures in plain, legal-grade language.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300">SHAP-Aligned Local Feature XAI</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[560px]">
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium'
                    : 'bg-slate-950 text-slate-200 border border-slate-800'
                }`}
              >
                <div className="whitespace-pre-line font-sans">
                  {m.text}
                </div>
                <span className={`block text-[10px] mt-2 ${m.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                  {m.time}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold font-mono">You</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950 text-slate-400 border border-slate-800 rounded-xl p-3 text-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Synthesizing SHAP feature attribution & CV evidence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-500 font-semibold whitespace-nowrap">Suggested:</span>
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(q)}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask why a risk score changed, CV stage divergence, or allocation strain..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition text-xs flex items-center gap-1.5 shadow"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
