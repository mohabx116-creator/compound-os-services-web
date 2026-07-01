export type HealthSourceType = 'google_maps' | 'facebook' | 'official_website' | 'manual_verified';

export interface HealthCommunityDraftEntry {
  id: string;
  category: 'health';
  title: string;
  description: string;
  badge: string;
  sourceType: HealthSourceType;
  sourceUrl: string;
  mapUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  rating?: string;
  gps?: {
    lat: number;
    lng: number;
  };
  googlePlaceId?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  imageLicense?: string;
  imageNotes?: string;
  imageStatus: 'real' | 'pending_real_image';
  imageProvider:
    | 'official_page'
    | 'official_website'
    | 'source_preview'
    | 'google_places'
    | 'public_general'
    | 'free_license'
    | 'dalilsubhi_fallback';
  contactNote?: string;
  keywords: string[];
  isFeatured?: boolean;
  priority: number;
  verificationStatus: 'verified_public_source' | 'needs_review' | 'pending_contact' | 'pending_real_image';
  lastCheckedAt: string;
  notes?: string;
}

type HealthDraftInput = Omit<
  HealthCommunityDraftEntry,
  'imageStatus' | 'imageProvider' | 'lastCheckedAt'
> & {
  imageStatus?: 'real' | 'pending_real_image';
  imageProvider?: HealthCommunityDraftEntry['imageProvider'];
  lastCheckedAt?: string;
  imageLicense?: string;
  imageNotes?: string;
};

const checkedAt = '2026-07-01T00:00:00+02:00';

function withFallbackImage(
  entry: HealthDraftInput,
): HealthCommunityDraftEntry {
  const hasImage = Boolean(entry.imageUrl);

  return {
    ...entry,
    imageStatus: entry.imageStatus ?? (hasImage ? 'real' : 'pending_real_image'),
    imageProvider: entry.imageProvider ?? (hasImage ? 'official_website' : 'dalilsubhi_fallback'),
    lastCheckedAt: entry.lastCheckedAt ?? checkedAt,
    imageCredit:
      entry.imageCredit ?? (hasImage ? 'الصورة من المصدر' : 'غلاف مؤقت من دليل السبحي'),
    contactNote:
      entry.contactNote ??
      (!entry.phone && !entry.whatsapp ? 'لم يتم تأكيد رقم التواصل بعد' : undefined),
    imageLicense: entry.imageLicense,
    imageNotes: entry.imageNotes,
  };
}

