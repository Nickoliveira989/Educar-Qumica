
import { Substance, PhysicalState } from './types';

export const SUBSTANCES: Substance[] = [
  {
    id: 'h2o',
    name: 'Água',
    formula: 'H₂O',
    color: 'bg-blue-400/40',
    state: PhysicalState.LIQUID,
    description: 'Solvente universal.',
    icon: 'fa-droplet'
  },
  {
    id: 'na',
    name: 'Sódio Metálico',
    formula: 'Na',
    color: 'bg-slate-400',
    state: PhysicalState.SOLID,
    description: 'Metal altamente reativo.',
    icon: 'fa-cube'
  },
  {
    id: 'hcl',
    name: 'Ácido Clorídrico',
    formula: 'HCl',
    color: 'bg-yellow-100/30',
    state: PhysicalState.LIQUID,
    description: 'Ácido forte e corrosivo.',
    icon: 'fa-flask-vial'
  },
  {
    id: 'naoh',
    name: 'Hidróxido de Sódio',
    formula: 'NaOH',
    color: 'bg-white/80',
    state: PhysicalState.LIQUID,
    description: 'Base forte (soda cáustica).',
    icon: 'fa-bottle-droplet'
  },
  {
    id: 'phph',
    name: 'Fenolftaleína',
    formula: 'C₂₀H₁₄O₄',
    color: 'bg-transparent border border-white/20',
    state: PhysicalState.LIQUID,
    description: 'Indicador de pH.',
    icon: 'fa-eye-dropper'
  },
  {
    id: 'cu',
    name: 'Cobre',
    formula: 'Cu',
    color: 'bg-orange-700',
    state: PhysicalState.SOLID,
    description: 'Metal de transição avermelhado.',
    icon: 'fa-gem'
  },
  {
    id: 'ag',
    name: 'Prata',
    formula: 'Ag',
    color: 'bg-zinc-300',
    state: PhysicalState.SOLID,
    description: 'Metal precioso e condutor.',
    icon: 'fa-coins'
  }
];

export const SYSTEM_INSTRUCTION = `
Você é um Professor de Química sênior operando um laboratório virtual.
Sua tarefa é analisar a mistura de duas ou mais substâncias químicas.
Se a mistura for conhecida por ter uma reação específica, explique-a de forma educativa e empolgante.
Se for uma mistura perigosa (ex: Sódio + Água), dê um aviso claro.
Se nada de especial acontecer, explique por que quimicamente não há reação.

Responda APENAS em formato JSON seguindo este esquema:
{
  "title": "Nome da Reação ou Resultado",
  "explanation": "Explicação científica curta em português brasileiro",
  "hazard": "SAFE" | "WARNING" | "DANGER",
  "visualEffect": "bubbles" | "explosion" | "colorChange" | "none",
  "newColor": "CSS color string opcional se houver mudança de cor"
}
`;
