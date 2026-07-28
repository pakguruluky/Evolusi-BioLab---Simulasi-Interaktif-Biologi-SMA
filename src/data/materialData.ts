import { ScientistTheory } from '../types';

export const SCIENTIST_THEORIES: ScientistTheory[] = [
  {
    id: 'lamarck',
    name: 'Jean-Baptiste Lamarck (1809)',
    concept: 'Teori Adaptasi Fisiologis & Pewarisan Sifat Diperoleh (Acquired Characteristics)',
    mechanism: 'Hukum Use and Disuse: Organ tubuh yang sering digunakan akan terus berkembang dan membesar, sedangkan organ yang tidak digunakan akan mengalami atrofi/kemunduran. Sifat perolehan ini kemudian diwariskan ke keturunannya.',
    keyPhrases: ['Use and Disuse', 'Pewarisan Karakter Diperoleh', 'Dorongan Internal Menuju Kesempurnaan'],
    historicalStatus: 'Ditolak secara ilmiah dalam genetika modern.',
    refutationOrSupport: 'Ditolak karena perubahan sel somatik (seperti pemanjangan leher akibat meregangkan otot) tidak mengubah urutan DNA pada sel gamet (sperma/ovum) yang diwariskan.'
  },
  {
    id: 'darwin',
    name: 'Charles Darwin (1859)',
    concept: 'Teori Evolusi melalui Seleksi Alam (Natural Selection)',
    mechanism: 'Populasi secara alami memiliki variasi fenotipe bawaan. Individu dengan variasi fenotipe yang paling sesuai dengan tekanan lingkungan memiliki tingkat kelangsungan hidup dan reproduksi lebih tinggi (Survival of the Fittest), lalu mewariskan gen unggul tersebut.',
    keyPhrases: ['Variasi Alami', 'Kelebihan Populasi (Overproduction)', 'Kompetisi & Perjuangan Hidup', 'Seleksi Alam'],
    historicalStatus: 'Diterima dan menjadi fondasi utama Teori Sintesis Modern.',
    refutationOrSupport: 'Didukung oleh bukti fosil, anatomi komparatif, biogeografi, dan genetika molekuler modern.'
  },
  {
    id: 'weismann',
    name: 'August Weismann (1892)',
    concept: 'Teori Plasma Nutfah (Germplasm Theory)',
    mechanism: 'Membedakan secara tegas antara sel somatik (tubuh) dan sel germinal (plasma nutfah/gamet). Perubahan akibat faktor lingkungan pada sel somatik tidak diwariskan. Hanya mutasi atau perubahan genetika pada sel germinal yang menentukan evolusi.',
    keyPhrases: ['Plasma Nutfah vs Somatoplasma', 'Barrier Weismann', 'Eksperimen Ekor Tikus'],
    historicalStatus: 'Diterima dan memperkuat Teori Darwin dengan penjelasan mekanisme genetika.',
    refutationOrSupport: 'Ditingkatkan kebenarannya setelah penemuan ikatan materi genetik DNA dan hukum pewarisan sifat Mendel.'
  }
];

