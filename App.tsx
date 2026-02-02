
import React, { useState, useEffect, useCallback } from 'react';
import { SUBSTANCES } from './constants';
import { Substance, LabState, HazardLevel } from './types';
import { analyzeReaction } from './services/geminiService';
import Beaker from './components/Beaker';
import SubstanceCard from './components/SubstanceCard';

const App: React.FC = () => {
  const [lab, setLab] = useState<LabState>({
    currentMixture: [],
    reactionResult: null,
    isProcessing: false,
  });

  const handleAddSubstance = useCallback((substance: Substance) => {
    if (lab.isProcessing) return;
    
    setLab(prev => ({
      ...prev,
      currentMixture: [...prev.currentMixture, substance],
      reactionResult: null // Reset result when adding new stuff
    }));
  }, [lab.isProcessing]);

  const handleReset = () => {
    setLab({
      currentMixture: [],
      reactionResult: null,
      isProcessing: false,
    });
  };

  useEffect(() => {
    // Only analyze if we have at least 2 substances or if specific conditions are met
    if (lab.currentMixture.length >= 2 && !lab.reactionResult && !lab.isProcessing) {
      const performAnalysis = async () => {
        setLab(prev => ({ ...prev, isProcessing: true }));
        const result = await analyzeReaction(lab.currentMixture);
        setLab(prev => ({ ...prev, reactionResult: result, isProcessing: false }));
      };
      
      performAnalysis();
    }
  }, [lab.currentMixture, lab.reactionResult, lab.isProcessing]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 p-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-600 p-2 rounded-lg shadow-lg shadow-cyan-900/20">
              <i className="fas fa-vial-circle-check text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">LabQuímica <span className="text-cyan-500 italic">Virtual</span></h1>
              <p className="text-[10px] text-slate-400 font-medium">EXPLORE • MISTURE • APRENDA</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-red-900/30 text-slate-300 hover:text-red-400 rounded-lg transition-all border border-slate-600 hover:border-red-900/50"
          >
            <i className="fas fa-undo"></i>
            <span className="text-sm font-bold">Limpar Bancada</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Shelf */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <section className="bg-slate-800/30 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-sm font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
              <i className="fas fa-boxes-stacked text-cyan-500"></i>
              Prateleira de Reagentes
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {SUBSTANCES.map(s => (
                <SubstanceCard 
                  key={s.id} 
                  substance={s} 
                  onAdd={handleAddSubstance} 
                  disabled={lab.isProcessing || lab.currentMixture.length >= 4}
                />
              ))}
            </div>
          </section>

          <section className="bg-slate-800/30 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-sm font-black text-slate-400 uppercase mb-2">Resumo da Bancada</h2>
            <div className="space-y-2">
              {lab.currentMixture.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Adicione reagentes para começar...</p>
              ) : (
                lab.currentMixture.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded border border-slate-800">
                    <span className="font-bold text-slate-300">{s.name}</span>
                    <span className="font-mono text-cyan-600">{s.formula}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Center: Lab Bench */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-10 order-1 lg:order-2">
          <div className="relative w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-slate-800/20 blur-2xl -z-10"></div>
            <Beaker contents={lab.currentMixture} result={lab.reactionResult} isProcessing={lab.isProcessing} />
          </div>
          <div className="mt-20 w-full h-8 bg-slate-800 border-b-8 border-slate-950 rounded-lg shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <p className="text-slate-500 text-[10px] mt-4 uppercase tracking-[0.2em] font-black">Bancada de Segurança Nível 4</p>
        </div>

        {/* Right Column: AI Analysis */}
        <div className="lg:col-span-4 order-3">
          <div className="h-full bg-slate-800/50 border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <i className="fas fa-microscope text-6xl"></i>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900">
                <i className="fas fa-brain animate-pulse"></i>
              </div>
              <h2 className="font-black text-lg tracking-tight">Relatório de Reação AI</h2>
            </div>

            {lab.isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-20">
                <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-cyan-500 animate-[loading_1.5s_infinite]"></div>
                </div>
                <p className="text-sm text-slate-400 animate-pulse font-mono">Processando dinâmica molecular...</p>
              </div>
            ) : lab.reactionResult ? (
              <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`p-4 rounded-2xl border-2 flex items-start gap-4 ${
                  lab.reactionResult.hazard === HazardLevel.DANGER ? 'bg-red-950/20 border-red-900/50' : 
                  lab.reactionResult.hazard === HazardLevel.WARNING ? 'bg-yellow-950/20 border-yellow-900/50' :
                  'bg-emerald-950/20 border-emerald-900/50'
                }`}>
                  <i className={`fas ${
                    lab.reactionResult.hazard === HazardLevel.DANGER ? 'fa-triangle-exclamation text-red-500' : 
                    lab.reactionResult.hazard === HazardLevel.WARNING ? 'fa-circle-exclamation text-yellow-500' :
                    'fa-circle-check text-emerald-500'
                  } text-xl mt-1`}></i>
                  <div>
                    <h3 className="font-bold text-slate-100">{lab.reactionResult.title}</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{lab.reactionResult.hazard}</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-700/50 flex-1">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {lab.reactionResult.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Efeito Visual</p>
                    <p className="text-xs font-mono text-cyan-400 capitalize">{lab.reactionResult.visualEffect}</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Status Térmico</p>
                    <p className="text-xs font-mono text-cyan-400">Estável</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-50">
                <i className="fas fa-vials text-4xl text-slate-700"></i>
                <p className="text-sm text-slate-500 max-w-[200px]">
                  Adicione pelo menos dois reagentes para observar a dinâmica química.
                </p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-slate-700/50">
              <p className="text-[9px] text-slate-600 italic">
                * Simulação baseada em modelos de linguagem para fins educativos. Use com cautela em laboratórios reais.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-4 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        &copy; 2024 LabQuímica Virtual • Powered by Google Gemini
      </footer>

      {/* Custom styles for animations in tailwind style */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;
