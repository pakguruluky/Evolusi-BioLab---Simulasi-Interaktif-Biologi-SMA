import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Save, TrendingUp, AlertCircle, CheckCircle, Dna } from 'lucide-react';
import { HWGenerationPoint } from '../../types';

interface Props {
  onExportToLKPD?: (data: {
    p: number;
    q: number;
    p2: number;
    pq2: number;
    q2: number;
    status: string;
  }) => void;
}

export const HardyWeinbergSimulation: React.FC<Props> = ({ onExportToLKPD }) => {
  // Input parameters
  const [initialP, setInitialP] = useState<number>(0.6); // Allele A frequency (0 to 1)
  const [selectionS, setSelectionS] = useState<number>(0); // Selection pressure on aa (0 = none, 1 = lethal)
  const [mutationRate, setMutationRate] = useState<number>(0); // A -> a mutation (0 to 0.1)
  const [populationSize, setPopulationSize] = useState<number>(1000); // N (50 to 10000)
  const [migrationRate, setMigrationRate] = useState<number>(0); // Gene flow (0 to 0.2)

  // Computed history over 50 generations
  const [hwHistory, setHwHistory] = useState<HWGenerationPoint[]>([]);

  // Calculate Hardy Weinberg progression over 50 generations
  const recalculateHW = () => {
    let currentP = initialP;
    let currentQ = 1 - initialP;

    const points: HWGenerationPoint[] = [];

    for (let gen = 1; gen <= 50; gen++) {
      // 1. Expected Genotypes without evolutionary pressure
      let p2 = currentP * currentP;
      let pq2 = 2 * currentP * currentQ;
      let q2 = currentQ * currentQ;

      // Apply selection pressure s on aa (fitness of aa = 1 - s)
      const wAA = 1;
      const wAa = 1;
      const waa = 1 - selectionS;

      const meanFitness = p2 * wAA + pq2 * wAa + q2 * waa;

      if (meanFitness > 0) {
        // Post-selection genotype frequencies
        p2 = (p2 * wAA) / meanFitness;
        pq2 = (pq2 * wAa) / meanFitness;
        q2 = (q2 * waa) / meanFitness;
      }

      // Updated allele frequencies post-selection
      currentP = p2 + 0.5 * pq2;
      currentQ = q2 + 0.5 * pq2;

      // Apply Mutation (A -> a at rate u)
      if (mutationRate > 0) {
        const deltaP = -mutationRate * currentP;
        currentP = Math.max(0, Math.min(1, currentP + deltaP));
        currentQ = 1 - currentP;
      }

      // Apply Migration (Immigrants with q_immigrant = 0.8)
      if (migrationRate > 0) {
        const qImmigrant = 0.8;
        currentQ = (1 - migrationRate) * currentQ + migrationRate * qImmigrant;
        currentP = 1 - currentQ;
      }

      // Apply Genetic Drift for small population N (Binomial sampling simulation)
      if (populationSize < 5000) {
        // Standard deviation of allele frequency change = sqrt(p*q / (2N))
        const stdDev = Math.sqrt((currentP * currentQ) / (2 * populationSize));
        // Random normal variation
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
        currentP = Math.max(0, Math.min(1, currentP + z * stdDev * 0.4));
        currentQ = 1 - currentP;
      }

      points.push({
        generation: gen,
        p: parseFloat(currentP.toFixed(4)),
        q: parseFloat(currentQ.toFixed(4)),
        p2: parseFloat((currentP * currentP).toFixed(4)),
        pq2: parseFloat((2 * currentP * currentQ).toFixed(4)),
        q2: parseFloat((currentQ * currentQ).toFixed(4))
      });
    }

    setHwHistory(points);
  };

  useEffect(() => {
    recalculateHW();
  }, [initialP, selectionS, mutationRate, populationSize, migrationRate]);

  const latest = hwHistory[hwHistory.length - 1] || {
    p: initialP,
    q: 1 - initialP,
    p2: initialP * initialP,
    pq2: 2 * initialP * (1 - initialP),
    q2: (1 - initialP) * (1 - initialP)
  };

  // Determine equilibrium status
  const isEquilibrium =
    selectionS === 0 && mutationRate === 0 && migrationRate === 0 && populationSize >= 5000;

  const currentQ = 1 - initialP;
  const expP2 = (initialP * initialP).toFixed(4);
  const exp2PQ = (2 * initialP * currentQ).toFixed(4);
  const expQ2 = (currentQ * currentQ).toFixed(4);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            Simulasi 3: Hukum Hardy-Weinberg & Genetika Populasi
          </h3>
          <p className="text-sm text-slate-400">
            Kalkulator interaktif p + q = 1 dan p² + 2pq + q² = 1 serta simulasi penyimpangan mikroevolusi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInitialP(0.6);
              setSelectionS(0);
              setMutationRate(0);
              setPopulationSize(5000);
              setMigrationRate(0);
            }}
            className="p-2 bg-slate-900 text-slate-400 hover:text-amber-400 rounded-lg border border-slate-700 text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Parameter Seimbang
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-4 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-xs text-slate-200 border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-sky-400" /> Parameter Alel & Pengaruh Mikroevolusi
          </h4>

          {/* Slider Initial p */}
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Frekuensi Alel Dominan (p): {initialP.toFixed(2)}</span>
              <span>Alel Resesif (q = 1-p): {(1 - initialP).toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={initialP}
              onChange={(e) => setInitialP(parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Selection pressure */}
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Tekanan Seleksi terhadap Resesif (aa):</span>
              <span className="text-rose-400">s = {(selectionS * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectionS}
              onChange={(e) => setSelectionS(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Population size N */}
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Ukuran Populasi (N) - Hanyutan Genetik:</span>
              <span className="text-amber-400">N = {populationSize}</span>
            </label>
            <input
              type="range"
              min="50"
              max="5000"
              step="250"
              value={populationSize}
              onChange={(e) => setPopulationSize(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400">
              {populationSize < 500 ? '⚠️ Populasi sangat kecil (Hanyutan Genetik tinggi!)' : 'Populasi cukup besar'}
            </span>
          </div>

          {/* Mutation Rate */}
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Tingkat Mutasi (A → a):</span>
              <span className="text-indigo-400">{(mutationRate * 100).toFixed(1)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="0.05"
              step="0.005"
              value={mutationRate}
              onChange={(e) => setMutationRate(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Gene Flow / Migration */}
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Tingkat Migrasi / Gene Flow:</span>
              <span className="text-teal-400">{(migrationRate * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="0.2"
              step="0.02"
              value={migrationRate}
              onChange={(e) => setMigrationRate(parseFloat(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {onExportToLKPD && (
            <button
              onClick={() =>
                onExportToLKPD({
                  p: latest.p,
                  q: latest.q,
                  p2: latest.p2,
                  pq2: latest.pq2,
                  q2: latest.q2,
                  status: isEquilibrium ? 'Seimbang (Hardy-Weinberg)' : 'Mikroevolusi Berjalan'
                })
              }
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 py-2 rounded text-xs font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5 text-sky-400" /> Ekspor Hasil H-W ke LKPD
            </button>
          )}
        </div>

        {/* Display + Graph Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Diagnostic Status Banner */}
          <div
            className={`p-3 rounded-lg border flex items-center gap-3 text-xs ${
              isEquilibrium
                ? 'bg-emerald-950/50 border-emerald-700/80 text-emerald-200'
                : 'bg-amber-950/50 border-amber-700/80 text-amber-200'
            }`}
          >
            {isEquilibrium ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div>
              <span className="font-bold block">
                {isEquilibrium
                  ? 'Populasi Dalam Kesetimbangan Hardy-Weinberg!'
                  : 'Terjadi Penyimpangan Kesetimbangan (Mikroevolusi Berjalan!)'}
              </span>
              <span className="text-[11px] text-slate-300">
                {isEquilibrium
                  ? 'Frekuensi p dan q konstan dari generasi ke-1 sampai ke-50.'
                  : 'Faktor pendorong: ' +
                    [
                      selectionS > 0 ? `Seleksi (s=${selectionS})` : null,
                      populationSize < 1000 ? `Genetic Drift (N=${populationSize})` : null,
                      mutationRate > 0 ? `Mutasi (${mutationRate * 100}%)` : null,
                      migrationRate > 0 ? `Migrasi (${migrationRate * 100}%)` : null
                    ]
                      .filter(Boolean)
                      .join(', ')}
              </span>
            </div>
          </div>

          {/* Current Genotype Distribution Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900 p-2.5 rounded border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">AA (Dominan)</span>
              <span className="text-base font-extrabold text-sky-400">p² = {latest.p2}</span>
              <span className="text-[10px] text-slate-500 block">Awal: {expP2}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">Aa (Heterosigot)</span>
              <span className="text-base font-extrabold text-indigo-400">2pq = {latest.pq2}</span>
              <span className="text-[10px] text-slate-500 block">Awal: {exp2PQ}</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">aa (Resesif)</span>
              <span className="text-base font-extrabold text-rose-400">q² = {latest.q2}</span>
              <span className="text-[10px] text-slate-500 block">Awal: {expQ2}</span>
            </div>
          </div>

          {/* SVG Trajectory Chart over 50 generations */}
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <h4 className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-400" /> Trajektori Frekuensi Alel p (Dominan) & q (Resesif)
            </h4>
            <div className="h-32 w-full">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="300" y2="20" stroke="#334155" strokeDasharray="2,2" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeDasharray="2,2" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#334155" strokeDasharray="2,2" />

                {/* Line p */}
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  points={hwHistory
                    .map((pt, idx) => {
                      const x = (idx / 49) * 300;
                      const y = 100 - pt.p * 100;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />

                {/* Line q */}
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  points={hwHistory
                    .map((pt, idx) => {
                      const x = (idx / 49) * 300;
                      const y = 100 - pt.q * 100;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>Gen 1</span>
              <div className="flex gap-4">
                <span className="text-sky-400 font-semibold">● Alel p (Dominan)</span>
                <span className="text-rose-400 font-semibold">● Alel q (Resesif)</span>
              </div>
              <span>Gen 50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
