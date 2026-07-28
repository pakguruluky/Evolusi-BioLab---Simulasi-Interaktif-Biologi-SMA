import React from 'react';
import { ActiveTab } from '../types';
import { Dna, BookOpen, GraduationCap, FlaskConical, FileText, HelpCircle, BookMarked, Printer } from 'lucide-react';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onPrintLKPD: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, onPrintLKPD }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white">
            <Dna className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2 text-slate-100">
              Lab Evolusi Interaktif
              <span className="text-blue-400 text-sm font-medium">SMA v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">
              Simulasi Interaktif & Lembar Kerja Peserta Didik (LKPD) Digital
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded border border-slate-700">
          <button
            onClick={() => setActiveTab('tujuan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'tujuan'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tujuan</span>
          </button>

          <button
            onClick={() => setActiveTab('materi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'materi'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi</span>
          </button>

          <button
            onClick={() => setActiveTab('simulasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'simulasi'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Simulasi</span>
          </button>

          <button
            onClick={() => setActiveTab('lkpd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'lkpd'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>LKPD</span>
          </button>

          <button
            onClick={() => setActiveTab('kuis')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'kuis'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kuis</span>
          </button>

          <button
            onClick={() => setActiveTab('referensi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase transition ${
              activeTab === 'referensi'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Pustaka</span>
          </button>
        </nav>

        {/* Action Button: Print LKPD */}
        <button
          onClick={onPrintLKPD}
          className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold uppercase text-xs transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak LKPD</span>
        </button>
      </div>
    </header>
  );
};
