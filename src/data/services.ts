export type ServiceKind = 'FACILITY' | 'TECHNICAL';

export interface StaticService {
  id: string;
  slug: string;
  kind: ServiceKind;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  address?: string;
  googleMapsUrl?: string;
  phone?: string;
  whatsapp?: string;
  workingHours?: string;
}

export const staticServices: StaticService[] = [
  // Facilities
  {
    id: 'mosque',
    slug: 'mosque',
    kind: 'FACILITY',
    title: 'المسجد',
    shortDescription: 'مسجد الكمبوند لإقامة الصلوات والعبادات.',
    description: 'مسجد الكمبوند الرئيسي، يتسع للمصلين وتقام فيه الصلوات الخمس وصلاة الجمعة والمناسبات الدينية المختلفة، مع تخصيص مصلى مريح للسيدات.',
    images: [],
    address: 'المنطقة الخدمية المركزية - كمبوند بلاك هورس',
    googleMapsUrl: 'https://maps.google.com/?q=Mosque',
    workingHours: 'مفتوح طوال اليوم (أوقات الصلوات)',
  },
  {
    id: 'gym',
    slug: 'gym',
    kind: 'FACILITY',
    title: 'الجيم الرياضي',
    shortDescription: 'مركز رياضي مجهز بالكامل للحفاظ على لياقتك البدنية.',
    description: 'صالة ألعاب رياضية متكاملة ومجهزة بأحدث الأجهزة الرياضية لتمارين الكارديو والقوة، مع وجود مدربين محترفين ومواعيد مخصصة للرجال وأخرى للسيدات.',
    images: [],
    address: 'المبنى الاجتماعي - الدور الأول',
    googleMapsUrl: 'https://maps.google.com/?q=Gym',
    workingHours: '06:00 ص - 11:00 م',
  },
  {
    id: 'library',
    slug: 'library',
    kind: 'FACILITY',
    title: 'المكتبة الثقافية',
    shortDescription: 'مساحة هادئة للقراءة والدراسة لجميع الأعمار.',
    description: 'مكتبة عامة توفر بيئة هادئة ومثالية للقراءة، المذاكرة، أو العمل عن بعد. تحتوي على تشكيلة متنوعة من الكتب والروايات ومصادر التعلم المختلفة لجميع الأعمار.',
    images: [],
    address: 'المبنى الاجتماعي - الدور الأرضي',
    googleMapsUrl: 'https://maps.google.com/?q=Library',
    workingHours: '09:00 ص - 09:00 م',
  },
  {
    id: 'market',
    slug: 'market',
    kind: 'FACILITY',
    title: 'السوبر ماركت',
    shortDescription: 'توفير كافة الاحتياجات والسلع الغذائية اليومية لسكان الكمبوند.',
    description: 'هايبر ماركت متكامل يوفر جميع المواد الغذائية، الخضروات، الفواكه، والمستلزمات المنزلية اليومية مع خدمة التوصيل المجاني لكافة وحدات الكمبوند.',
    images: [],
    address: 'منطقة المحلات التجارية - المحل رقم 3',
    googleMapsUrl: 'https://maps.google.com/?q=Supermarket',
    workingHours: 'على مدار 24 ساعة',
  },
  // Technical Services
  {
    id: 'plumber',
    slug: 'plumber',
    kind: 'TECHNICAL',
    title: 'سباك (خدمات السباكة)',
    shortDescription: 'حل جميع مشاكل السباكة والصيانة الصحية للوحدات.',
    description: 'فني سباكة محترف لتركيب وصيانة شبكات المياه والصرف الصحي، معالجة التسريبات، وتركيب الأدوات الصحية بكفاءة وسرعة عالية.',
    images: [],
    phone: '+201000000001',
    whatsapp: '+201000000001',
    workingHours: '08:00 ص - 10:00 م',
  },
  {
    id: 'electrician',
    slug: 'electrician',
    kind: 'TECHNICAL',
    title: 'كهربائي (أعمال الكهرباء)',
    shortDescription: 'صيانة وتأسيس الشبكات الكهربائية وإصلاح الأعطال.',
    description: 'فني كهرباء متخصص في تحديد وإصلاح الأعطال الكهربائية المنزلية، تركيب الإضاءة والمفاتيح، وصيانة لوحات التوزيع بأمان تام.',
    images: [],
    phone: '+201000000002',
    whatsapp: '+201000000002',
    workingHours: '08:00 ص - 10:00 م',
  },
  {
    id: 'ac-technician',
    slug: 'ac-technician',
    kind: 'TECHNICAL',
    title: 'فني تكييف (صيانة التكييفات)',
    shortDescription: 'تنظيف، شحن فريون، وصيانة جميع أنواع المكيفات.',
    description: 'صيانة وإصلاح التكييفات بجميع أنواعها (سبليت، مركزي)، تنظيف الفلاتر والوحدات الداخلية والخارجية، وشحن الفريون لضمان أفضل أداء.',
    images: [],
    phone: '+201000000003',
    whatsapp: '+201000000003',
    workingHours: '09:00 ص - 08:00 م',
  },
];
