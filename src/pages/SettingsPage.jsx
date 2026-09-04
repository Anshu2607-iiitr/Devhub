import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  Code,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = () => {
  const { resetAllProgress } = useProgress();
  const { user } = useAuth();

  const [soundEffects, setSoundEffects] = useState(true);
  const [editorFontSize, setEditorFontSize] = useState('14px');
  const [activeRecallTimer, setActiveRecallTimer] = useState(true);
  const [resetModal, setResetModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    resetAllProgress();
    setResetModal(false);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 font-medium mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>ENVIRONMENT & PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your quiz feedback, code block typography, and learning preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-400" />
            Learning & Audio Effects
          </h3>

          <div className="space-y-3 divide-y divide-white/5 text-xs sm:text-sm">
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="font-semibold text-slate-200">Celebration Sounds & Confetti</div>
                <div className="text-xs text-slate-400">Trigger particle bursts on 100% quiz completions</div>
              </div>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-semibold text-slate-200">Timed Challenge Countdown</div>
                <div className="text-xs text-slate-400">Show urgency pulse when under 30 seconds</div>
              </div>
              <input
                type="checkbox"
                checked={activeRecallTimer}
                onChange={(e) => setActiveRecallTimer(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            Code Snippet Typography
          </h3>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div className="font-semibold text-slate-200">Editor Font Size</div>
              <div className="text-xs text-slate-400">Font size for Java code listings and diagnostics</div>
            </div>
            <select
              value={editorFontSize}
              onChange={(e) => setEditorFontSize(e.target.value)}
              className="bg-slate-900 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl font-mono text-xs focus:outline-none focus:border-purple-500"
            >
              <option value="12px">12px - Compact</option>
              <option value="14px">14px - Standard</option>
              <option value="16px">16px - Large</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition shadow-glow-sm flex items-center gap-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-rose-500/20 bg-rose-950/10 space-y-4">
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Reset Learning Progress
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reset all completed Java lessons, quiz scores, XP points, and unlocked module states back to initial state for a fresh test run.
          </p>

          <button
            onClick={() => setResetModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold transition"
          >
            Reset All Progress Data
          </button>
        </div>
      </div>

      {resetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card rounded-2xl p-6 border border-white/10 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Confirm Data Reset</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to wipe all lesson completions and quiz scores? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                onClick={() => setResetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
