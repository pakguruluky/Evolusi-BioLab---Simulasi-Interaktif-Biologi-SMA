import React from 'react';
import { REFERENCES_LIST } from '../data/referenceData';
import { BookMarked, ExternalLink, BookmarkCheck } from 'lucide-react';

export const ReferensiPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
        <div className="border-b border-slate-700 pb-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Daftar Pustaka & Kredibilitas Akademik
          </span>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-emerald-400" /> Referensi Sumber Belajar Standar
          </h2>
          <p className="text-xs text-slate-400">
            Aplikasi dan materi simulasi disususun berdasarkan literatur resmi Biologi SMA, buku teks universitas, dan karya akademik klasik.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REFERENCES_LIST.map((ref) => (
            <div
              key={ref.id}
              className="bg-slate-900 p-4 rounded-lg border border-slate-700/80 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                  {ref.type}
                </span>
                <h4 className="font-bold text-xs text-slate-100 italic">{ref.title}</h4>
                <p className="text-[11px] text-slate-300">Penulis: {ref.authors} ({ref.year})</p>
                <p className="text-[11px] text-slate-400">Penerbit: {ref.publisher}</p>
              </div>

              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 pt-2 border-t border-slate-800"
                >
                  <span>Lihat Publikasi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
