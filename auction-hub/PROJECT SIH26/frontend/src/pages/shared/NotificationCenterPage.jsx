import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, AlertOctagon, Clock, 
  ArrowRight, ShieldAlert, FileText, CheckCheck, Trash2 
} from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../../data/mockData';
import GovernancePrincipleBanner from '../../components/GovernancePrincipleBanner';

export default function NotificationCenterPage({ onNavigate, currentRole = 'admin' }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState('all');

  const filtered = notifs.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.type === 'critical';
    return true;
  });

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4E9EF] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#123B67] font-bold text-xs uppercase tracking-wider">
            <Bell className="w-4 h-4 text-[#1D5D9B]" />
            <span>Statutory Notification Feed</span>
          </div>
          <h1 className="text-base font-bold text-[#0F2942] mt-0.5">
            Role-Filtered Alerts, Verification Notices, and Directives
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs transition border border-[#E4E9EF] flex items-center gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#168A78]" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <GovernancePrincipleBanner />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {['all', 'unread', 'critical'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition uppercase text-[11px] ${
              filter === t ? 'bg-[#123B67] text-white shadow-2xs' : 'bg-white text-slate-600 border border-[#E4E9EF] hover:bg-slate-50'
            }`}
          >
            {t} Notifications
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => (
          <div 
            key={n.id}
            className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
              !n.read ? 'bg-white border-[#E4E9EF] shadow-2xs' : 'bg-[#FAFBFC] border-[#E4E9EF] opacity-80'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                n.type === 'critical' ? 'bg-[#FDF2F2] text-[#C95752]' : 'bg-[#EBF3FA] text-[#1D5D9B]'
              }`}>
                {n.type === 'critical' ? <AlertOctagon className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#0F2942]">{n.title}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                </div>
                <p className="text-slate-600">{n.desc}</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('admin-investigation')}
              className="px-3 py-1 bg-white hover:bg-slate-50 text-[#1D5D9B] font-bold text-xs rounded border border-[#E4E9EF] shrink-0"
            >
              Inspect
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