const healthDraftSeed = [
  {
    id: 'health-university-hospital',
    category: 'health',
    title: 'مستشفى العاشر من رمضان الجامعي',
    description: 'مستشفى جامعي حكومي يخدم مدينة العاشر من رمضان والمناطق المجاورة بمستوى رعاية عالي.',
    badge: 'مستشفى جامعي',
    sourceType: 'official_website',
    sourceUrl: 'https://www.presidency.eg/ar/%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9-%D8%A7%D9%84%D9%82%D9%88%D9%85%D9%8A%D8%A9/%D9%85%D8%B3%D8%AA%D8%B4%D9%81%D9%89-%D8%A7%D9%84%D8%B9%D8%A7%D8%B4%D8%B1-%D9%85%D9%86-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%8A-02-07-2022/',
    websiteUrl: 'https://www.zu.edu.eg/Album/Photos/5024',
    imageUrl: 'https://newsadmin.zu.edu.eg/UploadedFiles/Image/News/znu13082024033340P.jpg',
    imageAlt: 'مستشفى العاشر من رمضان الجامعي',
    imageSourceUrl: 'https://news.zu.edu.eg/ShowDetails/48873/1',
    imageCredit: 'الصورة من المصدر الرسمي',
    imageStatus: 'real',
    imageProvider: 'official_website',
    keywords: [
      'مستشفى العاشر من رمضان الجامعي',
      'جامعة الزقازيق',
      'رعاية صحية',
      'العاشر من رمضان',
      'مستشفى حكومي',
    ],
    isFeatured: true,
    priority: 1,
    verificationStatus: 'verified_public_source',
    notes: 'الصفحة الرئاسية والصفحة الرسمية لجامعة الزقازيق تؤكدان وجود المشروع والخدمة الطبية العامة.',
  },
  {
    id: 'health-comprehensive-clinic',
    category: 'health',
    title: 'عيادة العاشر من رمضان الشاملة',
    description: 'عيادة تأمين صحي شاملة في مركز المدينة بجوار نادي الرواد الرياضي الاجتماعي.',
    badge: 'عيادة تأمين',
    sourceType: 'manual_verified',
    sourceUrl: 'https://yellowpages.com.eg/en/profile/10th-of-ramadan-comprehensive-clinic/363846',
    mapUrl: 'https://yellowpages.com.eg/en/profile/10th-of-ramadan-comprehensive-clinic/363846',
    address: 'المجاورة الثانية - مركز المدينة، العاشر من رمضان، الشرقية بجوار نادي الرواد الرياضي الاجتماعي',
    phone: '0554365228',
    keywords: ['عيادة العاشر من رمضان الشاملة', 'تأمين صحي', 'العاشر من رمضان', 'رعاية أولية'],
    isFeatured: true,
    priority: 2,
    verificationStatus: 'verified_public_source',
    notes: 'العنوان والرقم منشوران في الدليل العام، مع ظهور الخدمة كعيادة تأمين صحي.',
  },
  {
    id: 'health-ibn-sina-hospital',
    category: 'health',
    title: 'مستشفى ابن سينا',
    description: 'مستشفى خاص متعدد التخصصات في أرض المستشفيات بالعاشر من رمضان.',
    badge: 'مستشفى خاص',
    sourceType: 'manual_verified',
    sourceUrl: 'https://yellowpages.com.eg/en/profile/ibn-sina-hospital/171417',
    mapUrl: 'https://yellowpages.com.eg/en/profile/ibn-sina-hospital/171417',
    facebookUrl: 'https://www.facebook.com/IbnSinaaa/about/',
    address: 'ش الامام مالك, المجاورة العاشرة, العاشر من رمضان, الشرقية امام مركز شباب العاشر من رمضان',
    phone: '+20554356533',
    imageUrl:
      'https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-1/656317865_957144520155663_7263680054279511218_n.jpg?stp=dst-jpg_tt6&cstp=mx817x812&ctp=s720x720&_nc_cat=106&ccb=1-7&_nc_sid=3ab345&_nc_ohc=hd9AJX0mjL0Q7kNvwH8tWnX&_nc_oc=Adoane6nA4L_t8MV8sz_uRrHPrILpglbS91cCfWPwqIpgkbngFM-9gnhUzusPr_TssM&_nc_zt=24&_nc_ht=scontent-lga3-3.xx&_nc_gid=k7a87Ix5cGkrI4QLVgErxg&_nc_ss=72100&oh=00_AQAJNSg7s1VhjBUEj6YfjTu3-880nOkMXhaKi6FWSgW0xQ&oe=6A4A02D4',
    imageAlt: 'مستشفى ابن سينا - العاشر من رمضان',
    imageSourceUrl: 'https://www.facebook.com/IbnSinaaa/about/',
    imageCredit: 'صورة معاينة من فيسبوك',
    imageStatus: 'real',
    imageProvider: 'source_preview',
    keywords: ['مستشفى ابن سينا', 'العاشر من رمضان', 'طوارئ', 'عيادات', 'رعاية صحية'],
    isFeatured: true,
    priority: 3,
    verificationStatus: 'verified_public_source',
    notes: 'العنوان من الدليل العام، والرقم من مصدر تعريفي عام/مهني، وصورة المعاينة من صفحة فيسبوك العامة.',
  },
  {
    id: 'health-el-ghandour-hospital',
    category: 'health',
    title: 'مستشفى الغندور',
    description: 'مستشفى ومركز طبي في الحي 24 خلف المعهد التكنولوجي العالي.',
    badge: 'مستشفى',
    sourceType: 'manual_verified',
    sourceUrl: 'https://yellowpages.com.eg/en/profile/el-ghandour-hospital/119265',
    mapUrl: 'https://yellowpages.com.eg/en/profile/el-ghandour-hospital/119265',
    address: 'Neighbourhood 24, 10th of Ramadan, El Sharkeya Behind Higher Technological Institute - HTI',
    phone: '01006660662 / 0554-483020 / 0554-482220 / 0554-483333 / 0554-483010',
    keywords: ['مستشفى الغندور', 'العاشر من رمضان', 'الحي 24', 'رعاية صحية'],
    isFeatured: true,
    priority: 4,
    verificationStatus: 'verified_public_source',
    notes: 'العنوان وأرقام التواصل ظاهرة في الدليل العام وقوائم التوجيه المتاحة علنًا.',
  },
  {
    id: 'health-specialized-center-eyes',
    category: 'health',
    title: 'المركز التخصصي للعيون',
    description: 'مركز عيون داخل الدوحة مول في الأردنية بالعاشر من رمضان.',
    badge: 'عيون',
    sourceType: 'manual_verified',
    sourceUrl: 'https://yellowpages.com.eg/en/profile/specialized-center-for-eyes/208478',
    mapUrl: 'https://yellowpages.com.eg/en/profile/specialized-center-for-eyes/208478',
    address: 'الأردنية، العاشر من رمضان، الشرقية داخل الدوحة مول',
    keywords: ['المركز التخصصي للعيون', 'عيون', 'الدوحة مول', 'العاشر من رمضان'],
    priority: 5,
    verificationStatus: 'needs_review',
    notes: 'لا يوجد رقم هاتف مؤكد في الصفحة العامة المستخرجة.',
  },
  {
    id: 'health-al-mokhtabar-laboratory',
    category: 'health',
    title: 'معمل المختبر - العاشر من رمضان',
    description: 'فرع معمل تحاليل في منطقة المستشفيات بين الحي الثالث والحي الرابع.',
    badge: 'معمل تحاليل',
    sourceType: 'manual_verified',
    sourceUrl: 'https://shefae.com/lab-details/Al-Mokhtabar-Laboratory.-10th-of-Ramadan-City',
    mapUrl: 'https://shefae.com/lab-details/Al-Mokhtabar-Laboratory.-10th-of-Ramadan-City',
    address: 'بين الحي الثالث والحي الرابع، منطقة المستشفيات، العاشر من رمضان',
    keywords: ['معمل المختبر', 'تحاليل', 'العاشر من رمضان', 'منطقة المستشفيات'],
    priority: 6,
    verificationStatus: 'needs_review',
    notes: 'الصفحة العامة تذكر الموقع والخدمة فقط دون رقم هاتف مؤكد في الجولة الحالية.',
  },
  {
    id: 'health-cbc-laboratory',
    category: 'health',
    title: 'CBC Laboratory - 10th of Ramadan',
    description: 'معمل تحاليل داخل Doha Mall فوق الفرع الرئيسي لأورانج بالدور الرابع.',
    badge: 'معمل تحاليل',
    sourceType: 'manual_verified',
    sourceUrl: 'https://www.shefae.com/index.php/en/lab-details/CBC-Laboratory-10th-of-Ramadan',
    mapUrl: 'https://www.shefae.com/index.php/en/lab-details/CBC-Laboratory-10th-of-Ramadan',
    address: 'Doha Mall, above Orange Main Branch - Fourth Floor, 10th of Ramadan City',
    phone: '01032565656',
    keywords: ['CBC Laboratory', 'تحاليل', 'Doha Mall', 'العاشر من رمضان'],
    priority: 7,
    verificationStatus: 'verified_public_source',
    notes: 'الرقم والعنوان ظهرا في صفحة Shefae العامة.',
  },
  {
    id: 'health-alfeki-pharmacy',
    category: 'health',
    title: 'Alfeki Pharmacy',
    description: 'صيدلية في District 12 داخل Ibni Beitak مقابل مباني الأندلس.',
    badge: 'صيدلية',
    sourceType: 'manual_verified',
    sourceUrl: 'https://shefae.com/en/pharmacy-details/Alfeki-Pharmacy-%E2%80%93-Sharqia',
    mapUrl: 'https://shefae.com/en/pharmacy-details/Alfeki-Pharmacy-%E2%80%93-Sharqia',
    address: 'Center G, District 12 “Ibni Beitak”, in front of Al-Andalus buildings, 10th of Ramadan City, Sharqia Governorate',
    phone: '01015624009',
    keywords: ['صيدلية', 'Alfeki Pharmacy', 'العاشر من رمضان', 'District 12'],
    priority: 8,
    verificationStatus: 'verified_public_source',
    notes: 'بيانات التواصل والعنوان ظاهرة بوضوح في صفحة الدواء/الخدمات الطبية.',
  },
  {
    id: 'health-mena-el-husseiny-pharmacy',
    category: 'health',
    title: 'صيدلية منى الحسيني',
    description: 'صيدلية داخل المجاورة 6 في شارع صيدناوي، العاشر من رمضان.',
    badge: 'صيدلية',
    sourceType: 'manual_verified',
    sourceUrl: 'https://shefae.com/pharmacy-details/Mena-El-Husseiny-Pharmacy-%E2%80%93-10th-of-Ramadan',
    mapUrl: 'https://shefae.com/pharmacy-details/Mena-El-Husseiny-Pharmacy-%E2%80%93-10th-of-Ramadan',
    address: '166 شارع صيدناوي، المجاورة 6، العاشر من رمضان، الشرقية',
    phone: '01060013834',
    keywords: ['صيدلية منى الحسيني', 'العاشر من رمضان', 'المجاورة 6', 'دواء'],
    priority: 9,
    verificationStatus: 'verified_public_source',
    notes: 'الصفحة العامة تعرض رقم التواصل والعنوان وساعات العمل.',
  },
  {
    id: 'health-dr-shimaa-atman-pharmacy',
    category: 'health',
    title: 'صيدلية د/ شيماء عتمان',
    description: 'صيدلية مفتوحة دائمًا في الأردنية - مركز المدينة - عمارات الدلتا.',
    badge: 'صيدلية',
    sourceType: 'manual_verified',
    sourceUrl: 'https://shefae.com/pharmacy-details/Dr-Shimaa-Atman-Pharmacy-%E2%80%93-10th-of-Ramadan',
    mapUrl: 'https://shefae.com/pharmacy-details/Dr-Shimaa-Atman-Pharmacy-%E2%80%93-10th-of-Ramadan',
    address: 'الأردنية - مركز المدينة - عمارات الدلتا - بجوار بريغو - العاشر من رمضان - الشرقية',
    phone: '01119416983',
    keywords: ['صيدلية', 'شيماء عتمان', 'العاشر من رمضان', 'الأردنية'],
    priority: 10,
    verificationStatus: 'verified_public_source',
    notes: 'الصفحة العامة تتضمن رقم التواصل والعنوان ووضعية العمل 24/7.',
  },
] satisfies HealthDraftInput[];

export const healthCommunityDraft = healthDraftSeed.map(withFallbackImage);
