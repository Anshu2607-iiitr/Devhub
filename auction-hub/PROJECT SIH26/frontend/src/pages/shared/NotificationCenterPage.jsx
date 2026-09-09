import React, { useState } from 'react';
import { 
  Bell, AlertOctagon, CheckCircle2, Info, 
  Clock, ShieldAlert, Filter, CheckCheck, ArrowRight 
} from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../../data/mockData';

export default function NotificationCenterPage({ onNavigate, currentRole = 'admin' }) {
  const [filterRole, setFilterRole] = useState(currentRole);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (filterRole !== 'all' && n.role !== filterRole) return false;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <Bell className="w-4 h-4 text-blue-700" />
            <span>Screen 17: Multi-Role Statutory Notification Centre</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Real-Time Audit Alerts & Verification Dispatch Feed
          </h2>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition flex items-center gap-1"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Filter by Role:</span>
        {['all', 'admin', 'contractor', 'citizen'].map((r) => (
          <button
            key={r}
            onClick={() => setFilterRole(r)}
            className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
              filterRole === r ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {r === 'all' ? 'All Roles' : r === 'admin' ? 'Government' : r}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => {
          const isCritical = n.type === 'critical';
          const isWarning = n.type === 'warning';
          const isSuccess = n.type === 'success';

          return (
            <div
              key={n.id}
              className={`bg-white border rounded-xl p-4 shadow-xs space-y-2 transition ${
                !n.read ? 'border-l-4 border-l-blue-600 border-slate-200' : 'border-slate-200 opacity-90'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}></span>
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                    {n.role}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
