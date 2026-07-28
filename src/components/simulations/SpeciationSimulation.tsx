import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, RotateCcw, Save, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

interface Props {
  onExportToLKPD?: (data: { tipe: string; divergensi: number; terisolasi: boolean }) => void;
}

export const SpeciationSimulation: React.FC<Props> = ({ onExportToLKPD }) => {
  const [isolationType, setIsolationType] = useState<'alopatrik' | 'simpatrik'>('alopatrik');
  const [separationTime, setSeparationTime] = useState<number>(20); // 1 to 100 generations
  const [matingTested, setMatingTested] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Divergence % = min(100, separationTime * 1.5)
  const divergence = Math.min(100, Math.round(separationTime * 1.4));
  const isSpeciated = separationTime >= 40;

  // Reset
  const handleReset = () => {
    setSeparationTime(20);
    setMatingTested(false);
  };

  // Draw canvas representation of populations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isolationType === 'alopatrik') {
      // Draw Island Left and Island Right
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(20, 30, 180, 180); // Island A
      ctx.fillRect(280, 30, 180, 180); // Island B

      // Geographic Barrier (River / Mountain in middle)
      ctx.fillStyle = '#38bdf8'; // River
      ctx.fillRect(210, 0, 60, canvas.height);

      ctx.fillStyle = '#64748b'; // Mountain rocks
      for (let y = 10; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(240, y);
        ctx.lineTo(225, y + 25);
        ctx.lineTo(255, y + 25);
        ctx.closePath();
        ctx.fill();
      }

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Populasi A (Pulau Barat)', 30, 50);
      ctx.fillText('Populasi B (Pulau Timur)', 290, 50);

      // Draw Organisms Group A (Emerald circles)
      ctx.fillStyle = '#10b981';
      for (let i = 0; i < 12; i++) {
        const x = 50 + (i % 4) * 35;
        const y = 80 + Math.floor(i / 4) * 35;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Organisms Group B (Evolves from Emerald -> Purple/Pink as divergence increases)
      const r = Math.round(16 * (1 - divergence / 100) + 236 * (divergence / 100));
      const g = Math.round(185 * (1 - divergence / 100) + 72 * (divergence / 100));
      const b = Math.round(129 * (1 - divergence / 100) + 153 * (divergence / 100));

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      for (let i = 0; i < 12; i++) {
        const x = 310 + (i % 4) * 35;
        const y = 80 + Math.floor(i / 4) * 35;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Sympatric mode: Same island, different behavior/seasons
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, 20, 400, 200);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Habitat Sama (Isolasi Perilaku/Musim Kawin)', 50, 40);

      // Group A (Mating in Spring - Green)
      ctx.fillStyle = '#10b981';
      for (let i = 0; i < 10; i++) {
        const x = 80 + (i % 5) * 30;
        const y = 70 + Math.floor(i / 5) * 30;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#10b981';
      ctx.font = '11px sans-serif';
      ctx.fillText('Musim Kawin: Musim Semi', 80, 140);

      // Group B (Mating in Autumn - Divergent Color)
      const r = Math.round(16 * (1 - divergence / 100) + 245 * (divergence / 100));
      const g = Math.round(185 * (1 - divergence / 100) + 158 * (divergence / 100));
      const b = Math.round(129 * (1 - divergence / 100) + 11 * (divergence / 100));

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      for (let i = 0; i < 10; i++) {
        const x = 280 + (i % 5) * 30;
        const y = 70 + Math.floor(i / 5) * 30;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = '11px sans-serif';
      ctx.fillText('Musim Kawin: Musim Gugur', 280, 140);
    }
  }, [isolationType, separationTime, divergence]);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            Simulasi 4: Mekanisme Spesiasi & Isolasi Reproduktif
          </h3>
          <p className="text-sm text-slate-400">
            Pelajari bagaimana pembentukan populasi terisolasi memutus aliran gen (*gene flow*) dan memicu lahirnya spesies baru.
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => { setIsolationType('alopatrik'); handleReset(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition ${
              isolationType === 'alopatrik'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spesiasi Alopatrik (Geografis)
          </button>
          <button
            onClick={() => { setIsolationType('simpatrik'); handleReset(); }}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition ${
              isolationType === 'simpatrik'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spesiasi Simpatrik (Perilaku/Musim)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-4 rounded-lg border border-slate-700">
          <div>
            <label className="text-xs font-semibold text-slate-200 flex justify-between mb-1">
              <span>Waktu Terisolasi Tanpa Interaksi:</span>
              <span className="text-indigo-400">{separationTime} Generasi</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={separationTime}
              onChange={(e) => {
                setSeparationTime(parseInt(e.target.value));
                setMatingTested(false);
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-800 p-3 rounded border border-slate-700 text-xs space-y-2">
            <div className="flex justify-between font-semibold border-b border-slate-700 pb-1">
              <span>Tingkat Divergensi Genetik:</span>
              <span className="text-amber-400">{divergence}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full transition-all"
                style={{ width: `${divergence}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setMatingTested(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded text-xs font-bold flex items-center justify-center gap-2 shadow"
          >
            <GitBranch className="w-4 h-4" /> Uji Silang Reproduksi (Mating Test)
          </button>

          {onExportToLKPD && (
            <button
              onClick={() =>
                onExportToLKPD({
                  tipe: isolationType === 'alopatrik' ? 'Alopatrik (Geografis)' : 'Simpatrik (Perilaku)',
                  divergensi: divergence,
                  terisolasi: isSpeciated
                })
              }
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 py-2 rounded text-xs font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5 text-indigo-400" /> Simpan Hasil Spesiasi ke LKPD
            </button>
          )}
        </div>

        {/* Visualizer & Test Result */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <canvas
              ref={canvasRef}
              width={480}
              height={220}
              className="w-full h-auto rounded border border-slate-800 shadow"
            />
          </div>

          {/* Test outcome badge */}
          {matingTested && (
            <div
              className={`p-4 rounded-lg border text-xs space-y-1.5 ${
                isSpeciated
                  ? 'bg-rose-950/60 border-rose-700 text-rose-200'
                  : 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isSpeciated ? (
                  <Flame className="w-5 h-5 text-rose-400" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
                {isSpeciated
                  ? 'PEMBENTUKAN SPESIES BARU BERHASIL! (Spesiasi Tuntas)'
                  : 'MASIH SPESIES YANG SAMA (Aliran Gen Masih Mampu Terjadi)'}
              </div>
              <p className="leading-relaxed text-slate-300">
                {isSpeciated
                  ? `Akibat terisolasi selama ${separationTime} generasi (Divergensi ${divergence}%), akumulasi mutasi genetik telah menciptakan isolasi reproduktif penuh. Ketika dipertemukan kembali, Organisme A dan Organisme B tidak dapat menghasilkan keturunan yang fertil.`
                  : `Meskipun terisolasi ${separationTime} generasi (Divergensi ${divergence}%), mutasi yang terjadi belum cukup memblokir perkawinan. Ketika dipertemukan kembali, keduanya masih dapat saling kawin dan menghasilkan keturunan fertil.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
