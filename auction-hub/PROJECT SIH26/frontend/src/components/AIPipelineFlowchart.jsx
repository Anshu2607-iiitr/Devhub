import React from 'react';
import { ArrowRight, Database, ShieldCheck, Cpu, Layers, HelpCircle, CheckCircle2, UserCheck } from 'lucide-react';

export default function AIPipelineFlowchart() {
  const steps = [
    {
      title: 'DATA SOURCES',
      items: ['Project Sanctions', 'Progress Photos', 'GPS Coordinates', 'Financial Outlays', 'Contractor Dossiers', 'Citizen Reports'],
      icon: Database,
      color: 'border-blue-300 bg-blue-50/50 text-blue-900'
    },
    {
      title: 'SECURE DATA INGESTION',
      items: ['Exif Tamper Lock', 'Geofence Validator', 'Subword TF-IDF', 'Poisson Baseline'],
      icon: ShieldCheck,
      color: 'border-cyan-300 bg-cyan-50/50 text-cyan-900'
    },
    {
      title: 'AI ANALYSIS ENGINE',
      items: ['Computer Vision (CV)', 'Geospatial Deviation', 'Financial Analytics', 'Timeline Hazard', 'NLP Similarity', 'Contractor History'],
      icon: Cpu,
      color: 'border-amber-300 bg-amber-50/50 text-amber-900'
    },
    {
      title: 'MULTI-SIGNAL RISK FUSION',
      items: ['0–100 Risk Index', 'Weight Distribution', 'Divergence Calculation', 'Anomaly Clustering'],
      icon: Layers,
      color: 'border-purple-300 bg-purple-50/50 text-purple-900'
    },
    {
      title: 'EXPLAINABLE AI (XAI)',
      items: ['SHAP Local Impacts', 'Plain Language Explainer', 'Evidence Cross-Reference', 'Interactive Chatbot'],
      icon: HelpCircle,
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900'
    },
    {
      title: 'GOVERNMENT VERIFICATION',
      items: ['Priority Queue Triage', 'Official Spot-Check Order', 'Field Verification', 'Immutable Audit Trail'],
      icon: UserCheck,
      color: 'border-slate-400 bg-slate-100 text-slate-900'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            AI Pipeline & Verification Flowchart
          </h3>
          <p className="text-xs text-slate-500">
            End-to-end continuous ingestion, multi-modal analysis, explainability, and official human verification loop
          </p>
        </div>
        <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-mono">
          2D Architecture Standard
        </span>
      </div>

      {/* Horizontal Flowchart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className={`p-3 rounded-lg border ${step.color} flex flex-col justify-between space-y-2 relative shadow-2xs`}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider block">{step.title}</span>
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                </div>
                <ul className="text-[10px] space-y-1 text-slate-600">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-slate-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
