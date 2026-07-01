export type CommunityCategory =
  | 'education'
  | 'health'
  | 'food'
  | 'markets'
  | 'emergency'
  | 'awareness';

export type CommunitySourceType =
  | 'google_maps'
  | 'facebook'
  | 'official_website'
  | 'official_government'
  | 'manual_verified'
  | 'awareness'
  | 'manual'
  | 'official_page';

export interface CommunityHubItem {
  id: string;
  category: CommunityCategory;
  title: string;
  description: string;
  badge: string;
  sourceLabel: string;
  sourceType: CommunitySourceType;
  sourceUrl: string;
  mapUrl?: string;
  directionsUrl?: string;
  facebookUrl?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  phoneNumbers?: {
    label: string;
    number: string;
    type: 'call' | 'whatsapp';
    sourceUrl?: string;
  }[];
  rating?: number;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  imageLicense?: string;
  imageNotes?: string;
  imageStatus?: 'real' | 'pending_real_image';
  imageProvider?:
    | 'official_page'
    | 'official_website'
    | 'google_places'
    | 'public_general'
    | 'free_license'
    | 'free_license_egypt'
    | 'egypt_public_source'
    | 'arabic_public_source'
    | 'free_license_arabic'
    | 'official_government'
    | 'client_provided'
    | 'cloudinary'
    | 'dalilsubhi_fallback';
  contactNote?: string;
  guidanceSections?: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  }[];
  supportingImages?: {
    imageUrl: string;
    imageAlt: string;
    imageCredit: string;
    imageSourceUrl?: string;
    imageLicense?: string;
    notes?: string;
  }[];
  keywords: string[];
  isFeatured?: boolean;
  priority?: number;
  verificationStatus?: 'verified_public_source' | 'needs_review' | 'pending_contact' | 'pending_real_image';
  isPublic?: boolean;
}

export const communityCategoryLabels: Record<CommunityCategory, string> = {
  education: 'البوابة التعليمية',
  health: 'البوابة الصحية',
  food: 'مطاعم وكافيهات',
  markets: 'هايبر وسوبر ماركت',
  emergency: 'الطوارئ والسلامة',
  awareness: 'إرشادات مجتمعية',
};

export const communityCategoryDescriptions: Record<CommunityCategory, string> = {
  education: 'خيارات تعليمية ومراجع رسمية موثوقة قريبة من المنطقة.',
  health: 'مراكز ومستشفيات وإرشادات صحية مرجعية للتجهيز السريع.',
  food: 'مكان واحد يجمع خيارات أكل عامة ومراجعات خفيفة للمنطقة.',
  markets: 'اختيارات تسوق يومية وسريعة قريبة من السكن والخدمة.',
  emergency: 'أرقام طوارئ وإشارات سريعة وقت الحاجة.',
  awareness: 'إرشادات عامة مختصرة تساعد وقت المواقف الطارئة.',
};

export const communityCategoryOrder: CommunityCategory[] = [
  'education',
  'health',
  'food',
  'markets',
  'emergency',
  'awareness',
];

export const communityCategoryFilters: Array<{
  key: 'all' | CommunityCategory;
  label: string;
}> = [
  { key: 'all', label: 'الكل' },
  { key: 'education', label: 'التعليم' },
  { key: 'health', label: 'الصحة' },
  { key: 'food', label: 'المطاعم' },
  { key: 'markets', label: 'الأسواق' },
  { key: 'emergency', label: 'الطوارئ' },
  { key: 'awareness', label: 'الإرشادات' },
];

