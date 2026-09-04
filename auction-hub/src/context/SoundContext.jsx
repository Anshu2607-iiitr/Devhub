import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  playFaahSound,
  playBidSound,
  playGavelSound,
  playTickSound,
  playSoldFanfare,
  playUnsoldBuzzer,
} from '../utils/soundEffects';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('auction_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('auction_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  const triggerFaahSound = (intensity = 1.0, duration = 1.2) => {
    if (soundEnabled) playFaahSound(intensity, duration);
  };

  const triggerBidSound = () => {
    if (soundEnabled) playBidSound();
  };

  const triggerGavelSound = () => {
    if (soundEnabled) playGavelSound();
  };

  const triggerTickSound = (urgent = false) => {
    if (soundEnabled) playTickSound(urgent);
  };

  const triggerSoldFanfare = () => {
    if (soundEnabled) playSoldFanfare();
  };

  const triggerUnsoldBuzzer = () => {
    if (soundEnabled) playUnsoldBuzzer();
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        triggerFaahSound,
        triggerBidSound,
        triggerGavelSound,
        triggerTickSound,
        triggerSoldFanfare,
        triggerUnsoldBuzzer,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
