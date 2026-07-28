import React from 'react';
import { LKPDData } from '../types';
import { Printer, Save, FileCheck, User, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  lkpdData: LKPDData;
  setLkpdData: React.Dispatch<React.SetStateAction<LKPDData>>;
  onPrint: () => void;
}

export const LKPDPanel: React.FC<Props> = ({ lkpdData, setLkpdData, onPrint }) => {
  const handleChange = (field: keyof LKPDData, value: any) => {
    setLkpdData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Screen Interactive UI Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Lembar Kerja Peserta Didik (LKPD) Digital
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100">
              Laporan Analisis & Eksperimen Evolusi
            </h2>
            <p className="text-xs text-slate-400">
              Isi data identitas, amati hasil simulasi, dan lengkapi jawaban pertanyaan analisis di bawah ini.
            </p>
          </div>

          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg shadow-emerald-950/50"
          >
            <Printer className="w-4 h-4" /> Cetak / Simpan PDF
          </button>
        </div>

        {/* Student Identity Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/80 p-4 rounded-lg border border-slate-700">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap Murid *</label>
            <input
              type="text"
              placeholder="Contoh: Ahmad Fauzi"
              value={lkpdData.nama}
              onChange={(e) => handleChange('nama', e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Kelas *</label>
            <input
              type="text"
              placeholder="Contoh: XII MIPA 1"
              value={lkpdData.kelas}
              onChange={(e) => handleChange('kelas', e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor Absen *</label>
            <input
              type="text"
              placeholder="Contoh: 04"
              value={lkpdData.absen}
              onChange={(e) => handleChange('absen', e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sekolah / Kelompok</label>
            <input
              type="text"
              placeholder="Contoh: SMAN 1 Jakarta"
              value={lkpdData.sekolah}
              onChange={(e) => handleChange('sekolah', e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Imported Simulation Data Snapshot Badge */}
        {lkpdData.simulasiCatatan && (
          <div className="bg-slate-900/90 border border-emerald-800/80 p-4 rounded-lg space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Data Observasi Impor dari Laboratorium Simulasi:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] text-slate-300">
              {lkpdData.simulasiCatatan.teoriDigunakan && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block">Teori Terakhir:</span>
                  <span className="font-semibold text-slate-100">{lkpdData.simulasiCatatan.teoriDigunakan}</span>
                </div>
              )}

              {lkpdData.simulasiCatatan.bistonPolusi !== undefined && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block">Polusi Biston:</span>
                  <span className="font-semibold text-amber-400">{lkpdData.simulasiCatatan.bistonPolusi}%</span>
                  <span className="text-[10px] block text-slate-400">
                    Terang: {lkpdData.simulasiCatatan.bistonHasilTerang}% | Gelap: {lkpdData.simulasiCatatan.bistonHasilGelap}%
                  </span>
                </div>
              )}

              {lkpdData.simulasiCatatan.hwP !== undefined && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block">Hardy-Weinberg (p/q):</span>
                  <span className="font-semibold text-sky-400">
                    p={lkpdData.simulasiCatatan.hwP} | q={lkpdData.simulasiCatatan.hwQ}
                  </span>
                  <span className="text-[10px] block text-slate-400">
                    Status: {lkpdData.simulasiCatatan.hwStatus}
                  </span>
                </div>
              )}

              {lkpdData.simulasiCatatan.spesiasiTipe && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block">Spesiasi:</span>
                  <span className="font-semibold text-indigo-400">{lkpdData.simulasiCatatan.spesiasiTipe}</span>
                  <span className="text-[10px] block text-slate-400">
                    Divergensi: {lkpdData.simulasiCatatan.spesiasiDivergensi}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question Form */}
        <div className="space-y-6 pt-2">
          {/* Question 1 */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Pertanyaan 1: Jelaskan perbedaan utama mekanisme evolusi leher jerapah menurut Jean-Baptiste Lamarck dan Charles Darwin! Mengapa percobaan pemotongan ekor tikus oleh August Weismann membantah teori Lamarck?
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan jawaban analitis Anda di sini..."
              value={lkpdData.jawabanTeori}
              onChange={(e) => handleChange('jawabanTeori', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Pertanyaan 2: Berdasarkan simulasi Biston betularia, jelaskan bagaimana perubahan lingkungan dari sebelum Revolusi Industri ke sesudah Revolusi Industri mengubah tekanan seleksi alam terhadap morfologi terang dan gelap!
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan jawaban observasi Anda di sini..."
              value={lkpdData.jawabanSeleksiAlam}
              onChange={(e) => handleChange('jawabanSeleksiAlam', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Question 3 */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Pertanyaan 3: Sebutkan 5 syarat utama berlakunya Hukum Hardy-Weinberg! Jika dalam populasi kecil N = 50 individu terjadi bencana alam (Bottleneck Effect), apa dampak yang terjadi terhadap frekuensi alel p dan q?
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan jawaban analisis kuantitatif Anda di sini..."
              value={lkpdData.jawabanHardyWeinberg}
              onChange={(e) => handleChange('jawabanHardyWeinberg', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Question 4 */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Pertanyaan 4: Jelaskan bagaimana isolasi geografis (spesiasi alopatrik) dapat menghentikan aliran gen (gene flow) hingga membentuk spesies baru yang tidak lagi dapat saling kawin!
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan penjelasan konsep spesiasi di sini..."
              value={lkpdData.jawabanSpesiasi}
              onChange={(e) => handleChange('jawabanSpesiasi', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Kesimpulan */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              Kesimpulan Umum & Refleksi Pembelajaran:
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan kesimpulan menyeluruh mengenai peran mutasi, variasi genetik, dan seleksi alam..."
              value={lkpdData.kesimpulan}
              onChange={(e) => handleChange('kesimpulan', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ================= Printable Layout (Visible on window.print()) ================= */}
      <div className="hidden print:block font-sans text-slate-900 bg-white p-8 space-y-6">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-800 pb-4">
          <h1 className="text-2xl font-black uppercase tracking-wide">
            LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL BIOLOGI
          </h1>
          <h2 className="text-lg font-bold text-slate-700">
            Topik: Teori Evolusi, Seleksi Alam & Hukum Hardy-Weinberg
          </h2>
          <p className="text-xs text-slate-500">Satuan Pendidikan: SMA Kelas XII Biologi | Kurikulum Merdeka</p>
        </div>

        {/* Identity Table */}
        <div className="border border-slate-800 rounded p-4 text-xs space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Nama Murid:</strong> {lkpdData.nama || '...........................................'}</div>
            <div><strong>Kelas:</strong> {lkpdData.kelas || '.....................'}</div>
            <div><strong>Nomor Absen:</strong> {lkpdData.absen || '...........'}</div>
            <div><strong>Sekolah / Kelompok:</strong> {lkpdData.sekolah || '...........................................'}</div>
          </div>
        </div>

        {/* Simulation Snapshot if present */}
        {lkpdData.simulasiCatatan && (
          <div className="border border-slate-800 p-3 rounded text-xs space-y-1">
            <h3 className="font-bold border-b pb-1">RINGKASAN HASIL SIMULASI DIGITAL:</h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {lkpdData.simulasiCatatan.teoriDigunakan && (
                <div>• Teori Dieksperimenkan: {lkpdData.simulasiCatatan.teoriDigunakan}</div>
              )}
              {lkpdData.simulasiCatatan.bistonPolusi !== undefined && (
                <div>• Biston Polusi: {lkpdData.simulasiCatatan.bistonPolusi}% (Terang: {lkpdData.simulasiCatatan.bistonHasilTerang}%, Gelap: {lkpdData.simulasiCatatan.bistonHasilGelap}%)</div>
              )}
              {lkpdData.simulasiCatatan.hwP !== undefined && (
                <div>• Hardy-Weinberg: p={lkpdData.simulasiCatatan.hwP}, q={lkpdData.simulasiCatatan.hwQ} ({lkpdData.simulasiCatatan.hwStatus})</div>
              )}
              {lkpdData.simulasiCatatan.spesiasiTipe && (
                <div>• Spesiasi: {lkpdData.simulasiCatatan.spesiasiTipe} (Divergensi {lkpdData.simulasiCatatan.spesiasiDivergensi}%)</div>
              )}
            </div>
          </div>
        )}

        {/* Student Answers */}
        <div className="space-y-4 text-xs">
          <div className="border-b pb-2">
            <p className="font-bold">1. Analisis Perbandingan Teori Lamarck, Darwin, & Weismann:</p>
            <p className="mt-1 whitespace-pre-wrap italic bg-slate-50 p-2 rounded border border-slate-200">
              {lkpdData.jawabanTeori || '(Belum diisi)'}
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="font-bold">2. Analisis Seleksi Alam Biston betularia:</p>
            <p className="mt-1 whitespace-pre-wrap italic bg-slate-50 p-2 rounded border border-slate-200">
              {lkpdData.jawabanSeleksiAlam || '(Belum diisi)'}
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="font-bold">3. Analisis Syarat & Perhitungan Hukum Hardy-Weinberg:</p>
            <p className="mt-1 whitespace-pre-wrap italic bg-slate-50 p-2 rounded border border-slate-200">
              {lkpdData.jawabanHardyWeinberg || '(Belum diisi)'}
            </p>
          </div>

          <div className="border-b pb-2">
            <p className="font-bold">4. Mekanisme Spesiasi & Isolasi Geografis/Reproduktif:</p>
            <p className="mt-1 whitespace-pre-wrap italic bg-slate-50 p-2 rounded border border-slate-200">
              {lkpdData.jawabanSpesiasi || '(Belum diisi)'}
            </p>
          </div>

          <div>
            <p className="font-bold">Kesimpulan General:</p>
            <p className="mt-1 whitespace-pre-wrap italic bg-slate-50 p-2 rounded border border-slate-200">
              {lkpdData.kesimpulan || '(Belum diisi)'}
            </p>
          </div>
        </div>

        {/* Evaluation Block for Teacher */}
        <div className="mt-8 pt-4 border-t-2 border-slate-800 grid grid-cols-2 gap-8 text-xs">
          <div className="text-center space-y-12">
            <p>Paraf Orang Tua / Wali,</p>
            <p>( .................................................... )</p>
          </div>
          <div className="text-center space-y-12">
            <p>Nilai & Paraf Guru Pengampu Biologi,</p>
            <p>( .................................................... )</p>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center pt-4 border-t">
          Dicetak melalui Aplikasi Evolusi BioLab SMA - @Copyright by. Pak GuruAI
        </div>
      </div>
    </div>
  );
};
