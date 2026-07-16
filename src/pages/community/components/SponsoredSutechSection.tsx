import { useState, type ReactNode } from 'react';
import {
  BadgeCheck,
  Building2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Navigation,
  Maximize2,
  PhoneCall,
  School,
  Sparkles,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const sutechGallery: Array<{
  src: string;
  alt: string;
  caption: string;
  className?: string;
}> = [
  {
    src: '/community-images/sutech/sutech-logo.png',
    alt: 'شعار SUTech Elsewedy University',
    caption: 'الشعار الرسمي',
    className: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/community-images/sutech/sutech-campus-entrance.jpg',
    alt: 'صورة رسمية لواجهة الحرم الجامعي',
    caption: 'واجهة الحرم',
  },
  {
    src: '/community-images/sutech/sutech-lobby.jpg',
    alt: 'صورة رسمية لمشهد داخلي من SUTech',
    caption: 'الاستقبال والممرات',
  },
  {
    src: '/community-images/sutech/sutech-students.jpg',
    alt: 'صورة رسمية من حياة SUTech الجامعية',
    caption: 'حياة جامعية',
  },
  {
    src: '/community-images/sutech/sutech-building.jpg',
    alt: 'صورة رسمية لمبنى أو منشأة من SUTech',
    caption: 'المرافق والمباني',
  },
] as const;

const whyPoints = ['تعليم تطبيقي', 'ارتباط بالصناعة', 'تجربة جامعية حديثة', '60% عملي / 40% نظري'] as const;

const contactOptions = [
  {
    label: 'الخط الساخن',
    value: '15755',
    href: 'tel:15755',
    icon: PhoneCall,
    helper: 'اتصال مباشر',
  },
  {
    label: 'القبول والتقديم',
    value: 'admissions@sut.edu.eg',
    href: 'mailto:admissions@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
  {
    label: 'الاستفسارات العامة',
    value: 'info@sut.edu.eg',
    href: 'mailto:info@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
  {
    label: 'شؤون التسجيل',
    value: 'registrar@sut.edu.eg',
    href: 'mailto:registrar@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
  {
    label: 'الحياة الطلابية',
    value: 'studentlife@sut.edu.eg',
    href: 'mailto:studentlife@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
  {
    label: 'النقل والمواصلات',
    value: 'transportation@sut.edu.eg',
    href: 'mailto:transportation@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
  {
    label: 'الشؤون المالية',
    value: 'finance@sut.edu.eg',
    href: 'mailto:finance@sut.edu.eg',
    icon: Mail,
    helper: 'إرسال بريد',
  },
] as const;

const internationalPhones = ['+2 010 70 919 636', '+2 010 70 966 547', '+2 010 19 332 249', '+2 010 19 332 205'] as const;

const officialLinks = [
  {
    label: 'الموقع الرسمي',
    href: 'https://sut.edu.eg/',
    icon: Globe,
  },
  {
    label: 'فيسبوك',
    href: 'https://facebook.com/sutegypt',
    icon: Globe,
  },
  {
    label: 'إنستغرام',
    href: 'https://instagram.com/sut.edu.eg',
    icon: Globe,
  },
  {
    label: 'لينكدإن',
    href: 'https://linkedin.com/company/elsewedy-university-of-technology-polytechnic-of-egypt/',
    icon: Globe,
  },
] as const;

const googleMapsUrl = 'https://maps.google.com/maps?q=Elsewedy%20University%20of%20Technology%20-%20SUT&t=m&z=13&output=embed&iwloc=near';
const appleMapsUrl =
  'https://maps.apple.com/?q=Km%2051%2C%20Cairo%20Ismailia%20Road%2C%2010th%20of%20Ramadan%2C%20Sharqia%2C%20Egypt';

function ModalShell({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      dir="rtl"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">{title}</h3>
            <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
      </div>
    </div>
  );
}

function ActionRow({
  label,
  value,
  href,
  icon: Icon,
  helper,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  helper: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon size={18} />
      </span>
      <span className="min-w-0 flex-1 space-y-0.5 text-right">
        <span className="block text-sm font-bold text-slate-900">{label}</span>
        <span className="block break-all text-sm leading-6 text-slate-600" dir="ltr">
          {value}
        </span>
        <span className="block text-xs font-semibold text-emerald-700">{helper}</span>
      </span>
      <ExternalLink size={16} className="shrink-0 text-slate-400" />
    </a>
  );
}

export function SponsoredSutechSection() {
  const [contactOpen, setContactOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<(typeof sutechGallery)[number] | null>(null);

  return (
    <section
      className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(246,252,248,0.98)_45%,rgba(255,248,230,0.9)_100%)] shadow-[0_24px_60px_rgba(7,22,20,0.08)]"
      dir="rtl"
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              <Sparkles size={14} />
              شريك مميز
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
              رائد البوابة المجتمعية
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                <img
                  src="/community-images/sutech/sutech-logo.png"
                  alt="شعار SUTech Elsewedy University"
                  className="h-full w-full object-contain p-2"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">SUTech Elsewedy University</p>
                <h2 className="text-2xl font-black leading-snug text-slate-900 sm:text-3xl">جامعة السويدي للتكنولوجيا</h2>
                <p className="text-sm font-semibold text-slate-600">Polytechnic of Egypt</p>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-[1.05rem]">
              جامعة تطبيقية رائدة تجمع بين الدراسة العملية والارتباط بالصناعة، وتقدم تجربة تعليمية حديثة بمعايير
              دولية لإعداد الطلاب لسوق العمل بشكل مباشر وفعّال.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                  <BadgeCheck size={18} className="text-emerald-700" />
                  <span className="text-sm font-semibold text-slate-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">أول جامعة بوليتكنك في مصر</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">4-year B.Tech</span>
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">Km 51, Cairo-Ismailia Road</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,163,127,0.22)] transition-colors hover:bg-emerald-800"
            >
              <PhoneCall size={16} />
              التواصل
            </button>
            <button
              type="button"
              onClick={() => setDirectionsOpen(true)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              <Navigation size={16} />
              الاتجاهات
            </button>
          </div>

          <div className="rounded-[1.75rem] border border-emerald-100 bg-white/80 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <School size={18} className="mt-0.5 shrink-0 text-emerald-700" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">لماذا هذه الجامعة مهمة؟</p>
                <p className="text-sm leading-7 text-slate-600">
                  لأنها تربط التعليم بسوق العمل، وتمنح الطالب مساحة عملية حقيقية داخل بيئة جامعية حديثة ومصممة
                  لمخرجات مهنية واضحة.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-emerald-100 bg-white/55 p-5 sm:p-7 lg:border-t-0 lg:border-r lg:p-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {sutechGallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`عرض الصورة كاملة: ${image.caption}`}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-slate-100 shadow-sm ${image.className ?? ''} ${index === 0 ? 'min-h-[220px] sm:min-h-[320px]' : 'min-h-[150px] sm:min-h-[165px]'}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${index === 0 ? 'object-contain bg-white p-2 sm:p-3' : 'object-cover'}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-slate-700 shadow-sm transition-transform group-hover:scale-105">
                  <Maximize2 size={16} />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/18 to-transparent px-3 py-3 text-right">
                  <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">{image.caption}</span>
                </figcaption>
              </button>
            ))}
          </div>

          <div className="grid gap-3 rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-sm sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">معلومات موثقة</p>
              <p className="text-sm leading-6 text-slate-600">
                أول جامعة بوليتكنك في مصر، مع نموذج تعلم عملي بنسبة 60% مقابل 40% نظري.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                <MapPin size={16} />
                Km 51, Cairo-Ismailia Road
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
                <Building2 size={16} />
                Polytechnic of Egypt
              </div>
            </div>
          </div>
        </div>
      </div>

      {contactOpen && (
        <ModalShell title="التواصل" subtitle="خيارات الاتصال الرسمية مصنفة حسب الجهة." onClose={() => setContactOpen(false)}>
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {contactOptions.map((option) => (
                <ActionRow
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  href={option.href}
                  icon={option.icon}
                  helper={option.helper}
                />
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <PhoneCall size={16} className="text-emerald-700" />
                أرقام دولية
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {internationalPhones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
                  >
                    <span className="text-sm font-semibold text-slate-900">{phone}</span>
                    <ExternalLink size={16} className="text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Globe size={16} className="text-emerald-700" />
                روابط رسمية
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {officialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                          <Icon size={16} />
                        </span>
                        <span className="text-sm font-semibold text-slate-900">{link.label}</span>
                      </span>
                      <ExternalLink size={16} className="text-slate-400" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalShell>
      )}

      {directionsOpen && (
        <ModalShell
          title="الاتجاهات"
          subtitle="اختر الخريطة الأنسب لفتح موقع الجامعة في تبويب جديد."
          onClose={() => setDirectionsOpen(false)}
        >
          <div className="space-y-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <MapPin size={18} />
                </span>
                <span className="space-y-0.5 text-right">
                  <span className="block text-sm font-bold text-slate-900">Google Maps</span>
                  <span className="block text-xs text-slate-600">الخريطة الرسمية من صفحة التواصل</span>
                </span>
              </span>
              <ExternalLink size={16} className="text-slate-400" />
            </a>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <Navigation size={18} />
                </span>
                <span className="space-y-0.5 text-right">
                  <span className="block text-sm font-bold text-slate-900">Apple Maps</span>
                  <span className="block text-xs text-slate-600">يفتح في تبويب جديد</span>
                </span>
              </span>
              <ExternalLink size={16} className="text-slate-400" />
            </a>
          </div>
        </ModalShell>
      )}

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setActiveImage(null)}
          dir="rtl"
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`عرض كامل للصورة: ${activeImage.caption}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">عرض الصورة الكامل</h3>
                <p className="text-sm text-slate-600">{activeImage.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                aria-label="إغلاق"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[84vh] overflow-auto bg-slate-50 p-3 sm:p-6">
              <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="h-auto max-h-[78vh] w-full object-contain"
                  decoding="async"
                />
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">{activeImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
