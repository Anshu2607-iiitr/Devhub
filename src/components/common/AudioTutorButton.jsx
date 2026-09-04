import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Sparkles } from 'lucide-react';

export const AudioTutorButton = ({ textToRead, label = "Listen to Quick Theory" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!isSupported || !textToRead) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // clear queue
    const cleanText = textToRead.replace(/[📌💡#*_`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick Hindi or English voice if available
    const voices = window.speechSynthesis.getVoices();
    const hinglishVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN')) || voices[0];
    if (hinglishVoice) {
      utterance.voice = hinglishVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleToggleSpeech}
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition border ${
        isPlaying
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-sm animate-pulse'
          : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
      }`}
      title="Listen to Hinglish concept in audio"
    >
      {isPlaying ? (
        <>
          <Pause className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pause Voice</span>
          {/* Animated Audio Wave Bars */}
          <span className="flex items-center space-x-0.5 ml-1">
            <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></span>
            <span className="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
