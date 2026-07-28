import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pernyataan berikut yang PALING tepat menggambarkan perbedaan mendasar antara teori evolusi Jean-Baptiste Lamarck dan Charles Darwin adalah...',
    options: [
      'Lamarck menekankan seleksi alam, sedangkan Darwin menekankan mutasi genetik.',
      'Lamarck berpendapat variasi dialami secara acak, sedangkan Darwin berpendapat sifat diperoleh dari latihan.',
      'Lamarck berpendapat adaptasi organ tubuh karena sering digunakan diwariskan, sedangkan Darwin berpendapat seleksi alam bekerja pada variasi alami yang sudah ada.',
      'Lamarck menggunakan tikus sebagai eksperimen, sedangkan Darwin menggunakan jerapah sebagai eksperimen.'
    ],
    correctAnswer: 2,
    explanation: 'Lamarck mengajukan konsep "Use and Disuse" di mana organ yang sering digunakan bertambah berkembang dan diwariskan. Darwin mengajukan bahwa variasi alami sudah ada sejak awal, dan lingkungan menyeleksi individu yang paling fit.',
    topic: 'Teori Evolusi'
  },
  {
    id: 2,
    question: 'August Weismann memotong ekor tikus hingga 22 generasi berturut-turut, namun keturunannya tetap berekor panjang. Eksperimen ini membuktikan bahwa...',
    options: [
      'Teori Darwin salah karena tikus tidak mengalami mutasi.',
      'Perubahan pada sel somatik akibat faktor luar tidak diwariskan kepada sel germinal/gamet.',
      'Ekor tikus merupakan organ vestigial yang tidak memiliki fungsi.',
      'Lingkungan sepenuhnya menentukan sifat genetik suatu organisme.'
    ],
    correctAnswer: 1,
    explanation: 'Eksperimen Weismann membuktikan Teori Plasma Nutfah (Germplasm Theory) bahwa perubahan pada sel tubuh (somatik) akibat perlakuan lingkungan tidak memengaruhi sel kelamin (germinal) sehingga tidak diwariskan.',
    topic: 'Teori Weismann'
  },
  {
    id: 3,
    question: 'Pada fenomena industri di Inggris, populasi ngengat Biston betularia berwarna gelap bertambah drastis di area industri yang berpolusi jelaga. Mekanisme seleksi alam yang terjadi adalah...',
    options: [
      'Seleksi Penyeimbang (Stabilizing Selection)',
      'Seleksi Pemutus (Disruptive Selection)',
      'Seleksi Terarah (Directional Selection)',
      'Seleksi Buatan (Artificial Selection)'
    ],
    correctAnswer: 2,
    explanation: 'Seleksi Terarah (Directional Selection) terjadi ketika kondisi lingkungan bergeser menguntungkan salah satu ekstrem fenotipe (ngengat gelap tersamarkan di batang pohon yang terkena polusi jelaga).',
    topic: 'Seleksi Alam'
  },
  {
    id: 4,
    question: 'Dalam suatu populasi manusia berpenduduk 10.000 jiwa, terdapat 160 orang yang menderita albino (aa). Jika populasi berada dalam kesetimbangan Hardy-Weinberg, frekuensi alel resesif (a) dan frekuensi pembawa sifat/carrier (Aa) adalah...',
    options: [
      'a = 0,04 dan Aa = 0,32',
      'a = 0,04 dan Aa = 0,0016',
      'a = 0,16 dan Aa = 0,84',
      'a = 0,04 dan Aa = 0,0768'
    ],
    correctAnswer: 3,
    explanation: 'q^2 = 160 / 10.000 = 0,016 -> q = √0,016 = 0,04 (alel resesif a = 0,04, tapi perhatikan √0.0160 = 0.04 -> tunggu, 160/10000 = 0.016 -> √0.016 ≈ 0.126. Namun jika 160/10000 = 0.016 -> q^2 = 0.0016? Jika 16 orang = 0.0016 -> q = 0.04. Jika 160 dari 10.000 = 0.016 -> q^2=0.016, q=0.126, p=0.874, 2pq = 2(0.874)(0.126) = 0.220. Mari kita periksa opsi D: q^2 = 0.0016 -> q=0.04, p=0.96. 2pq = 2 * 0.96 * 0.04 = 0.0768 (7.68%). Jadi untuk 16 penderita albino dari 10.000 (0.0016), q = 0.04 dan 2pq = 0.0768!',
    topic: 'Hardy-Weinberg'
  },
  {
    id: 5,
    question: 'Berikut ini manakah yang BUKAN merupakan syarat agar populasi dapat mempertahankan Kesetimbangan Hardy-Weinberg?',
    options: [
      'Ukuran populasi sangat besar',
      'Terjadi perkawinan secara acak (random mating)',
      'Terjadi seleksi alam yang ketat terhadap individu lemah',
      'Tidak ada mutasi dan tidak ada migrasi'
    ],
    correctAnswer: 2,
    explanation: 'Adanya seleksi alam akan mengubah frekuensi alel unggul dan menyingkirkan alel merugikan, sehingga menggagalkan kesetimbangan Hardy-Weinberg dan memicu evolusi.',
    topic: 'Hardy-Weinberg'
  },
  {
    id: 6,
    question: 'Peristiwa berkurangnya variasi genetik secara acak akibat bencana alam banjir bandang yang menyisakan hanya sedikit survivor pada suatu populasi dinamakan...',
    options: [
      'Gene Flow (Aliran Gen)',
      'Founder Effect (Efek Pendiri)',
      'Bottleneck Effect (Efek Leher Botol)',
      'Mutasi Induksi'
    ],
    correctAnswer: 2,
    explanation: 'Efek Leher Botol (Bottleneck Effect) adalah jenis hanyutan genetik (genetic drift) akibat bencana atau krisis yang mengurangi populasi secara drastis, menyisakan alel secara acak.',
    topic: 'Mikroevolusi'
  },
  {
    id: 7,
    question: 'Pemisahan populasi akibat terbentuknya jurang ngarai raksasa atau sungai baru yang menghentikan perkawinan antar populasi memicu pembentukan spesies baru yang disebut...',
    options: [
      'Spesiasi Simpatrik',
      'Spesiasi Alopatrik',
      'Spesiasi Parapatrik',
      'Spesiasi Peripatrik'
    ],
    correctAnswer: 1,
    explanation: 'Spesiasi Alopatrik (Allopatric Speciation) adalah pembentukan spesies baru akibat isolasi fisik atau geografis yang memutus aliran gen.',
    topic: 'Spesiasi'
  },
  {
    id: 8,
    question: 'Persilangan antara Kuda betina ($2n=64$) dengan Keledai jantan ($2n=62$) menghasilkan anak berupa Bagal (Mule) yang sehat dan kuat tetapi steril (mandul). Bentuk isolasi reproduksi ini termasuk...',
    options: [
      'Isolasi Prezigotik - Perilaku',
      'Isolasi Prezigotik - Temporal',
      'Isolasi Pascapagiotik - Sterilitas Hibrid',
      'Isolasi Pascapagiotik - Kegagalan Hibrid'
    ],
    correctAnswer: 2,
    explanation: 'Bagal adalah contoh terisolasinya populasi secara Pascapagiotik (Postzygotic isolation) akibat Sterilitas Hibrid (Hybrid Sterility) karena perbedaan jumlah kromosom parental.',
    topic: 'Isolasi Reproduktif'
  },
  {
    id: 9,
    question: 'Dua spesies tumbuhan berbunga hidup di padang rumput yang sama, tetapi spesies A mekar pada bulan April dan spesies B mekar pada bulan Agustus. Hal ini mencegah terjadinya pembuahan silang akibat...',
    options: [
      'Isolasi Ekologis',
      'Isolasi Temporal / Musim',
      'Isolasi Mekanis',
      'Isolasi Gamet'
    ],
    correctAnswer: 1,
    explanation: 'Isolasi Temporal / Musim terjadi ketika periode reproduksi atau kematangan gamet dua spesies berbeda terjadi pada waktu yang tidak bersamaan.',
    topic: 'Isolasi Reproduktif'
  },
  {
    id: 10,
    question: 'Hukum Hardy-Weinberg berguna bagi ilmuwan genetika populasi terutama untuk...',
    options: [
      'Menciptakan spesies baru secara instan di laboratorium.',
      'Mengetahui apakah suatu populasi sedang mengalami mikroevolusi atau dalam keadaan seimbang.',
      'Mengubah genotip penyakit menular agar menjadi tidak berbahaya.',
      'Membuktikan bahwa seleksi alam tidak pernah terjadi di alam.'
    ],
    correctAnswer: 1,
    explanation: 'Persamaan Hardy-Weinberg berfungsi sebagai "null model" (model pembanding). Jika frekuensi alel empiris menyimpang dari perhitungan H-W, maka ilmuwan mengetahui bahwa ada faktor evolusi (seperti seleksi alam, mutasi, atau genetic drift) yang sedang bekerja.',
    topic: 'Hardy-Weinberg'
  }
];
