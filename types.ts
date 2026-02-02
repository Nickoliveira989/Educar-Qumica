
export enum HazardLevel {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}

export enum PhysicalState {
  SOLID = 'SOLID',
  LIQUID = 'LIQUID',
  GAS = 'GAS'
}

export interface Substance {
  id: string;
  name: string;
  formula: string;
  color: string;
  state: PhysicalState;
  description: string;
  icon: string;
}

export interface ReactionResult {
  title: string;
  explanation: string;
  hazard: HazardLevel;
  visualEffect: 'bubbles' | 'explosion' | 'colorChange' | 'none';
  newColor?: string;
}

export interface LabState {
  currentMixture: Substance[];
  reactionResult: ReactionResult | null;
  isProcessing: boolean;
}
