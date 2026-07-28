import React, { useState } from 'react';
import { EDUCATIONAL_CHAPTERS, SCIENTIST_THEORIES } from '../data/materialData';
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight, Dna } from 'lucide-react';

export const MateriPanel: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<string>('bab1');

  const selectedChapter =
    EDUCATIONAL_CHAPTERS.find((c) => c.id === activeChapterId) || EDUCATIONAL_CHAPTERS[0];

  return (
    <div className="space-y-6">
      {/* Chapter Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
        {EDUCATIONAL_CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapterId(ch.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeChapterId === ch.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{ch.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Chapter Content Card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
        <div className="border-b border-slate-700 pb-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Modul Pembelajaran
          </span>
          <h2 className="text-2xl font-extrabold text-slate-100">{selectedChapter.title}</h2>
          <p className="text-sm text-slate-400">{selectedChapter.subtitle}</p>
        </div>

        {/* Comparison Table if Bab 1 */}
        {activeChapterId === 'bab1' && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-lg border border-slate-700">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3 border-b border-slate-700">Aspek Perbandingan</th>
                    <th className="p-3 border-b border-slate-700 text-amber-400">Jean-Baptiste Lamarck</th>
                    <th className="p-3 border-b border-slate-700 text-emerald-400">Charles Darwin</th>
                    <th className="p-3 border-b border-slate-700 text-sky-400">August Weismann</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/80 bg-slate-800/60">
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Penyebab Perubahan Organ</td>
                    <td className="p-3">Penggunaan (*Use*) & ketidakgunaan (*Disuse*) akibat dorongan lingkungan.</td>
                    <td className="p-3">Variasi genetik acak sejak lahir + Seleksi Alam oleh lingkungan.</td>
                    <td className="p-3">Mutasi materi genetik (DNA) pada sel germinal/gamet.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Variasi Awal Populasi</td>
                    <td className="p-3">Semua individu seragam awalnya (misal leher pendek semua).</td>
                    <td className="p-3">Sudah bervariasi sejak awal (leher pendek, sedang, panjang).</td>
                    <td className="p-3">Ditentukan alel bawaan plasma nutfah (*germplasm*).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Pewarisan Karakter</td>
                    <td className="p-3">Sifat yang diperoleh (*acquired characteristics*) diwariskan.</td>
                    <td className="p-3">Hanya individu terpilih (*fittest*) yang mewariskan sifatnya.</td>
                    <td className="p-3">Sifat sel somatik tidak diwariskan; hanya sel kelamin.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Eksperimen Pembuktian</td>
                    <td className="p-3">Pengamatan fenotipe jerapah (tanpa uji laboratorium).</td>
                    <td className="p-3">Observasi Galapagos (Burung Finch & Kura-kura raksasa).</td>
                    <td className="p-3">Pemotongan ekor tikus 22 generasi berturut-turut.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Individual Scientist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCIENTIST_THEORIES.map((sc) => (
                <div key={sc.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
                  <h4 className="font-bold text-sm text-slate-100 flex items-center justify-between">
                    <span>{sc.name.split('(')[0]}</span>
                    <span className="text-[10px] text-slate-400">({sc.name.split('(')[1]}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{sc.concept}</p>
                  <div className="border-t border-slate-800 pt-2 text-[11px] text-slate-400">
                    <strong className="text-slate-200">Prinsip:</strong> {sc.mechanism}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text Content Breakdown */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
          {selectedChapter.content
            .trim()
            .split('\n\n')
            .map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-base font-bold text-slate-100 mt-4 border-l-2 border-emerald-500 pl-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
        </div>
      </div>
    </div>
  );
};
