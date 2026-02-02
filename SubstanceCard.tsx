
import React from 'react';
import { Substance } from '../types';

interface SubstanceCardProps {
  substance: Substance;
  onAdd: (substance: Substance) => void;
  disabled: boolean;
}

const SubstanceCard: React.FC<SubstanceCardProps> = ({ substance, onAdd, disabled }) => {
  return (
    <button
      onClick={() => onAdd(substance)}
      disabled={disabled}
      className={`group relative flex flex-col items-center p-3 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-700 transition-all active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`w-12 h-12 rounded-lg mb-2 flex items-center justify-center shadow-inner ${substance.color}`}>
        <i className={`fas ${substance.icon} text-slate-100/80 text-xl`}></i>
      </div>
      <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">{substance.name}</span>
      <span className="text-[10px] text-slate-500 font-mono">{substance.formula}</span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-slate-900 text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-slate-700">
        {substance.description}
      </div>
    </button>
  );
};

export default SubstanceCard;
