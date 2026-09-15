export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category?: 'Facial Treatment' | 'Hair Treatment';
  categoryNumber?: number;
  code?: string;
  count?: string;
  description: string;
  image: string;
  price: number;
  duration?: string;
  benefits?: string[];
}

export const services: ServiceItem[] = [
  // 1. Facial Treatment
  {
    id: '1',
    slug: 'facial-brightening',
    name: 'Facial Brightening',
    category: 'Facial Treatment',
    categoryNumber: 1,
    code: 'A',
    count: '1 Treatment',
    description: 'Perawatan pencerah wajah intensif untuk memudarkan noda hitam, meratakan warna kulit, dan menstimulasi regenerasi sel kulit agar tampak cerah, segar, dan glowing alami.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    price: 150000,
    duration: '60 Menit',
    benefits: [
      'Mencerahkan wajah kusam & meratakan rona kulit',
      'Membantu memudarkan noda hitam & flek bekas jerawat',
      'Hidrasi mendalam untuk kulit kenyal bercahaya',
      'Masker brightening eksklusif & aplikasi serum intensif'
    ]
  },
  {
    id: '2',
    slug: 'facial-agne',
    name: 'Facial Agne',
    category: 'Facial Treatment',
    categoryNumber: 1,
    code: 'B',
    count: '1 Treatment',
    description: 'Perawatan khusus untuk kulit berjerawat dan berkomedo dengan sterilisasi mendalam, ekstraksi higienis oleh terapis terampil, serta masker penenang anti-bakteri.',
    image: '/images/facialkomedo.jpg',
    price: 135000,
    duration: '60 Menit',
    benefits: [
      'Membersihkan komedo dan jerawat aktif secara higienis',
      'Meredakan peradangan & kemerahan pada kulit wajah',
      'Mengontrol produksi minyak (sebum) berlebih',
      'Sterilisasi High Frequency (HF) anti-bakteri'
    ]
  },
  {
    id: '3',
    slug: 'facial-hydra-dermabration',
    name: 'Facial Hydra Dermabration',
    category: 'Facial Treatment',
    categoryNumber: 1,
    code: 'C',
    count: '1 Treatment',
    description: 'Perawatan modern non-invasif yang memadukan eksfoliasi mendalam, pembersihan pori secara vacuum hydro, dan infus serum kaya antioksidan untuk tekstur kulit ekstra halus.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    price: 195000,
    duration: '60 Menit',
    benefits: [
      'Eksfoliasi sel kulit mati lembut tanpa rasa perih',
      'Pembersihan kotoran pori mendalam dengan vacuum hydro',
      'Infus nutrisi & hidrasi intensif seketika',
      'Wajah terasa sangat halus, kenyal, dan glowing'
    ]
  },
  {
    id: '4',
    slug: 'rf-radiofrequency',
    name: 'RF (RadioFrequency)',
    category: 'Facial Treatment',
    categoryNumber: 1,
    code: 'D',
    count: '1 Treatment',
    description: 'Terapi peremajaan dan pengencangan kulit wajah non-bedah menggunakan gelombang Radio Frequency untuk menstimulasi kolagen alami, mengencangkan kulit kendur, dan contouring wajah.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    price: 175000,
    duration: '45 Menit',
    benefits: [
      'Mengencangkan kulit wajah dan area rahang yang kendur',
      'Membantu membentuk kontur wajah lebih tirus (v-shape)',
      'Merangsang regenerasi serat kolagen dan elastin baru',
      'Menyamarkan garis halus dan tanda penuaan dini'
    ]
  },
  {
    id: '5',
    slug: 'massage-wajah',
    name: 'Massage Wajah',
    category: 'Facial Treatment',
    categoryNumber: 1,
    code: 'E',
    count: '1 Treatment',
    description: 'Pijat relaksasi dan stimulasi akupresur wajah untuk melancarkan sirkulasi darah dan aliran limfatik, meredakan ketegangan otot wajah, serta mengembalikan rona segar alami.',
    image: '/images/facialmassage.jpeg',
    price: 85000,
    duration: '35 Menit',
    benefits: [
      'Melancarkan peredaran darah & drainase limfatik wajah',
      'Meredakan stres dan rasa tegang pada otot wajah',
      'Membantu penyerapan nutrisi minyak esensial/serum',
      'Sensasi relaksasi total dengan rona kulit segar merona'
    ]
  },

  // 2. Hair Treatment
  {
    id: '6',
    slug: 'potong-rambut-wanita',
    name: 'Potong Rambut (Wanita)',
    category: 'Hair Treatment',
    categoryNumber: 2,
    code: 'A',
    count: '1 Treatment',
    description: 'Layanan gunting rambut wanita profesional oleh hair stylist berpengalaman dengan teknik potongan presisi yang disesuaikan dengan proporsi bentuk wajah dan gaya terkini.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    price: 50000,
    duration: '30 Menit',
    benefits: [
      'Konsultasi model rambut sesuai bentuk wajah & karakter',
      'Guntingan rapi, seimbang, dan presisi oleh hair stylist',
      'Menghilangkan ujung rambut kering, patah, atau bercabang',
      'Finishing penataan rambut segar dan modis'
    ]
  },
  {
    id: '7',
    slug: 'creambath',
    name: 'Creambath',
    category: 'Hair Treatment',
    categoryNumber: 2,
    code: 'B',
    count: '1 Treatment',
    description: 'Perawatan rambut tradisional dengan krim nutrisi botanical kaya vitamin, disertai pijatan relaksasi mendalam pada kulit kepala, leher, dan bahu untuk rambut lembut berkilau.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    price: 75000,
    duration: '60 Menit',
    benefits: [
      'Menutrisi helai rambut dan akar secara mendalam',
      'Pijatan kepala, leher, dan pundak yang sangat menenangkan',
      'Melembutkan rambut kaku, kering, dan kasar',
      'Melancarkan peredaran darah di area kulit kepala'
    ]
  },
  {
    id: '8',
    slug: 'masker-rambut',
    name: 'Masker Rambut',
    category: 'Hair Treatment',
    categoryNumber: 2,
    code: 'C',
    count: '1 Treatment',
    description: 'Perawatan deep conditioning intensif untuk helai rambut yang rusak, kering, diwarnai, atau terpapar proses kimiawi agar kembali elastis, lembut, dan berkilau alami.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
    price: 85000,
    duration: '45 Menit',
    benefits: [
      'Memperbaiki helai rambut rapuh, rusak, dan bercabang',
      'Mengembalikan kelembapan alami dan elastisitas rambut',
      'Melindungi helai rambut dari panas alat styling dan polusi',
      'Rambut terasa jauh lebih lembut, jatuh, dan mudah diatur'
    ]
  },
  {
    id: '9',
    slug: 'cuci-rambut-catok-blow',
    name: 'Cuci Rambut + Catok/Blow',
    category: 'Hair Treatment',
    categoryNumber: 2,
    code: 'D',
    count: '1 Treatment',
    description: 'Pencucian rambut menyeluruh dengan sampo aromaterapi dan kondisioner bernutrisi, dilanjutkan proses pengeringan serta styling blow in/out atau catok presisi tahan lama.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    price: 60000,
    duration: '40 Menit',
    benefits: [
      'Kulit kepala dan rambut bersih segar serta wangi semerbak',
      'Pilihan styling: Blow In, Blow Out, atau Catok Lurus/Curly',
      'Aplikasi heat protector untuk melindungi helai rambut',
      'Hasil rambut bervolume, rapi, dan tahan sepanjang hari'
    ]
  }
];

