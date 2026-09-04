import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  TrendingUp,
  User,
  Settings,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { ProgressBar } from '../common/ProgressBar';

export const Sidebar = () => {
  const { user } = useAuth();
  const { getOverallProgress } = useProgress();
  const { percent, completedCount, totalLessons } = getOverallProgress();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Curriculum', path: '/course/java', icon: BookOpen, badge: '58 Mods' },
    { name: 'Practice Arena', path: '/practice', icon: Code2, badge: '58 Quizzes' },
    { name: 'Coding Arena', path: '/coding', icon: Award, badge: 'LC/CP/HDL' },
    { name: 'Code Playground', path: '/playground', icon: Sparkles, badge: 'Live IDE' },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between bg-[#0B0F19] border-r border-white/10 min-h-[calc(100vh-4rem)] p-4 sticky top-16">
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold font-mono uppercase tracking-wider text-slate-500">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 transition-colors group-hover:text-purple-400" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="rounded-2xl p-4 bg-slate-900/90 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              Java 21 Track
            </span>
            <span className="font-mono text-purple-400">{percent}%</span>
          </div>
          <ProgressBar value={completedCount} max={totalLessons || 1} color="purple" size="sm" />
          <div className="mt-2 text-[11px] text-slate-500 font-mono flex justify-between">
            <span>{completedCount} of {totalLessons} lessons</span>
            <NavLink to="/course/java" className="text-purple-400 hover:underline flex items-center">
              View <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20">
        <div className="flex items-center space-x-2 text-xs font-semibold text-purple-200">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Full Stack & Spring AI</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
          31 enterprise modules with Kafka, DeepSeek LLM, and cloud DevOps.
        </p>
      </div>
    </aside>
  );
};
