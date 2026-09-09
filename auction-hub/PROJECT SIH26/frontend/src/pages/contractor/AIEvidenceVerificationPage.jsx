import React from 'react';
import MultimodalCameraWorkspace from '../../components/camera/MultimodalCameraWorkspace';

export default function AIEvidenceVerificationPage({ onNavigate }) {
  return (
    <div className="space-y-6">
      <MultimodalCameraWorkspace onNavigate={onNavigate} />
    </div>
  );
}
