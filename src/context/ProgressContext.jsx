import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { JAVA_MODULES } from '../data/mockCourseData';
import confetti from 'canvas-confetti';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const [completedLessons, setCompletedLessons] = useState(
    () => user?.completedLessons || ["lesson-1-1", "lesson-1-2", "lesson-2-1"]
  );

  const [completedQuizzes, setCompletedQuizzes] = useState(
    () => user?.completedQuizzes || {}
  );

  const [lastQuizResult, setLastQuizResult] = useState(null);

  useEffect(() => {
    if (user?.completedLessons) {
      setCompletedLessons(user.completedLessons);
    }
    if (user?.completedQuizzes) {
      setCompletedQuizzes(user.completedQuizzes);
    }
  }, [user]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#38bdf8', '#10b981', '#f59e0b', '#ec4899']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      updateUser(prev => ({
        ...prev,
        completedLessons: updated,
        totalXp: (prev.totalXp || 0) + 25,
      }));
    }
  };

  const recordQuizCompletion = ({ quizId, lessonId, moduleId, score, accuracy, xpEarned, userAnswers, totalQuestions, correctCount }) => {
    const isPassing = score >= 70;
    const newQuizRecord = {
      score,
      accuracy,
      xpEarned,
      date: new Date().toISOString().split('T')[0],
      attempts: ((completedQuizzes[quizId]?.attempts || 0) + 1),
      passed: isPassing
    };

    const updatedQuizzes = {
      ...completedQuizzes,
      [quizId]: newQuizRecord
    };

    setCompletedQuizzes(updatedQuizzes);

    let updatedLessons = completedLessons;
    if (isPassing && lessonId && !completedLessons.includes(lessonId)) {
      updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
    }

    const completedModuleIds = JAVA_MODULES.filter(mod => {
      return mod.lessons.every(l => updatedLessons.includes(l.id));
    }).map(m => m.id);

    const quizEntries = Object.values(updatedQuizzes);
    const avgAccuracy = Math.round(
      quizEntries.reduce((sum, q) => sum + (q.score || 0), 0) / (quizEntries.length || 1)
    );

    updateUser(prev => ({
      ...prev,
      totalXp: (prev.totalXp || 0) + xpEarned,
      quizAccuracy: avgAccuracy,
      completedLessons: updatedLessons,
      completedQuizzes: updatedQuizzes,
      completedModules: completedModuleIds,
      level: Math.floor(((prev.totalXp || 0) + xpEarned) / 250) + 1,
    }));

    const resultPayload = {
      quizId,
      lessonId,
      moduleId,
      score,
      accuracy,
      xpEarned,
      userAnswers,
      totalQuestions,
      correctCount,
      passed: isPassing,
      date: new Date()
    };

    setLastQuizResult(resultPayload);
    localStorage.setItem('devhub_last_quiz_result', JSON.stringify(resultPayload));

    if (isPassing) {
      triggerCelebration();
    }

    return resultPayload;
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

  const getModuleProgress = (moduleId) => {
    const mod = JAVA_MODULES.find(m => m.id === moduleId);
    if (!mod || !mod.lessons || mod.lessons.length === 0) return { percent: 0, completed: 0, total: 0 };
    const total = mod.lessons.length;
    const completed = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
    const percent = Math.round((completed / total) * 100);
    return { percent, completed, total };
  };

  const getOverallProgress = () => {
    const totalLessons = JAVA_MODULES.reduce((acc, mod) => acc + (mod.lessons?.length || 1), 0);
    const completedCount = completedLessons.length;
    const percent = Math.min(100, Math.round((completedCount / (totalLessons || 1)) * 100));
    return { percent, completedCount, totalLessons };
  };

  // All 31 modules unlocked for open exploratory learning
  const isModuleLocked = (moduleIndex) => false;

  const resetAllProgress = () => {
    setCompletedLessons([]);
    setCompletedQuizzes({});
    updateUser(prev => ({
      ...prev,
      completedLessons: [],
      completedQuizzes: {},
      completedModules: [],
      totalXp: 0,
      quizAccuracy: 0,
    }));
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        completedQuizzes,
        lastQuizResult,
        completeLesson,
        recordQuizCompletion,
        isLessonCompleted,
        getModuleProgress,
        getOverallProgress,
        isModuleLocked,
        triggerCelebration,
        resetAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
