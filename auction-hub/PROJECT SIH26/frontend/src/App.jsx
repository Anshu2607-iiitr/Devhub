import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExecutiveSummary from './components/ExecutiveSummary';
import ProjectTable from './components/ProjectTable';
import GeospatialMap from './components/GeospatialMap';
import DistrictHeatmap from './components/DistrictHeatmap';
import DuplicateClusters from './components/DuplicateClusters';
import VendorAnalytics from './components/VendorAnalytics';
import ProposalSimulator from './components/ProposalSimulator';
import ProjectDetailModal from './components/ProjectDetailModal';
import GlossaryModal from './components/GlossaryModal';
import { fetchSummary, fetchProjectDetail } from './api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [tableTier, setTableTier] = useState('All');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadSummary = async () => {
    try {
      const data = await fetchSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to load summary analytics:', err);
    }
  };

  const handleSelectProject = async (projectId) => {
    setSelectedProjectId(projectId);
    setModalLoading(true);
    try {
      const detail = await fetchProjectDetail(projectId);
      setSelectedProject(detail);
    } catch (err) {
      console.error('Failed to fetch project detail:', err);
      alert('Could not load project details');
    } finally {
      setModalLoading(false);
    }
  };

  const handleNavigateToProjects = (tier = 'All') => {
    setTableTier(tier);
    setActiveTab('projects');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/50 shadow-2xl flex items-center space-x-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalMonitored={summary?.total_monitored_crores}
        criticalCount={summary?.critical_risk_count}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <ExecutiveSummary
            summary={summary}
            onNavigateToProjects={handleNavigateToProjects}
            onNavigateToSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectTable
            initialTier={tableTier}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'map' && (
          <div className="space-y-8">
            <GeospatialMap
              onSelectDistrict={(dist) => {
                setTableTier('All');
                setActiveTab('projects');
              }}
            />
            <DistrictHeatmap
              onSelectDistrict={(dist) => {
                setTableTier('All');
                setActiveTab('projects');
              }}
            />
          </div>
        )}

        {activeTab === 'duplicates' && (
          <DuplicateClusters
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'vendors' && (
          <VendorAnalytics />
        )}

        {activeTab === 'simulator' && (
          <ProposalSimulator />
        )}
      </main>

      {/* Explainable AI (XAI) Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null);
            setSelectedProjectId(null);
          }}
          onActionUpdated={(id, status, note) => {
            showToast(`Audit Order "${status}" committed for ${id}`);
            loadSummary();
          }}
        />
      )}

      {/* Knowledge Base / Glossary Modal */}
      {isGlossaryOpen && (
        <GlossaryModal onClose={() => setIsGlossaryOpen(false)} />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>MPLADS Vigil Intelligence Platform • SIH 2026</span>
          </div>
          <div>
            FastAPI Backend • Scikit-learn Isolation Forest • Poisson Baseline • NLP TF-IDF Cosine Vectorizer • SHAP Explainability
          </div>
          <div>
            Internal MoSPI & District Collectorate Audit Portal
          </div>
        </div>
      </footer>

    </div>
  );
}
