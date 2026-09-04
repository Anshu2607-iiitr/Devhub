import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { AppLayout } from './components/layout/AppLayout';
import { GlobalCheatSheetModal } from './components/common/GlobalCheatSheetModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { CourseRoadmapPage } from './pages/CourseRoadmapPage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProgressPage } from './pages/ProgressPage';
import { PracticePage } from './pages/PracticePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { CodingArenaPage } from './pages/CodingArenaPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <GlobalCheatSheetModal />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Immersive Learning & Quiz views */}
            <Route path="/learn/:lessonId" element={<LearnPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />

            {/* Shell Layout Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/course/java" element={<CourseRoadmapPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/coding" element={<CodingArenaPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
