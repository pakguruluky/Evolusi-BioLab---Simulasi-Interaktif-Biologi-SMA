/**
 * Type definitions for Evolusi BioLab SMA
 */

export type ActiveTab = 'tujuan' | 'materi' | 'simulasi' | 'lkpd' | 'kuis' | 'referensi';

export type SubSimulasiTab = 'teori' | 'seleksi' | 'hardy-weinberg' | 'spesiasi';

export interface ScientistTheory {
  id: 'lamarck' | 'darwin' | 'weismann';
  name: string;
  concept: string;
  mechanism: string;
  keyPhrases: string[];
  historicalStatus: string;
  refutationOrSupport: string;
}

export interface BistonMothState {
  x: number;
  y: number;
  type: 'light' | 'dark';
  alive: boolean;
  opacity: number;
}

export interface GenerationDataPoint {
  generation: number;
  lightPercent: number;
  darkPercent: number;
  lightCount: number;
  darkCount: number;
}

export interface HWGenerationPoint {
  generation: number;
  p: number;
  q: number;
  p2: number;
  pq2: number;
  q2: number;
}

export interface LKPDData {
  nama: string;
  kelas: string;
  absen: string;
  sekolah: string;
  
  // Answers
  jawabanTeori: string;
  jawabanSeleksiAlam: string;
  jawabanHardyWeinberg: string;
  jawabanSpesiasi: string;
  kesimpulan: string;
  
  // Imported simulation snapshots
  simulasiCatatan?: {
    teoriDigunakan?: string;
    bistonPolusi?: number;
    bistonHasilTerang?: number;
    bistonHasilGelap?: number;
    hwP?: number;
    hwQ?: number;
    hwP2?: number;
    hw2PQ?: number;
    hwQ2?: number;
    hwStatus?: string;
    spesiasiTipe?: string;
    spesiasiDivergensi?: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface ReferenceItem {
  id: number;
  authors: string;
  year: string;
  title: string;
  publisher: string;
  type: 'Buku Teks' | 'Jurnal Ilmiah' | 'Dokumen Kurikulum' | 'Karya Klasik';
  url?: string;
}
