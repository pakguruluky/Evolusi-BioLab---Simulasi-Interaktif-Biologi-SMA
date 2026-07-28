import React, { useState, useEffect, useRef } from 'react';
import { SCIENTIST_THEORIES } from '../../data/materialData';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, Save, Info } from 'lucide-react';

interface Props {
  onExportToLKPD?: (data: { teori: string }) => void;
}

export const TheorySimulation: React.FC<Props> = ({ onExportToLKPD }) => {
  const [selectedTheory, setSelectedTheory] = useState<'lamarck' | 'darwin' | 'weismann'>('darwin');
  const [treeHeight, setTreeHeight] = useState<number>(3.5); // meters
  const [generations, setGenerations] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [miceGenerations, setMiceGenerations] = useState<number>(5);
  const [miceCutDone, setMiceCutDone] = useState<boolean>(false);

  // Darwin population counts
  const [darwinPop, setDarwinPop] = useState<{ short: number; med: number; long: number }>({
    short: 15,
    med: 15,
    long: 10
  });

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reset simulation states
  const handleReset = () => {
    setGenerations(1);
    setMiceGenerations(5);
    setMiceCutDone(false);
    setDarwinPop({ short: 15, med: 15, long: 10 });
    setIsSimulating(false);
  };

  // Run next generation step for Darwin
  const advanceDarwinGen = () => {
    setGenerations(prev => prev + 1);
    // Depending on tree height:
    // If treeHeight > 3.0: short necks fail to feed, long necks thrive
    setDarwinPop(prev => {
      const shortSurvival = treeHeight > 3.2 ? 0.2 : treeHeight > 2.5 ? 0.6 : 0.9;
      const medSurvival = treeHeight > 3.5 ? 0.5 : 0.8;
      const longSurvival = 0.95;

      const nextShort = Math.max(0, Math.round(prev.short * shortSurvival * 1.2));
      const nextMed = Math.max(0, Math.round(prev.med * medSurvival * 1.2));
      const nextLong = Math.round(prev.long * longSurvival * 1.4);

      return { short: nextShort, med: nextMed, long: nextLong };
    });
  };

  // Draw simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground & sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
    skyGrad.addColorStop(0, '#1e293b');
    skyGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.75);

    // Ground
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

    if (selectedTheory === 'lamarck' || selectedTheory === 'darwin') {
      // Draw Tree
      const treeX = canvas.width - 120;
      const treeBaseY = canvas.height * 0.75;
      const treeHeightPx = treeHeight * 40; // 1m = 40px

      // Tree trunk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(treeX - 12, treeBaseY - treeHeightPx, 24, treeHeightPx);

      // Leaves
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(treeX, treeBaseY - treeHeightPx - 20, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(treeX - 15, treeBaseY - treeHeightPx - 30, 30, 0, Math.PI * 2);
      ctx.fill();

      // Label tree height
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Tinggi Pohon: ${treeHeight} meter`, treeX - 60, treeBaseY - treeHeightPx - 70);

      if (selectedTheory === 'lamarck') {
        // Lamarck Giraffe: neck length grows with treeHeight and generations
        const neckLen = Math.min(140, 40 + (treeHeight - 1.5) * 15 + (generations - 1) * 10);
        const gx = 120;
        const gy = canvas.height * 0.75;

        // Draw body
        ctx.fillStyle = '#d97706';
        ctx.fillRect(gx - 30, gy - 40, 60, 30); // body
        // Legs
        ctx.fillRect(gx - 25, gy - 10, 8, 25);
        ctx.fillRect(gx + 15, gy - 10, 8, 25);
        // Neck
        ctx.fillRect(gx + 15, gy - 40 - neckLen, 12, neckLen);
        // Head
        ctx.beginPath();
        ctx.arc(gx + 25, gy - 40 - neckLen, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`Panjang Leher (Lamarck): ${Math.round(neckLen)} cm`, gx - 40, gy - 55 - neckLen);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`Generasi ke-${generations} (Semua leher meregang bersama)`, 20, 30);
      } else {
        // Darwin mode: draw multiple giraffes with varied neck lengths
        const total = darwinPop.short + darwinPop.med + darwinPop.long;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px sans-serif';
        ctx.fillText(`Generasi ke-${generations} | Total Populasi: ${total} ekor`, 20, 30);

        // Draw short neck representative
        if (darwinPop.short > 0) {
          const gx = 60;
          const gy = canvas.height * 0.75;
          ctx.fillStyle = '#ef4444'; // Red tag for vulnerable
          ctx.fillRect(gx - 15, gy - 30, 30, 20);
          ctx.fillRect(gx + 5, gy - 30 - 30, 6, 30); // short neck 30px
          ctx.fillText(`Pendek (${darwinPop.short})`, gx - 20, gy - 70);
        }

        // Medium
        if (darwinPop.med > 0) {
          const gx = 160;
          const gy = canvas.height * 0.75;
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(gx - 15, gy - 30, 30, 20);
          ctx.fillRect(gx + 5, gy - 30 - 60, 6, 60); // med neck 60px
          ctx.fillText(`Sedang (${darwinPop.med})`, gx - 20, gy - 100);
        }

        // Long
        if (darwinPop.long > 0) {
          const gx = 260;
          const gy = canvas.height * 0.75;
          ctx.fillStyle = '#10b981';
          ctx.fillRect(gx - 15, gy - 30, 30, 20);
          ctx.fillRect(gx + 5, gy - 30 - 95, 6, 95); // long neck 95px
          ctx.fillText(`Panjang (${darwinPop.long})`, gx - 20, gy - 135);
        }
      }
    } else if (selectedTheory === 'weismann') {
      // Weismann Mouse Tail experiment
      ctx.fillStyle = '#f8fafc';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Eksperimen Weismann: Pemotongan Ekor Tikus (${miceGenerations} Generasi)`, 20, 30);

      // Parent Mouse (Tail Cut off)
      const px = 100;
      const py = 140;
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(px, py, 35, 20, 0, 0, Math.PI * 2);
      ctx.fill(); // body
      ctx.beginPath();
      ctx.arc(px + 30, py - 10, 12, 0, Math.PI * 2);
      ctx.fill(); // head
      // Cut tail mark
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px - 35, py);
      ctx.lineTo(px - 40, py);
      ctx.stroke();
      ctx.fillText(`❌ Induk Tikus (Ekor Dipotong)`, px - 50, py + 40);

      // Arrow
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(px + 60, py);
      ctx.lineTo(px + 140, py);
      ctx.stroke();

      // Baby Mice (Born with 100% full long tail!)
      const bx = 220;
      const by = 140;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(bx, by, 25, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx + 20, by - 6, 9, 0, Math.PI * 2);
      ctx.fill();
      // Long tail!
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx - 25, by);
      ctx.quadraticCurveTo(bx - 50, by - 20, bx - 60, by + 10);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`✅ Anak Tikus Generasi ke-${miceGenerations}:`, bx - 20, by + 40);
      ctx.fillText(`Ekor Tetap Utuh & Panjang (100%)!`, bx - 20, by + 60);
    }
  }, [selectedTheory, treeHeight, generations, darwinPop, miceGenerations]);

  const currentTheoryInfo = SCIENTIST_THEORIES.find(t => t.id === selectedTheory);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-6">
      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            Simulasi 1: Perbandingan Teori Evolusi
          </h3>
          <p className="text-sm text-slate-400">
            Uji hipotesis Lamarck, Darwin, dan Weismann secara langsung dalam lingkungan terkontrol.
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => { setSelectedTheory('lamarck'); handleReset(); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTheory === 'lamarck'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Teori Lamarck
          </button>
          <button
            onClick={() => { setSelectedTheory('darwin'); handleReset(); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTheory === 'darwin'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Teori Darwin
          </button>
          <button
            onClick={() => { setSelectedTheory('weismann'); handleReset(); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTheory === 'weismann'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Teori Weismann
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel + Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/60 p-4 rounded-lg border border-slate-700/80">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-400" /> Panel Parameter
            </h4>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {selectedTheory === 'lamarck' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tinggi Pohon Makanan (Tergantung Lingkungan): {treeHeight} meter
                </label>
                <input
                  type="range"
                  min="1.5"
                  max="4.5"
                  step="0.5"
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400">
                  Lamarck: Jerapah dipaksa meregangkan leher untuk menjangkau daun tinggi.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Jumlah Generasi Latihan: {generations} Generasi
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGenerations(prev => Math.min(10, prev + 1))}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" /> Tambah 1 Generasi
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTheory === 'darwin' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tinggi Pohon (Tekanan Seleksi Lingkungan): {treeHeight} meter
                </label>
                <input
                  type="range"
                  min="1.5"
                  max="4.5"
                  step="0.5"
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Pohon tinggi (&gt;3m) menyeleksi ketat jerapah leher pendek.
                </p>
              </div>

              <div className="bg-slate-800 p-3 rounded border border-slate-700 text-xs space-y-1">
                <p className="font-semibold text-slate-200">Komposisi Populasi Generasi Ke-{generations}:</p>
                <div className="flex justify-between text-red-400">
                  <span>Leher Pendek:</span> <span>{darwinPop.short} ekor</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span>Leher Sedang:</span> <span>{darwinPop.med} ekor</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Leher Panjang:</span> <span>{darwinPop.long} ekor</span>
                </div>
              </div>

              <button
                onClick={advanceDarwinGen}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded text-xs font-semibold flex items-center justify-center gap-2 shadow"
              >
                <Play className="w-3.5 h-3.5" /> Simulasikan Generasi Berikutnya (Seleksi Alam)
              </button>
            </div>
          )}

          {selectedTheory === 'weismann' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Jumlah Generasi Ekor Tikus Dipotong: {miceGenerations} Generasi
                </label>
                <input
                  type="range"
                  min="1"
                  max="22"
                  step="1"
                  value={miceGenerations}
                  onChange={(e) => setMiceGenerations(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded text-xs text-sky-200">
                <strong>Prinsip Weismann:</strong> Pemotongan ekor induk mempengaruhi sel somatik, tetapi DNA pada sel sperma/ovum (germplasm) tidak berubah sama sekali!
              </div>
            </div>
          )}

          {/* Export to LKPD action */}
          {onExportToLKPD && (
            <button
              onClick={() => onExportToLKPD({ teori: currentTheoryInfo?.name || selectedTheory })}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 py-2 rounded text-xs font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" /> Simpan Catatan Simulasi Ini ke LKPD
            </button>
          )}
        </div>

        {/* Visualizer Canvas Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-between bg-slate-900 rounded-lg p-3 border border-slate-700 min-h-[300px]">
          <canvas
            ref={canvasRef}
            width={480}
            height={280}
            className="w-full h-auto max-h-[320px] rounded border border-slate-800 shadow-inner"
          />

          {/* Real-time Scientific Diagnosis Box */}
          <div className="w-full mt-3 p-3 bg-slate-950/80 rounded border border-slate-700 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              {selectedTheory === 'darwin' || selectedTheory === 'weismann' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              )}
              Analisis Ilmiah ({currentTheoryInfo?.name}):
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentTheoryInfo?.mechanism}
            </p>
            <div className="text-slate-400 border-t border-slate-800 pt-1.5 flex items-start gap-1">
              <span className="font-semibold text-slate-300">Status Keabsahan:</span>
              <span>{currentTheoryInfo?.refutationOrSupport}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
