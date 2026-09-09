import React from 'react';
import ContractorPortal from '../components/ContractorPortal';

export default function ContractorPortalPage({ onNavigate }) {
  return (
    <div className="space-y-4">
      <ContractorPortal onNavigateToProjects={() => onNavigate('projects')} />
    </div>
  );
}
