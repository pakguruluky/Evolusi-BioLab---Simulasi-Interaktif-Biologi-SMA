import React, { useState } from 'react';
import { ActiveTab, LKPDData } from './types';
import { Header } from './components/Header';
import { TujuanPanel } from './components/TujuanPanel';
import { MateriPanel } from './components/MateriPanel';
import { SimulasiHub } from './components/SimulasiHub';
import { LKPDPanel } from './components/LKPDPanel';
import { KuisPanel } from './components/KuisPanel';
import { ReferensiPanel } from './components/ReferensiPanel';
import { Footer } from './components/Footer';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulasi');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // LKPD Student State
  const [lkpdData, setLkpdData] = useState<LKPDData>({
    nama: '',
    kelas: '',
    absen: '',
    sekolah: '',
    jawabanTeori: '',
    jawabanSeleksiAlam: '',
    jawabanHardyWeinberg: '',
    jawabanSpesiasi: '',
    kesimpulan: ''
  });

  // Handle export simulation findings directly into LKPD
  const handleExportToLKPD = (newData: any) => {
    setLkpdData((prev) => ({
      ...prev,
      simulasiCatatan: {
        ...prev.simulasiCatatan,
        teoriDigunakan: newData.teori || prev.simulasiCatatan?.teoriDigunakan,
        bistonPolusi: newData.pollution !== undefined ? newData.pollution : prev.simulasiCatatan?.bistonPolusi,
        bistonHasilTerang: newData.lightPercent !== undefined ? newData.lightPercent : prev.simulasiCatatan?.bistonHasilTerang,
        bistonHasilGelap: newData.darkPercent !== undefined ? newData.darkPercent : prev.simulasiCatatan?.bistonHasilGelap,
        hwP: newData.p !== undefined ? newData.p : prev.simulasiCatatan?.hwP,
        hwQ: newData.q !== undefined ? newData.q : prev.simulasiCatatan?.hwQ,
        hwP2: newData.p2 !== undefined ? newData.p2 : prev.simulasiCatatan?.hwP2,
        hw2PQ: newData.pq2 !== undefined ? newData.pq2 : prev.simulasiCatatan?.hw2PQ,
        hwQ2: newData.q2 !== undefined ? newData.q2 : prev.simulasiCatatan?.hwQ2,
        hwStatus: newData.status || prev.simulasiCatatan?.hwStatus,
        spesiasiTipe: newData.tipe || prev.simulasiCatatan?.spesiasiTipe,
        spesiasiDivergensi: newData.divergensi !== undefined ? newData.divergensi : prev.simulasiCatatan?.spesiasiDivergensi
      }
    }));

    showToast('Data observasi simulasi berhasil disimpan ke LKPD Digital!');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  const handlePrintLKPD = () => {
    // Switch to LKPD tab first then trigger print
    setActiveTab('lkpd');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintLKPD={handlePrintLKPD}
      />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-900 text-blue-100 border border-blue-500 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main View Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        {activeTab === 'tujuan' && <TujuanPanel />}
        {activeTab === 'materi' && <MateriPanel />}
        {activeTab === 'simulasi' && <SimulasiHub onExportToLKPD={handleExportToLKPD} />}
        {activeTab === 'lkpd' && (
          <LKPDPanel
            lkpdData={lkpdData}
            setLkpdData={setLkpdData}
            onPrint={handlePrintLKPD}
          />
        )}
        {activeTab === 'kuis' && <KuisPanel />}
        {activeTab === 'referensi' && <ReferensiPanel />}
      </main>

      {/* Bottom Footer with mandatory copyright */}
      <Footer />
    </div>
  );
}