const rawHubItems: CommunityHubItem[] = [
  {
    id: 'education-zagazig-national',
    category: 'education',
    title: 'جامعة الزقازيق الأهلية',
    description: 'معلومة رسمية/خبرية عن الجامعة الأهلية القريبة من نطاق العاشر.',
    badge: 'جامعة خاصة',
    sourceLabel: 'الموقع الرسمي',
    sourceType: 'official_website',
    sourceUrl: 'https://news.zu.edu.eg/ShowDetails/48873/1',
    imageUrl: 'https://newsadmin.zu.edu.eg/UploadedFiles/Image/News/znu13082024033340P.jpg',
    imageSourceUrl: 'https://news.zu.edu.eg/ShowDetails/48873/1',
    imageCredit: 'الصورة من الموقع الرسمي',
    imageProvider: 'official_website',
    imageStatus: 'real',
    keywords: ['جامعة الزقازيق الأهلية', 'الجامعات الخاصة', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 1,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'education-sutech',
    category: 'education',
    title: 'SUTech El Sewedy University',
    description: 'صفحة الجامعة الرسمية المعلنة، لكن بيانات الصورة/التواصل تحتاج مراجعة.',
    badge: 'تعليم جامعي',
    sourceLabel: 'الموقع الرسمي',
    sourceType: 'official_website',
    sourceUrl: 'https://sut.edu.eg/',
    facebookUrl: 'https://www.facebook.com/share/1TfPoVTaYF/',
    imageUrl: 'https://sut.edu.eg/wp-content/uploads/2026/03/SU-Tech-Campus-General-Images-102.jpg',
    imageAlt: 'جامعة SUTech El Sewedy University - صورة من الموقع الرسمي',
    imageSourceUrl: 'https://sut.edu.eg/',
    imageCredit: 'الصورة من الموقع الرسمي',
    imageStatus: 'real',
    imageProvider: 'official_website',
    keywords: ['SUTech', 'Sewedy', 'الجامعات الخاصة', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 2,
    verificationStatus: 'needs_review',
    isPublic: false,
  },
  {
    id: 'education-innovation',
    category: 'education',
    title: 'Innovation University',
    description: 'صفحة الجامعة الرسمية وصورة غلاف ثابتة من موقعها الرسمي.',
    badge: 'تعليم جامعي',
    sourceLabel: 'الموقع الرسمي',
    sourceType: 'official_website',
    sourceUrl: 'https://iu.edu.eg/about-us/',
    imageUrl: 'https://iu.edu.eg/wp-content/uploads/2025/02/DSC05396-1-scaled-1.jpg',
    imageSourceUrl: 'https://iu.edu.eg/about-us/',
    imageCredit: 'الصورة من الموقع الرسمي',
    imageProvider: 'official_website',
    imageStatus: 'real',
    keywords: ['Innovation University', 'الجامعات الخاصة', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 3,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-10th-university-hospital',
    category: 'health',
    title: 'مستشفى العاشر من رمضان الجامعي - التميز العصري',
    description: 'مستشفى جامعي حكومي داخل مدينة العاشر من رمضان ومناسب كبداية للبحث عن خدمات طبية وطوارئ.',
    badge: 'مستشفى',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/UHowAryAdF676EQzf',
    mapUrl: 'https://share.google/UHowAryAdF676EQzf',
    rating: 3.7,
    imageUrl:
      'https://www.presidency.eg/media/191593/%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89-%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-jpg.jpg?mode=crop&width=150',
    imageAlt: 'مستشفى العاشر من رمضان الجامعي',
    imageSourceUrl:
      'https://www.presidency.eg/ar/%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9-%D8%A7%D9%84%D9%82%D9%88%D9%85%D9%8A%D8%A9/%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89-%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%8A-02-07-2022/',
    imageCredit: 'الصورة من المصدر الرسمي',
    imageProvider: 'official_website',
    imageStatus: 'real',
    keywords: ['مستشفى', 'طوارئ', 'جامعة', 'العاشر من رمضان', 'رعاية صحية'],
    isFeatured: true,
    priority: 4,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-10th-insurance-hospital',
    category: 'health',
    title: 'مستشفى العاشر من رمضان المركزي - التأمين الصحي',
    description: 'مستشفى مركزي وتامين صحي داخل مدينة العاشر من رمضان.',
    badge: 'مستشفى',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/6TU1waUNHnCq3oC1',
    mapUrl: 'https://share.google/6TU1waUNHnCq3oC1',
    rating: 4.7,
    keywords: ['مستشفى', 'تأمين صحي', 'طوارئ', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 5,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-dr-ahmed-okasha-specialist-hospital',
    category: 'health',
    title: 'مستشفى الدكتور أحمد عكاشة التخصصي',
    description: 'مستشفى تخصصي داخل العاشر من رمضان يمكن الوصول إليه ضمن احتياجات الرعاية الطبية.',
    badge: 'مستشفى تخصصي',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/pxDZ5FZYIm3FFli0I',
    mapUrl: 'https://share.google/pxDZ5FZYIm3FFli0I',
    rating: 3.7,
    keywords: ['مستشفى تخصصي', 'طوارئ', 'رعاية', 'العاشر من رمضان', 'أحمد عكاشة'],
    isFeatured: true,
    priority: 6,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-shorouk-central-hospital',
    category: 'health',
    title: 'مستشفى الشروق المركزي - الشروق',
    description: 'مستشفى مركزي في مدينة الشروق، مفيد كخيار طبي قريب من نطاق المنطقة.',
    badge: 'مستشفى',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/z8VKuOGd9ihukE8n5',
    mapUrl: 'https://share.google/z8VKuOGd9ihukE8n5',
    rating: 3.3,
    imageUrl:
      'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-1/613223690_122279815382249503_2088025819284831126_n.jpg?stp=dst-jpg_tt6&cstp=mx892x898&ctp=s720x720&_nc_cat=100&ccb=1-7&_nc_sid=3ab345&_nc_ohc=xwZJHoG5DIoQ7kNvwHe_nZt&_nc_oc=AdplgULd02xBNt6-AdMriI1nFrfcOzgMHhx5EiRkaziL-h_4SxH5lfUKpT223JBJIyc&_nc_zt=24&_nc_ht=scontent-lga3-2.xx&_nc_gid=guIywBTZlS1YSVhzjBKbqg&_nc_ss=72100&oh=00_AQCoQcVhYG6gi46gbk27ONzH-CpHA8w0kWQnZe9R7ZNF-A&oe=6A4AC1E4',
    imageAlt: 'مستشفى الشروق المركزي',
    imageSourceUrl: 'https://www.facebook.com/p/%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%8A-%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D9%82-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%89-61557485090062/',
    imageCredit: 'صورة معاينة عامة من فيسبوك',
    imageProvider: 'official_page',
    imageStatus: 'real',
    keywords: ['مستشفى', 'الشروق', 'طوارئ', 'قريب من العاشر'],
    isFeatured: true,
    priority: 7,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-eltawheed-specialty-clinics',
    category: 'health',
    title: 'عيادات التوحيد الطبية التخصصية - العاشر من رمضان',
    description: 'عيادات طبية تخصصية داخل العاشر من رمضان.',
    badge: 'عيادات تخصصية',
    sourceLabel: 'صفحة فيسبوك',
    sourceType: 'facebook',
    sourceUrl: 'https://www.facebook.com/eltawheed10clinics/?locale=ar_AR',
    mapUrl: 'https://www.facebook.com/eltawheed10clinics/?locale=ar_AR',
    rating: 4.5,
    imageUrl:
      'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-1/448506896_786887663553555_227230090150399904_n.jpg?stp=dst-jpg_tt6&cstp=mx500x500&ctp=s500x500&_nc_cat=101&ccb=1-7&_nc_sid=3ab345&_nc_ohc=f3MjprCbVG0Q7kNvwH8w2Yp&_nc_oc=AdocNNcVlll8-AUzFBMD6_hSQutOqMcoIRNfG3VbbgCzNRv_2GV8OhwevbapTeEAkL4&_nc_zt=24&_nc_ht=scontent-lga3-2.xx&_nc_gid=ln1Y7oylXkI_K8yoXrmeKA&_nc_ss=72100&oh=00_AQAfhPouEa5nlG0qlDdMoIRO5rprgayI3dJfByTCSkeJ1A&oe=6A4A92FA',
    imageAlt: 'عيادات التوحيد الطبية التخصصية',
    imageSourceUrl: 'https://www.facebook.com/eltawheed10clinics/?locale=ar_AR',
    imageCredit: 'صورة معاينة عامة من فيسبوك',
    imageProvider: 'official_page',
    imageStatus: 'real',
    keywords: ['عيادات', 'تخصصات طبية', 'التوحيد', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 8,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'health-el-ezaby-pharmacy',
    category: 'health',
    title: 'صيدلية العزبي - أهل العاشر من رمضان',
    description: 'صيدلية داخل نطاق العاشر من رمضان مناسبة للاحتياجات الدوائية السريعة.',
    badge: 'صيدلية',
    sourceLabel: 'دليل عام',
    sourceType: 'manual_verified',
    sourceUrl: 'https://yellowpages.com.eg/ar/profile/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%B2%D8%A8%D9%89/633455',
    mapUrl: 'https://yellowpages.com.eg/ar/profile/%D8%B5%D9%8A%D8%AF%D9%84%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%B2%D8%A8%D9%89/633455',
    rating: 4.1,
    phoneNumbers: [
      {
        label: 'الخط الساخن',
        number: '19600',
        type: 'call',
        sourceUrl: 'https://elezabypharmacy.com/',
      },
    ],
    keywords: ['صيدلية', 'العزبي', 'الدواء', 'العاشر من رمضان'],
    isFeatured: true,
    priority: 9,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-contacts-egypt',
    category: 'emergency',
    title: 'أرقام الطوارئ في مصر',
    description: 'مرجع سريع للأرقام الرسمية الأساسية.',
    badge: 'أرقام رسمية',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: '/community-images/emergency-egypt.jpg',
    imageAlt: 'أرقام الطوارئ في مصر',
    imageCredit: 'شباب العالم',
    imageLicense: 'internet_source_credit',
    imageProvider: 'arabic_public_source',
    imageSourceUrl: 'https://shababel3alam.com/wp-content/uploads/2023/04/%D8%A3%D8%B1%D9%82%D8%A7%D9%85-%D8%A7%D9%84%D8%B7%D9%88%D8%A7%D8%B1%D8%A6-%D9%81%D9%8A-%D9%85%D8%B5%D8%B1.jpg',
    imageStatus: 'real',
    phone: '122 / 123 / 126 / 128 / 121 / 129',
    keywords: ['طوارئ', 'مصر', 'شرطة', 'إسعاف', 'مطافي', 'كهرباء', 'غاز'],
    isFeatured: true,
    priority: 31,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-ambulance',
    category: 'emergency',
    title: 'الإسعاف',
    description: 'خدمة الإسعاف الرسمية في مصر.',
    badge: 'عاجل',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ambulance_at_Cairo_airport.jpg',
    imageAlt: 'سيارة إسعاف عامة',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Ambulance_at_Cairo_airport.jpg',
    imageCredit: 'صورة عامة مرخصة من ويكيميديا كومنز',
    imageLicense: 'CC BY-SA 3.0',
    imageStatus: 'real',
    imageProvider: 'free_license',
    phone: '123',
    keywords: ['إسعاف', 'طوارئ', 'مصر'],
    priority: 32,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-fire',
    category: 'emergency',
    title: 'المطافي',
    description: 'مرجع الطوارئ الخاص بالحريق والدفاع المدني.',
    badge: 'سلامة',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_Fire_Truck.jpg',
    imageAlt: 'سيارة إطفاء في الإسكندرية',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Egyptian_Fire_Truck.jpg',
    imageCredit: 'صورة مصرية عامة من Wikimedia Commons',
    imageLicense: 'CC BY 3.0',
    imageStatus: 'real',
    imageProvider: 'free_license_egypt',
    phone: '180',
    keywords: ['حريق', 'مطافي', 'طوارئ', 'مصر'],
    priority: 33,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-police',
    category: 'emergency',
    title: 'الشرطة',
    description: 'خط الطوارئ العامة للشرطة المصرية.',
    badge: 'أمن',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_police_vehicle_in_Aswan.jpg',
    imageAlt: 'سيارة شرطة مصرية',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Egyptian_police_vehicle_in_Aswan.jpg',
    imageCredit: 'صورة مصرية عامة من Wikimedia Commons',
    imageLicense: 'CC BY 2.0',
    imageStatus: 'real',
    imageProvider: 'free_license_egypt',
    phone: '122',
    keywords: ['شرطة', 'أمن', 'طوارئ', 'مصر'],
    priority: 34,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-electricity',
    category: 'emergency',
    title: 'الكهرباء',
    description: 'بلاغات الأعطال والانقطاعات الكهربائية.',
    badge: 'خدمات عامة',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Suez_Canal_overhead_line_crossing.jpg',
    imageAlt: 'خطوط كهرباء في مصر',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Suez_Canal_overhead_line_crossing.jpg',
    imageCredit: 'صورة مصرية عامة من Wikimedia Commons',
    imageLicense: 'CC BY-SA 3.0',
    imageStatus: 'real',
    imageProvider: 'free_license_egypt',
    phone: '121',
    keywords: ['كهرباء', 'أعطال', 'خدمات عامة', 'طوارئ'],
    priority: 35,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'emergency-gas',
    category: 'emergency',
    title: 'الغاز',
    description: 'رقم الطوارئ الخاص بالغاز الطبيعي.',
    badge: 'خدمات عامة',
    sourceLabel: 'جهة رسمية',
    sourceType: 'official_government',
    sourceUrl: 'https://www.orange.eg/en/help/emergency-numbers',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/L.P.G_Station,_Belayim,_South_Sinai,_Egypt.jpg',
    imageAlt: 'محطة غاز في مصر',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:L.P.G_Station,_Belayim,_South_Sinai,_Egypt.jpg',
    imageCredit: 'صورة مصرية عامة من Wikimedia Commons',
    imageLicense: 'CC BY-SA 4.0',
    imageStatus: 'real',
    imageProvider: 'free_license_egypt',
    phone: '129',
    keywords: ['غاز', 'طوارئ', 'مصر'],
    priority: 36,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'awareness-dog-bite',
    category: 'awareness',
    title: 'إرشادات التعامل الآمن مع الكلاب الضالة',
    description: 'خطوات بسيطة لتجنب الخطر عند الاقتراب من الكلاب الضالة، وما يجب فعله سريعًا إذا حدثت عضة أو خدش.',
    badge: 'دليل إرشادي',
    sourceLabel: 'دليل إرشادي',
    sourceType: 'awareness',
    sourceUrl: 'https://www.pua.edu.eg/%D9%85%D8%B1%D8%B6-%D8%A7%D9%84%D8%B3%D8%B9%D8%A7%D8%B1/?lang=ar',
    imageUrl: '/community-images/dog-safe-guidance-ar.jpg',
    imageAlt: 'إرشادات التعامل مع الكلاب الضالة',
    imageCredit: 'صورة توعوية عربية',
    imageProvider: 'arabic_public_source',
    imageStatus: 'real',
    keywords: [
      'كلاب ضالة',
      'عضة كلب',
      'عقر كلب',
      'السعار',
      'تطعيم السعار',
      'إسعافات أولية',
      'حماية الأطفال',
      'الكلاب',
      'إرشادات مجتمعية',
    ],
    priority: 38,
    verificationStatus: 'verified_public_source',
    isPublic: true,
    guidanceSections: [
      {
        title: 'قبل الخطر: كيف تتعامل مع كلب ضال؟',
        items: [
          {
            title: 'حافظ على الهدوء',
            description: 'لا تصرخ، ولا تتحرك بعصبية، وحاول الابتعاد بهدوء بدون استفزاز الحيوان.',
          },
          {
            title: 'لا تركض',
            description: 'الجري قد يدفع الكلب للمطاردة. ابتعد بخطوات بطيئة وثابتة قدر الإمكان.',
          },
          {
            title: 'احمِ الأطفال',
            description: 'علّم الأطفال عدم الاقتراب من الكلاب الضالة أو محاولة لمسها أو اللعب معها.',
          },
          {
            title: 'استخدم حاجزًا عند الحاجة',
            description: 'يمكن استخدام حقيبة أو غرض تحمله كحاجز مؤقت بينك وبين الكلب دون ضربه أو استفزازه.',
          },
        ],
      },
      {
        title: 'بعد العضة أو الخدش: ماذا تفعل؟',
        items: [
          {
            title: 'أوقف النزيف',
            description: 'اضغط بلطف على مكان الإصابة باستخدام شاش أو قطعة قماش نظيفة.',
          },
          {
            title: 'اغسل الجرح جيدًا',
            description: 'اغسل مكان العضة أو الخدش بالماء الجاري والصابون لعدة دقائق.',
          },
          {
            title: 'ضع ضمادة خفيفة',
            description: 'غطِّ الجرح بضمادة نظيفة لحمايته مؤقتًا إلى حين الوصول للرعاية الصحية.',
          },
          {
            title: 'توجّه لأقرب جهة صحية فورًا',
            description: 'قد تحتاج إلى تقييم طبي، وتنظيف الجرح، وتطعيم السعار، وتطعيم التيتانوس حسب رأي الطبيب.',
          },
        ],
      },
    ],
    supportingImages: [
      {
        imageUrl: '/community-images/dog-bite-first-aid-ar.jpg',
        imageAlt: 'في 4 خطوات.. الصحة توضح طريقة التعامل مع عضة الكلب',
        imageCredit: 'صورة توعوية',
      },
    ],
  },
  {
    id: 'awareness-fire-prevention',
    category: 'awareness',
    title: 'الوقاية من الحرائق المنزلية',
    description: 'نصائح عربية مبسطة لتقليل خطر الحرائق داخل المنزل والحفاظ على سلامة الأسرة.',
    badge: 'سلامة منزلية',
    sourceLabel: 'دليل إرشادي',
    sourceType: 'awareness',
    sourceUrl: 'https://engfac.mans.edu.eg/news-blog/3837-safe-evacuation-test',
    imageProvider: 'dalilsubhi_fallback',
    imageStatus: 'pending_real_image',
    keywords: ['حرائق منزلية', 'سلامة منزلية', 'وقاية', 'إخلاء آمن'],
    priority: 39,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'awareness-fire-action',
    category: 'awareness',
    title: 'ماذا تفعل وقت حدوث حريق',
    description: 'خطوات عربية بسيطة للتصرف بهدوء عند حدوث حريق مع طلب المساعدة من الجهات المختصة.',
    badge: 'تصرف سريع',
    sourceLabel: 'دليل إرشادي',
    sourceType: 'awareness',
    sourceUrl: 'https://engfac.mans.edu.eg/news-blog/3837-safe-evacuation-test',
    imageProvider: 'dalilsubhi_fallback',
    imageStatus: 'pending_real_image',
    keywords: ['حريق', 'تصرف سريع', 'إخلاء', 'سلامة'],
    priority: 40,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'awareness-first-aid-basics',
    category: 'awareness',
    title: 'الإسعافات الأولية الأساسية',
    description: 'مبادئ عربية مبسطة للإسعافات الأولية لحين الوصول لمساعدة متخصصة.',
    badge: 'إسعافات',
    sourceLabel: 'دليل إرشادي',
    sourceType: 'awareness',
    sourceUrl: 'https://www.egyptianrc.org/ar',
    imageProvider: 'dalilsubhi_fallback',
    imageStatus: 'pending_real_image',
    keywords: ['إسعافات أولية', 'طوارئ', 'صحة', 'مساعدة أولية'],
    priority: 41,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'food-ibn-hamido',
    category: 'food',
    title: 'ابن حميدو للمأكولات البحرية',
    description: 'مطعم مأكولات بحرية في سيتي سنتر.',
    badge: 'بحري',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/yXubQNikgjYEAV1z9',
    mapUrl: 'https://share.google/yXubQNikgjYEAV1z9',
    imageUrl: '/community-images/food-ibn-hamido.png',
    imageAlt: 'شعار مطعم ابن حميدو',
    imageCredit: 'صورة مقدمة من العميل',
    imageLicense: 'client_provided',
    imageProvider: 'client_provided',
    imageStatus: 'real',
    address: 'العاشر من رمضان - المجاورة السادسة - أمام موقف الأردنية مباشرة / وفرع آخر بالعاشر',
    phoneNumbers: [
      { label: "فرع العاشر 1", number: "01050188020", type: "call", sourceUrl: "https://www.menuegypt.com/fosfor-ibn-hamido/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-1/sea-food" },
      { label: "فرع العاشر 1", number: "01050188021", type: "call", sourceUrl: "https://www.menuegypt.com/fosfor-ibn-hamido/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-1/sea-food" },
      { label: "فرع العاشر 2", number: "01016222256", type: "call", sourceUrl: "https://www.menuegypt.com/fosfor-ibn-hamido/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-1/sea-food" },
      { label: "فرع العاشر 2", number: "01016222257", type: "call", sourceUrl: "https://www.menuegypt.com/fosfor-ibn-hamido/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-1/sea-food" }
    ],
    keywords: ['مطعم', 'بحري', 'أسماك', 'العاشر من رمضان', 'ابن حميدو'],
    priority: 13,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'food-shami-syrian',
    category: 'food',
    title: 'مطعم الشامي السوري',
    description: 'مطعم سوري يقدم المشويات والوجبات السريعة في ميدان الأردنية.',
    badge: 'سوري',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/ode0NxmZjRYwcT0sS',
    mapUrl: 'https://share.google/ode0NxmZjRYwcT0sS',
    imageUrl: '/community-images/food-shami-syrian.png',
    imageAlt: 'وجبات مطعم الشامي السوري',
    imageCredit: 'صورة مقدمة من العميل',
    imageLicense: 'client_provided',
    imageProvider: 'client_provided',
    imageStatus: 'real',
    address: 'العاشر من رمضان - ميدان الأردنية - بجوار البنك الأهلي',
    facebookUrl: 'https://www.facebook.com/ShamiSwory/',
    phoneNumbers: [
      { label: "فرع العاشر", number: "01002001864", type: "call", sourceUrl: "https://www.menuegypt.com/el-shamy-el-sori/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "فرع العاشر", number: "01143572011", type: "call", sourceUrl: "https://www.menuegypt.com/el-shamy-el-sori/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "رقم عام", number: "01060081397", type: "call", sourceUrl: "https://www.menuegypt.com/el-shamy-el-sori/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "رقم عام", number: "01285666692", type: "call", sourceUrl: "https://www.menuegypt.com/el-shamy-el-sori/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "واتساب / رقم عام", number: "01557766865", type: "whatsapp", sourceUrl: "https://www.menuegypt.com/el-shamy-el-sori/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" }
    ],
    keywords: ['مطعم', 'سوري', 'مشويات', 'شاورما', 'العاشر من رمضان'],
    priority: 14,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'food-kesh-malak',
    category: 'food',
    title: 'مطعم كش ملك',
    description: 'مطعم شعبي يقدم الوجبات المتنوعة ضمن ترشيحات المنطقة.',
    badge: 'مطعم شعبي',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/mc1AW3nLJvUhxe4Yb',
    mapUrl: 'https://share.google/mc1AW3nLJvUhxe4Yb',
    imageUrl: '/community-images/food-kesh-malek.png',
    imageAlt: 'شعار مطعم كش ملك',
    imageCredit: 'صورة مقدمة من العميل',
    imageLicense: 'client_provided',
    imageProvider: 'client_provided',
    imageStatus: 'real',
    address: 'العاشر من رمضان - مول الرويء أمام البوابة الرئيسية لمركز شباب العاشر من رمضان / وفرع بنادي الصفوة',
    phoneNumbers: [
      { label: "رقم عام", number: "01200044129", type: "call", sourceUrl: "https://www.menuegypt.com/ar/%D9%83%D8%B4-%D9%85%D9%84%D9%83/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "رقم عام", number: "01094886661", type: "call", sourceUrl: "https://www.menuegypt.com/ar/%D9%83%D8%B4-%D9%85%D9%84%D9%83/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "رقم عام", number: "01279533505", type: "call", sourceUrl: "https://www.menuegypt.com/ar/%D9%83%D8%B4-%D9%85%D9%84%D9%83/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" },
      { label: "فرع العاشر", number: "01093143776", type: "call", sourceUrl: "https://www.menuegypt.com/ar/%D9%83%D8%B4-%D9%85%D9%84%D9%83/%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86" }
    ],
    keywords: ['مطعم', 'شعبي', 'العاشر من رمضان', 'كش ملك'],
    priority: 15,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
  {
    id: 'food-koshary-hend',
    category: 'food',
    title: 'كشري هند',
    description: 'كشري مشهور ضمن ترشيحات المنطقة للحصول على وجبة سريعة ومميزة.',
    badge: 'كشري',
    sourceLabel: 'موقع جغرافي',
    sourceType: 'google_maps',
    sourceUrl: 'https://share.google/FICusU0ToKq6J4b6m',
    mapUrl: 'https://share.google/FICusU0ToKq6J4b6m',
    imageUrl: '/community-images/food-koshary-hend.png',
    imageAlt: 'شعار كشري هند',
    imageCredit: 'صورة مقدمة من العميل',
    imageLicense: 'client_provided',
    imageProvider: 'client_provided',
    imageStatus: 'real',
    address: 'العاشر من رمضان - أمام موقف الأردنية خط 15 و16 بجوار كافيه أمازون',
    phoneNumbers: [
      { label: "دليفري", number: "01101488584", type: "call", sourceUrl: "https://www.menuegypt.com/ar/01101488584" },
      { label: "دليفري", number: "01017165571", type: "call", sourceUrl: "https://www.menuegypt.com/ar/01101488584" },
      { label: "دليفري", number: "01272106930", type: "call", sourceUrl: "https://www.menuegypt.com/ar/01101488584" },
      { label: "رقم Facebook إضافي", number: "01220984081", type: "call", sourceUrl: "https://www.facebook.com/p/%D9%83%D8%B4%D8%B1%D9%8A-%D9%87%D9%86%D8%AF-61562168975084/" },
      { label: "رقم Facebook إضافي", number: "01064575967", type: "call", sourceUrl: "https://www.facebook.com/p/%D9%83%D8%B4%D8%B1%D9%8A-%D9%87%D9%86%D8%AF-61562168975084/" }
    ],
    keywords: ['كشري', 'العاشر من رمضان', 'ترشيحات المنطقة'],
    priority: 16,
    verificationStatus: 'verified_public_source',
    isPublic: true,
  },
];

export const communityHubItems = rawHubItems.filter(item => item.isPublic !== false);
