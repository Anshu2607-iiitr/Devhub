import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LiveAuctionPage from './pages/LiveAuctionPage';
import AdminAuctionControl from './pages/AdminAuctionControl';
import AdminDashboard from './pages/AdminDashboard';
import PlayersPage from './pages/PlayersPage';
import PlayerDetailsPage from './pages/PlayerDetailsPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailsPage from './pages/TeamDetailsPage';
import TeamDashboard from './pages/TeamDashboard';
import TeamSquadPage from './pages/TeamSquadPage';
import TeamBidsPage from './pages/TeamBidsPage';
import TeamBudgetPage from './pages/TeamBudgetPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import AuctionResultsPage from './pages/AuctionResultsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/live/:auctionId" element={<LiveAuctionPage />} />
          <Route path="/live" element={<Navigate to="/live/cpl-2026" replace />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:id" element={<PlayerDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailsPage />} />
          <Route path="/results" element={<AuctionResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Routes */}
          <Route path="/admin/auction" element={<AdminAuctionControl />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/players" element={<PlayersPage />} />
          <Route path="/admin/teams" element={<TeamsPage />} />
          <Route path="/admin/history" element={<AuctionResultsPage />} />
          <Route path="/admin/create-auction" element={<CreateAuctionPage />} />

          {/* Team Manager Routes */}
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/team/squad" element={<TeamSquadPage />} />
          <Route path="/team/bids" element={<TeamBidsPage />} />
          <Route path="/team/budget" element={<TeamBudgetPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
