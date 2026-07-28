import React from 'react';
import { Target, CheckCircle2, Award, BookOpenCheck, Compass } from 'lucide-react';

export const TujuanPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Compass className="w-3.5 h-3.5" /> Standar Kurikulum Biologi SMA Kelas XII
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Tujuan Pembelajaran & Capaian Kurikulum
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Modul simulasi interaktif ini dirancang khusus untuk memfasilitasi pemahaman konseptual dan kuantitatif peserta didik SMA pada materi Mekanisme Evolusi dan Genetika Populasi.
          </p>
        </div>
      </div>

      {/* Capaian Pembelajaran (CP) Card */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Capaian Pembelajaran (CP) Utama</h3>
            <p className="text-xs text-slate-400">Elemen: Pemahaman Biologi & Keterampilan Proses Sains</p>
          </div>
        </div>

        <p className="text-sm text-slate-200 bg-slate-900 p-4 rounded-lg border border-slate-700/80 leading-relaxed italic">
          "Pada akhir fase F (Kelas XII), peserta didik memiliki kemampuan menganalisis teori-teori evolusi, mekanisme seleksi alam, fenomena spesiasi, serta prinsip Hukum Hardy-Weinberg dalam genetika populasi secara kritis melalui eksperimen simulasi dan penyusunan laporan ilmiah."
        </p>
      </div>

      {/* Specific Learning Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
          <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-emerald-400" /> 1. Analisis Kritis Teori Klasik
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Membandingkan mekanisme pemikiran Jean-Baptiste Lamarck (*Use & Disuse*), Charles Darwin (*Seleksi Alam*), dan August Weismann (*Plasma Nutfah*) serta menyimpulkan bukti ilmiah yang memvalidasi Teori Darwin-Weismann.
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
          <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-amber-400" /> 2. Simulasi Seleksi Alam & Adaptasi
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menganalisis dampak perubahan lingkungan (seperti polusi jelaga industri pada *Biston betularia*) terhadap tekanan seleksi predator dan pergeseran frekuensi fenotipe populasi.
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
          <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-sky-400" /> 3. Perhitungan Hukum Hardy-Weinberg
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menghitung frekuensi alel ($p, q$) dan genotipe ($p^2, 2pq, q^2$) serta mendemonstrasikan secara kuantitatif dampak mutasi, hanyutan genetik (*genetic drift*), dan seleksi terhadap mikroevolusi.
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
          <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-indigo-400" /> 4. Fenomena Spesiasi & Pelaporan LKPD
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menjelaskan peran isolasi geografis (alopatrik) dan isolasi reproduktif (simpatrik) dalam memutus aliran gen (*gene flow*), serta mendokumentasikan observasi melalui LKPD Digital yang siap dicetak.
          </p>
        </div>
      </div>

      {/* Profile & Rubric Note */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <BookOpenCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Sesuai dengan Alur Tujuan Pembelajaran (ATP) Biologi SMA Kurikulum Merdeka & 2013 Revisi.</span>
        </div>
      </div>
    </div>
  );
};
