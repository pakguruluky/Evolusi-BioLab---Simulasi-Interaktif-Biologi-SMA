import React, { useState } from 'react';
import { SubSimulasiTab } from '../types';
import { TheorySimulation } from './simulations/TheorySimulation';
import { NaturalSelectionSimulation } from './simulations/NaturalSelectionSimulation';
import { HardyWeinbergSimulation } from './simulations/HardyWeinbergSimulation';
import { SpeciationSimulation } from './simulations/SpeciationSimulation';
import { FlaskConical, Dna, Activity, GitBranch } from 'lucide-react';

interface Props {
  onExportToLKPD?: (data: any) => void;
}

export const SimulasiHub: React.FC<Props> = ({ onExportToLKPD }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubSimulasiTab>('teori');

  return (
    <div className="space-y-6">
      {/* Sub-tab switcher */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('teori')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
            activeSubTab === 'teori'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>1. Teori Evolusi</span>
        </button>

        <button
          onClick={() => setActiveSubTab('seleksi')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
            activeSubTab === 'seleksi'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>2. Seleksi Alam</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hardy-weinberg')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
            activeSubTab === 'hardy-weinberg'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>3. Hardy-Weinberg</span>
        </button>

        <button
          onClick={() => setActiveSubTab('spesiasi')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
            activeSubTab === 'spesiasi'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>4. Spesiasi & Isolasi</span>
        </button>
      </div>

      {/* Render Active Sub-Simulation */}
      <div>
        {activeSubTab === 'teori' && <TheorySimulation onExportToLKPD={onExportToLKPD} />}
        {activeSubTab === 'seleksi' && <NaturalSelectionSimulation onExportToLKPD={onExportToLKPD} />}
        {activeSubTab === 'hardy-weinberg' && <HardyWeinbergSimulation onExportToLKPD={onExportToLKPD} />}
        {activeSubTab === 'spesiasi' && <SpeciationSimulation onExportToLKPD={onExportToLKPD} />}
      </div>
    </div>
  );
};
