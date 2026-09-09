import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function SectorProgressBar({ type = 'Road', currentStageIndex = 2 }) {
  const roadStages = ['Earthwork', 'Subgrade', 'WMM Base', 'Paving', 'Completion'];
  const buildingStages = ['Foundation', 'Structure (RCC)', 'Masonry', 'Slab', 'Finishing'];
  const waterStages = ['Drilling', 'Submersible Pump', 'Storage Tank', 'Distribution', 'Completion'];

  const stages = type === 'Road' ? roadStages : type === 'Building' ? buildingStages : waterStages;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold text-slate-700 uppercase tracking-wider">
          {type} Sector Milestone Progression
        </span>
        <span className="font-mono text-slate-500 font-semibold">
          Stage {currentStageIndex + 1} of {stages.length}: <strong className="text-[#123B67]">{stages[currentStageIndex]}</strong>
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {stages.map((stg, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <div 
              key={stg} 
              className={`p-2 rounded-lg border text-center transition ${
                isDone 
                  ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]' 
                  : isCurrent 
                  ? 'bg-[#EBF3FA] border-[#1D5D9B] text-[#123B67] font-bold ring-1 ring-[#1D5D9B]' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 text-[#1D5D9B] animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
              <span className="text-[10px] block font-medium leading-tight truncate">{stg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