export const getLocalServiceBySlugOrId = (slugOrId: string): ServiceItem | undefined => {
  const query = String(slugOrId).toLowerCase().trim();

  // Alias lookup for common variations
  const aliasMap: Record<string, string> = {
    'facial-acne': 'facial-agne',
    'acne': 'facial-agne',
    'facial-hydra-dermabrasion': 'facial-hydra-dermabration',
    'hydra-dermabration': 'facial-hydra-dermabration',
    'hydra-dermabrasion': 'facial-hydra-dermabration',
    'rf': 'rf-radiofrequency',
    'radiofrequency': 'rf-radiofrequency',
    'radio-frequency': 'rf-radiofrequency',
    'potong-rambut': 'potong-rambut-wanita',
    'cuci-rambut': 'cuci-rambut-catok-blow',
    'blow': 'cuci-rambut-catok-blow',
    'catok': 'cuci-rambut-catok-blow',
  };

  const resolvedQuery = aliasMap[query] || query;

  return services.find(
    s => s.id === resolvedQuery ||
         s.slug === resolvedQuery ||
         s.name.toLowerCase() === resolvedQuery ||
         s.name.toLowerCase().replace(/\s+/g, '-') === resolvedQuery ||
         s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === resolvedQuery.replace(/[^a-z0-9]/g, '')
  );
};