import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Save, Activity, Bird, Factory, Trees } from 'lucide-react';
import { BistonMothState, GenerationDataPoint } from '../../types';

interface Props {
  onExportToLKPD?: (data: { pollution: number; lightPercent: number; darkPercent: number }) => void;
}

export const NaturalSelectionSimulation: React.FC<Props> = ({ onExportToLKPD }) => {
  const [pollution, setPollution] = useState<number>(10); // 0% clean lichen to 100% industrial soot
  const [birdPredators, setBirdPredators] = useState<number>(3); // 1 to 5 birds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(1);
  const [history, setHistory] = useState<GenerationDataPoint[]>([
    { generation: 1, lightPercent: 85, darkPercent: 15, lightCount: 85, darkCount: 15 }
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Moth population state
  const mothsRef = useRef<BistonMothState[]>([]);

  // Initialize moths
  const initMoths = (pPollution: number) => {
    const total = 100;
    // Initial light % drops as pollution increases
    const lightRatio = Math.max(0.05, Math.min(0.95, (100 - pPollution) / 100));
    const lightCount = Math.round(total * lightRatio);

    const newMoths: BistonMothState[] = [];
    for (let i = 0; i < total; i++) {
      newMoths.push({
        x: Math.random() * 440 + 20,
        y: Math.random() * 220 + 20,
        type: i < lightCount ? 'light' : 'dark',
        alive: true,
        opacity: 1
      });
    }
    mothsRef.current = newMoths;
  };

  useEffect(() => {
    initMoths(pollution);
  }, []);

  const handleReset = () => {
    setIsRunning(false);
    setGeneration(1);
    setPollution(10);
    initMoths(10);
    setHistory([{ generation: 1, lightPercent: 85, darkPercent: 15, lightCount: 85, darkCount: 15 }]);
  };

  // Run next generation step manually or in interval
  const stepGeneration = () => {
    const currentMoths = mothsRef.current;
    
    // Birds hunt based on camouflage visibility:
    // When pollution is low (<30): Dark moths are visible, Light moths fit in.
    // When pollution is high (>70): Light moths are visible, Dark moths fit in.
    
    const darkVisibility = Math.max(0.1, (100 - pollution) / 100); // High when low pollution
    const lightVisibility = Math.max(0.1, pollution / 100);       // High when high pollution

    let lightAlive = 0;
    let darkAlive = 0;

    currentMoths.forEach(moth => {
      let deathProb = 0;
      if (moth.type === 'dark') {
        deathProb = darkVisibility * (birdPredators / 5) * 0.7;
      } else {
        deathProb = lightVisibility * (birdPredators / 5) * 0.7;
      }

      if (Math.random() < deathProb) {
        moth.alive = false;
      } else {
        if (moth.type === 'light') lightAlive++;
        else darkAlive++;
      }
    });

    // Reproduce back to 100 total proportional to survivors
    const totalSurv = lightAlive + darkAlive;
    const nextLightPct = totalSurv > 0 ? Math.round((lightAlive / totalSurv) * 100) : 50;
    const nextDarkPct = 100 - nextLightPct;

    // Repopulate moths array
    const newTotal = 100;
    const newLightCount = Math.round(newTotal * (nextLightPct / 100));
    const nextMoths: BistonMothState[] = [];
    for (let i = 0; i < newTotal; i++) {
      nextMoths.push({
        x: Math.random() * 440 + 20,
        y: Math.random() * 220 + 20,
        type: i < newLightCount ? 'light' : 'dark',
        alive: true,
        opacity: 1
      });
    }
    mothsRef.current = nextMoths;

    const nextGen = generation + 1;
    setGeneration(nextGen);

    setHistory(prev => [
      ...prev,
      {
        generation: nextGen,
        lightPercent: nextLightPct,
        darkPercent: nextDarkPct,
        lightCount: newLightCount,
        darkCount: newTotal - newLightCount
      }
    ]);
  };

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Bark background tone: 0% pollution = light grayish brown with lichen. 100% pollution = dark black soot.
    const sootFactor = pollution / 100;
    const barkR = Math.round(180 * (1 - sootFactor) + 20 * sootFactor);
    const barkG = Math.round(160 * (1 - sootFactor) + 20 * sootFactor);
    const barkB = Math.round(130 * (1 - sootFactor) + 25 * sootFactor);

    ctx.fillStyle = `rgb(${barkR}, ${barkG}, ${barkB})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bark texture / lichen patches
    if (pollution < 50) {
      // Light green lichen spots
      ctx.fillStyle = `rgba(167, 243, 208, ${0.8 * (1 - sootFactor)})`;
      ctx.beginPath();
      ctx.arc(80, 70, 40, 0, Math.PI * 2);
      ctx.arc(280, 150, 55, 0, Math.PI * 2);
      ctx.arc(390, 80, 35, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Dark soot lines
      ctx.fillStyle = `rgba(15, 23, 42, ${0.7 * sootFactor})`;
      for (let i = 0; i < canvas.height; i += 15) {
        ctx.fillRect(0, i, canvas.width, 4);
      }
    }

    // Draw Moths
    mothsRef.current.forEach(m => {
      if (!m.alive) return;

      // Draw moth shape
      ctx.save();
      ctx.translate(m.x, m.y);

      if (m.type === 'light') {
        ctx.fillStyle = '#f8fafc'; // creamy white moth
        ctx.strokeStyle = '#94a3b8';
      } else {
        ctx.fillStyle = '#020617'; // dark melanic moth
        ctx.strokeStyle = '#334155';
      }

      // Wings
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-10, -10);
      ctx.lineTo(0, -5);
      ctx.lineTo(10, -10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-12, 8);
      ctx.lineTo(0, 4);
      ctx.lineTo(12, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    });
  }, [pollution, generation]);

  // Interval timer for simulation run
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        stepGeneration();
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isRunning, pollution, birdPredators, generation]);

  const latestHistory = history[history.length - 1] || { lightPercent: 85, darkPercent: 15 };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            Simulasi 2: Seleksi Alam Ngengat (Biston betularia)
          </h3>
          <p className="text-sm text-slate-400">
            Amati efek Revolusi Industri (polusi jelaga) terhadap fenomena melanisme industri dan seleksi oleh burung pemangsa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2 transition ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Jeda Simulasi' : 'Jalankan Otomatis'}
          </button>
          <button
            onClick={stepGeneration}
            disabled={isRunning}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-200 rounded-lg text-xs font-semibold"
          >
            +1 Generasi
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-slate-900 text-slate-400 hover:text-amber-400 rounded-lg border border-slate-700"
            title="Reset Simulasi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control sliders + Visual Canvas + Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-5 bg-slate-900/60 p-4 rounded-lg border border-slate-700">
          <div>
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-amber-400" /> Tingkat Polusi Industri:</span>
              <span className="text-amber-400">{pollution}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={pollution}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setPollution(val);
                initMoths(val);
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0% (Bersih/Lichen)</span>
              <span>100% (Polusi Jelaga)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5"><Bird className="w-4 h-4 text-sky-400" /> Kepadatan Burung Pemangsa:</span>
              <span className="text-sky-400">{birdPredators} Ekor</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={birdPredators}
              onChange={(e) => setBirdPredators(parseInt(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-800 p-3 rounded border border-slate-700 text-xs space-y-2">
            <div className="flex justify-between font-semibold border-b border-slate-700 pb-1">
              <span>Generasi Saat Ini:</span>
              <span className="text-emerald-400 font-bold">Ke-{generation}</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-400"></span>
                Ngengat Terang:
              </span>
              <span className="font-bold">{latestHistory.lightPercent}%</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-600"></span>
                Ngengat Gelap:
              </span>
              <span className="font-bold">{latestHistory.darkPercent}%</span>
            </div>
          </div>

          {onExportToLKPD && (
            <button
              onClick={() => onExportToLKPD({
                pollution,
                lightPercent: latestHistory.lightPercent,
                darkPercent: latestHistory.darkPercent
              })}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 py-2 rounded text-xs font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" /> Simpan Hasil Biston ke LKPD
            </button>
          )}
        </div>

        {/* Canvas Habitat View */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
              <span className="font-semibold flex items-center gap-1">
                <Trees className="w-4 h-4 text-emerald-400" /> Tampilan Batang Pohon Habitat
              </span>
              <span className="text-slate-400">
                {pollution > 50 ? ' Batang Gelap Terselubung Jelaga' : ' Batang Terang Dilapisi Lichen'}
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={480}
              height={220}
              className="w-full h-auto rounded border border-slate-800 shadow"
            />
          </div>

          {/* SVG History Chart */}
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <h4 className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Grafik Tren Populasi (% Terang vs % Gelap)
            </h4>
            <div className="h-28 w-full">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Background grid */}
                <line x1="0" y1="25" x2="300" y2="25" stroke="#334155" strokeDasharray="3,3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeDasharray="3,3" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="#334155" strokeDasharray="3,3" />

                {/* Light Moths Polyline */}
                <polyline
                  fill="none"
                  stroke="#f8fafc"
                  strokeWidth="2.5"
                  points={history
                    .map((h, idx) => {
                      const x = (idx / Math.max(1, history.length - 1)) * 300;
                      const y = 100 - h.lightPercent;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />

                {/* Dark Moths Polyline */}
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  points={history
                    .map((h, idx) => {
                      const x = (idx / Math.max(1, history.length - 1)) * 300;
                      const y = 100 - h.darkPercent;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-center gap-6 text-[11px] mt-1">
              <span className="flex items-center gap-1 text-slate-200">
                <span className="w-3 h-0.5 bg-slate-100"></span> Ngengat Terang
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-3 h-0.5 bg-sky-400"></span> Ngengat Gelap
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
