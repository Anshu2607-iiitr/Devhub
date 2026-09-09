import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
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
  const [activeNav, setActiveNav] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectProject = (proj) => {
    setSelectedProject(proj);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && activeNav !== 'projects') {
      setActiveNav('projects');
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* Persistent Left Sidebar */}
      <Sidebar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        highRiskCount={86} 
        feedbackCount={3} 
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Government Header */}
        <TopHeader 
          activeNav={activeNav} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
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
