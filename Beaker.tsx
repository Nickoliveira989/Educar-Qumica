
import React from 'react';
import { Substance, ReactionResult } from '../types';

interface BeakerProps {
  contents: Substance[];
  result: ReactionResult | null;
  isProcessing: boolean;
}

const Beaker: React.FC<BeakerProps> = ({ contents, result, isProcessing }) => {
  const getLiquidColor = () => {
    if (result?.newColor && result.visualEffect === 'colorChange') return result.newColor;
    if (contents.length === 0) return 'transparent';
    
    // Simple mixing logic: if we have water and something else, take the non-water color
    const nonWater = contents.find(s => s.id !== 'h2o');
    return nonWater ? nonWater.color : contents[0].color;
  };

  const liquidColor = getLiquidColor();

  return (
    <div className="relative w-64 h-80 mx-auto mt-10">
      {/* Glass Beaker Body */}
      <div className="absolute inset-0 border-4 border-slate-400/50 rounded-b-3xl border-t-0 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Scale markings */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-10 px-2 opacity-30">
          {[500, 400, 300, 200, 100].map(val => (
            <div key={val} className="w-full h-px bg-white text-[10px] flex items-center">{val}ml</div>
          ))}
        </div>

        {/* Liquid Content */}
        {contents.length > 0 && (
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ease-in-out ${liquidColor}`}
            style={{ 
              height: `${Math.min(contents.length * 20 + 20, 95)}%`,
              backgroundColor: result?.newColor && result.visualEffect === 'colorChange' ? result.newColor : undefined
            }}
          >
            {/* Surface wave effect */}
            <div className="absolute -top-2 left-0 right-0 h-4 bg-white/20 rounded-full blur-sm animate-pulse"></div>
            
            {/* Bubbles effect */}
            {result?.visualEffect === 'bubbles' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-white/40 rounded-full animate-bounce"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      left: `${Math.random() * 100}%`,
                      bottom: `-${Math.random() * 20}%`,
                      animationDuration: `${Math.random() * 2 + 1}s`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explosion overlay */}
        {result?.visualEffect === 'explosion' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-orange-500/30 animate-ping rounded-full"></div>
            <i className="fas fa-burst text-orange-400 text-6xl animate-pulse"></i>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      {/* Beaker Lip */}
      <div className="absolute -top-1 -left-2 -right-2 h-4 border-4 border-slate-400/50 rounded-full"></div>
    </div>
  );
};

export default Beaker;
