import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import AuthGatewayPage from './pages/AuthGatewayPage';

// Contractor Portal Screens (Screens 1 to 4)
import ContractorDashboardPage from './pages/contractor/ContractorDashboardPage';
import ProgressSubmissionPage from './pages/contractor/ProgressSubmissionPage';
import AIEvidenceVerificationPage from './pages/contractor/AIEvidenceVerificationPage';

// Government Admin Screens (Screens 5 to 10)
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdvancedAILabPage from './pages/admin/AdvancedAILabPage';
import AIRiskIntelligencePage from './pages/admin/AIRiskIntelligencePage';
import FlaggedProjectsPage from './pages/admin/FlaggedProjectsPage';
import ProjectInvestigationPage from './pages/admin/ProjectInvestigationPage';
import InspectionWorkflowPage from './pages/admin/InspectionWorkflowPage';
import InspectionReportPage from './pages/admin/InspectionReportPage';

// Citizen Portal Screens (Screens 11 to 16)
import CitizenHomePage from './pages/citizen/CitizenHomePage';
import CitizenProjectExplorerPage from './pages/citizen/CitizenProjectExplorerPage';
import ReportIssuePage from './pages/citizen/ReportIssuePage';
import ComplaintTrackerPage from './pages/citizen/ComplaintTrackerPage';
import CitizenAIAssistantPage from './pages/citizen/CitizenAIAssistantPage';

// Shared Screens (Screens 17, 18 & Live Simulation Modal)
import NotificationCenterPage from './pages/shared/NotificationCenterPage';
import AuditTrailPage from './pages/shared/AuditTrailPage';
import LiveCrossPortalSimulationModal from './pages/shared/LiveCrossPortalSimulationModal';

import FloatingAssistant from './components/FloatingAssistant';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [lang, setLang] = useState('en'); // 'en' or 'hi'
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Current Active User Profile
  const [currentUser, setCurrentUser] = useState({
    role: 'admin',
    name: 'Dr. Rameshwar Oraon',
    email: 'admin.jharkhand@nic.in',
    department: 'Jharkhand State Nodal Directorate',
    designation: 'State Nodal Officer',
    badge: 'GOV-ADMIN-SEC-1'
  });

  const [activeNav, setActiveNav] = useState('admin-dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login from Gateway
  const handleLogin = (userProfile) => {
    setCurrentUser(userProfile);
    setIsAuthenticated(true);
    if (userProfile.role === 'admin') {
      setActiveNav('admin-dashboard');
    } else if (userProfile.role === 'contractor') {
      setActiveNav('contractor-dashboard');
    } else if (userProfile.role === 'citizen') {
      setActiveNav('citizen-home');
    }
  };

  // Handle Logout to Gateway
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Live Role Switcher for Hackathon Judges
  const handleSwitchRole = (newRole) => {
    if (newRole === 'admin') {
      setCurrentUser({
        role: 'admin',
        name: 'Dr. Rameshwar Oraon',
        email: 'admin.jharkhand@nic.in',
        department: 'Jharkhand State Nodal Directorate',
        designation: 'State Nodal Officer',
        badge: 'GOV-ADMIN-SEC-1'
      });
      setActiveNav('admin-dashboard');
    } else if (newRole === 'contractor') {
      setCurrentUser({
        role: 'contractor',
        name: 'ABC Infrastructure Ltd.',
        vendorId: 'JH-CON-2026-089',
        contractTitle: 'MPLAD-JH-2026-089: Rural Road Improvement',
        designation: 'Authorized General Contractor',
        badge: 'VERIFIED-CONTRACTOR'
      });
      setActiveNav('contractor-dashboard');
    } else if (newRole === 'citizen') {
      setCurrentUser({
        role: 'citizen',
        name: 'Amit Kumar',
        mode: 'verified',
        constituency: 'Ranchi Parliamentary Constituency',
        ward: 'Ward 12 - Namkum',
        credibilityScore: 85,
        feedbackWeight: 0.85,
        designation: 'Verified Resident (Score: 85/100)',
        badge: 'VERIFIED-CITIZEN'
      });
      setActiveNav('citizen-home');
    }
  };

  // Toggle Language
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  if (!isAuthenticated) {
    return <AuthGatewayPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* Persistent Left Sidebar */}
      <Sidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Government Header with Persona Switcher, Language Toggle, and Live Simulator */}
        <TopHeader 
          activeNav={activeNav} 
          onNavigate={setActiveNav}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onLogout={handleLogout}
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          unreadNotifsCount={3}
        />

        {/* Main Content Area Routing All 18 Screens */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* CONTRACTOR PORTAL SCREENS (1 to 4) */}
            {activeNav === 'contractor-dashboard' && (
              <ContractorDashboardPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'contractor-submit' && (
              <ProgressSubmissionPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'contractor-ai-verify' && (
              <AIEvidenceVerificationPage onNavigate={setActiveNav} />
            )}

            {/* GOVERNMENT ADMIN SCREENS (5 to 10) */}
            {activeNav === 'admin-dashboard' && (
              <AdminDashboardPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-advanced-ai' && (
              <AdvancedAILabPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-risk-intel' && (
              <AIRiskIntelligencePage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-flagged' && (
              <FlaggedProjectsPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-investigation' && (
              <ProjectInvestigationPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-inspections' && (
              <InspectionWorkflowPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'admin-inspection-form' && (
              <InspectionReportPage onNavigate={setActiveNav} />
            )}

            {/* CITIZEN PORTAL SCREENS (11 to 16) */}
            {activeNav === 'citizen-home' && (
              <CitizenHomePage onNavigate={setActiveNav} onSearch={setSearchQuery} lang={lang} />
            )}
            {activeNav === 'citizen-explorer' && (
              <CitizenProjectExplorerPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'citizen-report' && (
              <ReportIssuePage onNavigate={setActiveNav} />
            )}
            {activeNav === 'citizen-tracker' && (
              <ComplaintTrackerPage onNavigate={setActiveNav} />
            )}
            {activeNav === 'citizen-ai' && (
              <CitizenAIAssistantPage onNavigate={setActiveNav} lang={lang} />
            )}

            {/* SHARED SCREENS (17 & 18) */}
            {activeNav === 'shared-notifications' && (
              <NotificationCenterPage onNavigate={setActiveNav} currentRole={currentUser.role} />
            )}
            {activeNav === 'audit-trail' && (
              <AuditTrailPage />
            )}

          </div>

          {/* Clean Government Footer */}
          <footer className="max-w-7xl mx-auto mt-12 pt-6 pb-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">FundGuard AI</span>
              <span>• Smart India Hackathon 2026 Production Platform</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Ministry of Statistics and Programme Implementation (MoSPI) • Digital Public Infrastructure
            </div>
          </footer>
        </main>
      </div>

      {/* 1-Click Interactive Live Cross-Portal Simulation Modal */}
      <LiveCrossPortalSimulationModal 
        isOpen={isSimulatorOpen} 
        onClose={() => setIsSimulatorOpen(false)} 
        onNavigate={setActiveNav} 
      />

      {/* Floating Explainable AI Assistant */}
      <FloatingAssistant />

    </div>
  );
}
