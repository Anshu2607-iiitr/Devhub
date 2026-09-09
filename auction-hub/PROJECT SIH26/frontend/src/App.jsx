import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import AuthGatewayPage from './pages/AuthGatewayPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import RiskQueuePage from './pages/RiskQueuePage';
import MapMonitoringPage from './pages/MapMonitoringPage';
import EvidenceViewerPage from './pages/EvidenceViewerPage';
import ContractorsPage from './pages/ContractorsPage';
import CitizenFeedbackPage from './pages/CitizenFeedbackPage';
import ReportsPage from './pages/ReportsPage';
import AuditTrailPage from './pages/AuditTrailPage';
import ContractorPortalPage from './pages/ContractorPortalPage';
import CitizenPortalPage from './pages/CitizenPortalPage';
import ProjectDetailModal from './components/ProjectDetailModal';
import FloatingAssistant from './components/FloatingAssistant';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to logged-in for immediate demo view
  const [currentUser, setCurrentUser] = useState({
    role: 'admin',
    name: 'Dr. Rameshwar Oraon',
    email: 'admin.jharkhand@nic.in',
    department: 'Jharkhand State Nodal Directorate',
    designation: 'State Nodal Officer',
    badge: 'GOV-ADMIN-SEC-1'
  });

  const [activeNav, setActiveNav] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login from Gateway
  const handleLogin = (userProfile) => {
    setCurrentUser(userProfile);
    setIsAuthenticated(true);
    if (userProfile.role === 'admin') {
      setActiveNav('overview');
    } else if (userProfile.role === 'contractor') {
      setActiveNav('contractor-portal');
    } else if (userProfile.role === 'citizen') {
      setActiveNav('citizen-portal');
    }
  };

  // Handle Logout to Gateway
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Live Role Switcher for Hackathon Evaluators
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
      setActiveNav('overview');
    } else if (newRole === 'contractor') {
      setCurrentUser({
        role: 'contractor',
        name: 'ABC Infrastructure Ltd.',
        vendorId: 'JH-CON-2026-089',
        contractTitle: 'MPLAD-JH-2026-089: Rural Road Improvement',
        designation: 'Authorized General Contractor',
        badge: 'VERIFIED-CONTRACTOR'
      });
      setActiveNav('contractor-portal');
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
      setActiveNav('citizen-portal');
    }
  };

  const handleSelectProject = (proj) => {
    setSelectedProject(proj);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && activeNav !== 'projects') {
      setActiveNav('projects');
    }
  };

  // If not authenticated, display the 3-Role Auth Gateway
  if (!isAuthenticated) {
    return <AuthGatewayPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* Persistent Left Sidebar (Role-Adapted) */}
      <Sidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        highRiskCount={86} 
        feedbackCount={3}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Government Header with Live Persona Switcher */}
        <TopHeader 
          activeNav={activeNav} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {activeNav === 'overview' && (
              <DashboardPage 
                onSelectProject={handleSelectProject} 
                onNavigate={setActiveNav} 
              />
            )}

            {activeNav === 'projects' && (
              <ProjectsPage 
                onSelectProject={handleSelectProject} 
              />
            )}

            {activeNav === 'risk-queue' && (
              <RiskQueuePage 
                onSelectProject={handleSelectProject} 
              />
            )}

            {activeNav === 'map' && (
              <MapMonitoringPage 
                onSelectProject={handleSelectProject} 
              />
            )}

            {activeNav === 'evidence' && (
              <EvidenceViewerPage />
            )}

            {activeNav === 'contractors' && (
              <ContractorsPage />
            )}

            {activeNav === 'citizen-feedback' && (
              <CitizenFeedbackPage />
            )}

            {activeNav === 'reports' && (
              <ReportsPage />
            )}

            {activeNav === 'audit-trail' && (
              <AuditTrailPage />
            )}

            {activeNav === 'contractor-portal' && (
              <ContractorPortalPage 
                onNavigate={setActiveNav} 
              />
            )}

            {activeNav === 'citizen-portal' && (
              <CitizenPortalPage />
            )}

          </div>

          {/* Clean Government Footer */}
          <footer className="max-w-7xl mx-auto mt-12 pt-6 pb-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">FundGuard AI</span>
              <span>• Smart India Hackathon 2026 Engineering Product</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Ministry of Statistics and Programme Implementation (MoSPI) • Human-in-the-Loop Vigilance Platform
            </div>
          </footer>
        </main>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Floating Explainable AI Assistant */}
      <FloatingAssistant />

    </div>
  );
}