export const EDUCATIONAL_CHAPTERS = [
  {
    id: 'bab1',
    title: 'Bab 1: Teori-Teori Asal Usul & Evolusi Organisme',
    subtitle: 'Membandingkan Pemikiran Lamarck, Darwin, dan Weismann',
    content: `
Evolusi didefinisikan sebagai perubahan bertahap pada sifat-sifat terwariskan suatu populasi organisme dari satu generasi ke generasi berikutnya dalam jangka waktu yang panjang.

### 1. Teori Jean-Baptiste Lamarck
Lamarck berpendapat bahwa evolusi terjadi karena respons langsung makhluk hidup terhadap lingkungan. Contoh klasik Lamarck adalah leher jerapah:
- Jerapah purba berleher pendek membentangkan lehernya terus-menerus untuk menjangkau daun di pohon yang tinggi.
- Akibat latihan dan penggunaan terus-menerus (*use*), leher jerapah menjadi semakin panjang.
- Karakter leher panjang yang didapat selama hidup ini diwariskan (*inherited*) kepada anak-anaknya.

### 2. Teori Charles Darwin
Dalam bukunya *"On the Origin of Species"* (1859), Darwin mengajukan pandangan berbeda:
- Dalam populasi jerapah purba, **sudah terdapat variasi alami**: ada yang berleher pendek, sedang, dan panjang.
- Ketika sumber makanan di bagian bawah habis, terjadi **kompetisi (struggle for existence)**.
- Jerapah berleher panjang lebih mudah mendapatkan daun tinggi sehingga bertahan hidup (*survival of the fittest*), sedangkan jerapah berleher pendek kelaparan dan mati (**seleksi alam**).
- Jerapah berleher panjang berkembang biak dan mewariskan sifat leher panjang kepada generasi berikutnya.

### 3. Eksperimen Pembuktian August Weismann
Untuk menguji teori Lamarck, Weismann memotong ekor 22 generasi tikus laboratorium (sebanyak 901 ekor tikus):
- **Hasil:** Seluruh keturunan tikus generasi ke-22 tetap lahir dengan ekor yang lengkap dan panjang!
- **Kesimpulan:** Pemotongan ekor hanya merusak sel somatik (tubuh), bukan sel germinal (plasma nutfah/sperma/ovum). Hal ini membuktikan bahwa sifat yang didapat dari lingkungan tidak diwariskan, mendukung Teori Seleksi Alam Darwin.
    `
  },
  {
    id: 'bab2',
    title: 'Bab 2: Mekanisme Evolusi & Seleksi Alam',
    subtitle: 'Adaptasi, Variasi Genetik, dan Contoh Fenomena Alam',
    content: `
Seleksi alam bekerja pada variasi fenotipe populasi. Ada 3 jenis seleksi alam utama:

1. **Seleksi Terarah (Directional Selection):** Menguntungkan salah satu ekstrem fenotipe. (Contoh: Ngengat *Biston betularia* warna gelap di daerah polusi).
2. **Seleksi Penyeimbang (Stabilizing Selection):** Menguntungkan fenotipe rata-rata/antara dan menyeleksi fenotipe ekstrem. (Contoh: Berat lahir bayi manusia).
3. **Seleksi Pemutus (Disruptive Selection):** Menguntungkan kedua fenotipe ekstrem dan menyeleksi fenotipe antara. (Contoh: Burung pemakan biji dengan paruh sangat besar atau sangat kecil).

### Studi Kasus: *Biston betularia* di Inggris
- **Sebelum Revolusi Industri:** Pohon dilapisi lumut kerak (*lichen*) berwarna cerah. Ngengat warna terang tersamarkan (berkamuflase) dari burung pemangsa, sedangkan ngengat gelap mudah terlihat dan dimangsa. Populasi dominan: **Ngengat Terang**.
- **Sesudah Revolusi Industri:** Polusi jelaga batubara menghitamkan batang pohon dan membunuh lichen. Ngengat warna gelap menjadi tersamarkan, sedangkan ngengat terang sangat mudah terlihat. Populasi dominan bergeser menjadi: **Ngengat Gelap**.
    `
  },
  {
    id: 'bab3',
    title: 'Bab 3: Hukum Hardy-Weinberg & Genetika Populasi',
    subtitle: 'Persamaan Matematis Kesetimbangan Genetik Populasi',
    content: `
G.H. Hardy (matematikawan) dan Wilhelm Weinberg (dokter) merumuskan bahwa frekuensi alel dan genotipe dalam suatu populasi akan **tetap konstan (seimbang)** dari generasi ke generasi, **JIKA** memenuhi 5 syarat berikut:

### 5 Syarat Kesetimbangan Hardy-Weinberg:
1. Ukuran populasi sangat besar (menghindari hanyutan genetik / *genetic drift*).
2. Perkawinan terjadi secara acak (*random mating*).
3. Tidak terjadi mutasi gen.
4. Tidak ada migrasi (imigrasi/emigrasi / *gene flow*).
5. Tidak ada seleksi alam (semua genotipe memiliki viabilitas dan fertilitas yang sama).

### Rumus Matematika Hardy-Weinberg:
Untuk gen autosomal dengan 2 alel: Alel Dominan ($A$) dengan frekuensi $p$, dan Alel Resesif ($a$) dengan frekuensi $q$:

$$p + q = 1$$

Frekuensi genotipe populasi disimbolkan dengan:

$$p^2 + 2pq + q^2 = 1$$

- $p^2$ = Frekuensi individu Homosigot Dominan ($AA$)
- $2pq$ = Frekuensi individu Heterosigot ($Aa$)
- $q^2$ = Frekuensi individu Homosigot Resesif ($aa$)

**Penyebab Mikroevolusi (Penyimpangan Hukum H-W):**
- **Genetic Drift (Hanyutan Genetik):** Perubahan acak frekuensi alel pada populasi kecil.
- **Bottleneck Effect (Efek Leher Botol):** Bencana alam mengurangi populasi secara drastis sehingga variasi genetik berkurang secara acak.
- **Founder Effect (Efek Pendiri):** Sejumlah kecil individu mengkolonisasi habitat baru dengan komposisi alel yang berbeda dari populasi induk.
    `
  },
  {
    id: 'bab4',
    title: 'Bab 4: Spesiasi & Pembentukan Spesies Baru',
    subtitle: 'Isolasi Geografis dan Isolasi Reproduktif',
    content: `
Spesiasi adalah proses pembentukan spesies baru yang berbeda dari populasi nenek moyangnya akibat terhentinya aliran gen (*gene flow*).

### 1. Spesiasi Alopatrik (Allopatric Speciation)
Terjadi ketika populasi terpisah secara fisik oleh **penghalang geografis** (seperti gunung baru, sungai pembelah, atau pemisahan pulau). Selama terisolasi, akumulasi mutasi dan seleksi alam lokal membuat kedua populasi terpisah menjadi spesies berbeda yang tidak dapat saling membuahi lagi.

### 2. Spesiasi Simpatrik (Sympatric Speciation)
Terjadi pada wilayah geografis yang sama tanpa penghalang fisik, melainkan dipicu oleh **Isolasi Reproduktif**:
- **Isolasi Prezigotik (Sebelum Pembuahan):**
  - *Isolasi Ekologis/Habitat:* Menghuni micro-habitat yang berbeda.
  - *Isolasi Musim/Temporal:* Waktu/musim kawin berbeda.
  - *Isolasi Perilaku:* Ritual/tarian kawin tidak dikenali.
  - *Isolasi Mekanis:* Organ reproduksi tidak cocok.
  - *Isolasi Gamet:* Sperma tidak dapat membuahi sel telur.
- **Isolasi Pascapagiotik (Setelah Pembuahan):**
  - *Mati Hibrid:* Zigot/embrio gugur sebelum lahir.
  - *Sterilitas Hibrid:* Keturunan lahir sehat namun mandul (contoh: Bagal / Mule hasil persilangan Kuda x Keledai).
    `
  }
];
