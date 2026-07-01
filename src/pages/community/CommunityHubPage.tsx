import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartPulse,
  MapPin,
  PhoneCall,
  Search,
  MessageCircle,
  ShieldAlert,
  ShoppingBasket,
  Siren,
  Sparkles,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import {
  communityCategoryDescriptions,
  communityCategoryFilters,
  communityCategoryLabels,
  communityCategoryOrder,
  communityHubItems,
  type CommunityCategory,
  type CommunityHubItem,
} from '../../data/community-hub';
import { ROUTES } from '../../lib/constants/routes';

const heroHighlights = [
  {
    title: 'الطوارئ والسلامة',
    description: 'مراجع سريعة وواضحة عند الحاجة الفعلية.',
    icon: <Siren size={20} />,
  },
  {
    title: 'الصحة بالقرب منك',
    description: 'خيارات طبية قريبة مع روابط ومؤشرات مرجعية.',
    icon: <HeartPulse size={20} />,
  },
  {
    title: 'اختيارات أهل المنطقة',
    description: 'بوابة مرتبة لروابط مفيدة وقابلة للتحديث.',
    icon: <Sparkles size={20} />,
  },
] as const;

const categoryIcons: Record<CommunityCategory, ReactNode> = {
  education: <GraduationCap size={20} />,
  health: <HeartPulse size={20} />,
  food: <UtensilsCrossed size={20} />,
  markets: <ShoppingBasket size={20} />,
  emergency: <ShieldAlert size={20} />,
  awareness: <BookOpen size={20} />,
};

const communityImageThumbs: Record<string, string> = {
  '/community-images/emergency-egypt.jpg': '/community-images/thumbs/emergency-egypt.jpg',
  '/community-images/food-ibn-hamido.png': '/community-images/thumbs/food-ibn-hamido.jpg',
  '/community-images/food-kesh-malek.png': '/community-images/thumbs/food-kesh-malek.jpg',
  '/community-images/food-koshary-hend.png': '/community-images/thumbs/food-koshary-hend.jpg',
  '/community-images/food-shami-syrian.png': '/community-images/thumbs/food-shami-syrian.jpg',
};

const medicalDisclaimer =
  'يعرض دليل السبحي المعلومات لتسهيل الوصول فقط، ولا يقدم استشارة طبية ولا يضمن مواعيد العمل أو توافر الخدمة. في الحالات الطارئة تواصل مع الإسعاف أو أقرب جهة طبية فورًا.';

function getCommunityImageUrl(imageUrl: string) {
  return communityImageThumbs[imageUrl] ?? imageUrl;
}

const categoryVisuals: Record<
  CommunityCategory,
  { outer: string; chip: string; border: string; glow: string }
> = {
  education: {
    outer: 'from-sky-500/20 via-sky-500/5 to-white',
    chip: 'bg-sky-500/10 text-sky-700',
    border: 'border-sky-200',
    glow: 'shadow-sky-100/60',
  },
  health: {
    outer: 'from-emerald-500/20 via-emerald-500/5 to-white',
    chip: 'bg-emerald-500/10 text-emerald-700',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-100/60',
  },
  food: {
    outer: 'from-orange-500/20 via-orange-500/5 to-white',
    chip: 'bg-orange-500/10 text-orange-700',
    border: 'border-orange-200',
    glow: 'shadow-orange-100/60',
  },
  markets: {
    outer: 'from-violet-500/20 via-violet-500/5 to-white',
    chip: 'bg-violet-500/10 text-violet-700',
    border: 'border-violet-200',
    glow: 'shadow-violet-100/60',
  },
  emergency: {
    outer: 'from-rose-500/20 via-rose-500/5 to-white',
    chip: 'bg-rose-500/10 text-rose-700',
    border: 'border-rose-200',
    glow: 'shadow-rose-100/60',
  },
  awareness: {
    outer: 'from-amber-500/20 via-amber-500/5 to-white',
    chip: 'bg-amber-500/10 text-amber-800',
    border: 'border-amber-200',
    glow: 'shadow-amber-100/60',
  },
};

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, '');
}

function getCleanImageLabel(item: CommunityHubItem) {
  if (!item.imageUrl) return 'صورة توضيحية';
  
  if (item.imageProvider === 'egypt_public_source' || item.imageProvider === 'free_license_egypt') {
    return 'صورة توضيحية مصرية';
  }
  if (item.imageProvider === 'arabic_public_source' || item.imageProvider === 'free_license_arabic') {
    return 'صورة توعوية عربية';
  }
  if (item.imageProvider === 'official_website' || item.imageProvider === 'official_page') {
    return 'صورة من المصدر الرسمي';
  }
  
  return 'صورة توضيحية';
}

function CommunityImage({ item, className }: { item: CommunityHubItem; className?: string }) {
  const [hasError, setHasError] = useState(false);
  const styles = categoryVisuals[item.category];

  if (!item.imageUrl || hasError) {
    return (
      <div
        className={`relative flex h-full min-h-[150px] w-full items-center justify-center bg-gradient-to-br ${styles.outer} ${className ?? ''}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_42%)]" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
          {categoryIcons[item.category]}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="rounded-full bg-white/15 px-2.5 py-1">صورة توضيحية</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-slate-100 ${className ?? ''}`}>
      <img
        src={getCommunityImageUrl(item.imageUrl)}
        alt={item.imageAlt ?? item.title}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width="640"
        height="360"
        onError={() => setHasError(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.14)_56%,rgba(2,6,23,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 space-y-1 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
              {communityCategoryLabels[item.category]}
            </span>
            <p className="line-clamp-2 text-sm font-bold leading-6">{item.title}</p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold">
              <span className="rounded-full bg-white/15 px-2.5 py-1">{getCleanImageLabel(item)}</span>
            </div>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
            {categoryIcons[item.category]}
          </div>
        </div>
      </div>
    </div>
  );
}

function getPhoneNumbers(item: CommunityHubItem) {
  if (item.phoneNumbers && item.phoneNumbers.length > 0) {
    return item.phoneNumbers;
  }
  if (item.phone) {
    return item.phone.split(/[\/\-،,و]/).map(p => p.trim()).filter(Boolean).map(number => ({
      label: 'رقم عام',
      number,
      type: 'call' as const,
    }));
  }
  return [];
}

function ActionModal({
  item,
  onClose,
}: {
  item: CommunityHubItem;
  onClose: () => void;
}) {
  const phones = getPhoneNumbers(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} dir="rtl">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{item.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{item.badge}</span>
              {typeof item.rating === 'number' && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">
                  التقييم {item.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-right">
          {phones.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-500">أرقام التواصل</h4>
              {phones.map((phone, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex-wrap">
                  <div className="flex flex-col text-right w-full sm:w-auto flex-1">
                    <span className="text-xs font-semibold text-slate-500 mb-0.5">{phone.label}</span>
                    <span className="font-bold text-slate-700" dir="ltr">{phone.number}</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                    <button onClick={() => navigator.clipboard.writeText(normalizePhone(phone.number))} className="flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-3 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                      نسخ الرقم
                    </button>
                    {phone.type === 'whatsapp' ? (
                      <a href={`https://wa.me/2${normalizePhone(phone.number)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">
                        <MessageCircle size={16} />
                        واتساب
                      </a>
                    ) : (
                      <a href={`tel:${normalizePhone(phone.number)}`} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors">
                        <PhoneCall size={16} />
                        اتصال
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {item.contactNote && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500">ملاحظات التواصل</h4>
              <p className="text-sm text-slate-700 leading-6 bg-amber-50 p-4 rounded-2xl border border-amber-100">{item.contactNote}</p>
            </div>
          )}

          {item.address && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-500">العنوان</h4>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-6">{item.address}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-500">روابط إضافية</h4>
            <div className="flex flex-col gap-2">
              {item.sourceUrl && (
                 <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                   <span className="text-sm font-semibold text-slate-700">المصدر الأساسي</span>
                   <ArrowRight size={16} className="rotate-180 text-slate-400" />
                 </a>
              )}
              {item.facebookUrl && (
                 <a href={item.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                   <span className="text-sm font-semibold text-slate-700">صفحة فيسبوك</span>
                   <ArrowRight size={16} className="rotate-180 text-slate-400" />
                 </a>
              )}
            </div>
          </div>

          {(item.imageSourceUrl || item.imageLicense || item.imageNotes || item.imageCredit) && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-500">معلومات الصورة</h4>
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 space-y-3 text-sm text-slate-600">
                {item.imageCredit && <p>المصدر: {item.imageCredit}</p>}
                {item.imageSourceUrl && (
                  <a href={item.imageSourceUrl} target="_blank" rel="noreferrer" className="text-sky-600 font-semibold hover:underline block">مصدر الصورة</a>
                )}
                {item.imageLicense && <p>الترخيص: {item.imageLicense}</p>}
                {item.imageNotes && <p>{item.imageNotes}</p>}
              </div>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-slate-500 leading-5 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              {item.category === 'health'
                ? medicalDisclaimer
                : 'دليل السبحي يعرض المعلومات لتسهيل الوصول ولا يدّعي إدارة أو ملكية الجهة.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidanceModal({
  item,
  onClose,
}: {
  item: CommunityHubItem;
  onClose: () => void;
}) {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} dir="rtl">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{item.title}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-6 space-y-8 overflow-y-auto text-right">
          {item.guidanceSections?.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-lg font-bold text-slate-800">{section.title}</h4>
              <div className="space-y-3">
                {section.items.map((info, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm mb-1">{info.title}</h5>
                      <p className="text-sm text-slate-600 leading-6">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {item.supportingImages?.map((img, idx) => {
            if (failedImages.has(idx)) return null;
            return (
              <div key={idx} className="space-y-2 mt-4">
                <img 
                  src={img.imageUrl} 
                  alt={img.imageAlt} 
                  className="w-full rounded-2xl border border-slate-100"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  onError={() => setFailedImages(prev => new Set(prev).add(idx))}
                />
                {img.imageCredit && (
                  <p className="text-xs text-slate-500 text-center">{img.imageCredit}</p>
                )}
              </div>
            );
          })}

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mt-6">
            <p className="text-sm text-amber-900 leading-6 font-semibold">
              هذه إرشادات توعوية عامة ولا تغني عن التقييم الطبي المباشر. أي عضة أو خدش من كلب ضال أو مجهول يجب التعامل معه بجدية ومراجعة أقرب منشأة صحية فورًا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ item, onShowMore, onShowGuidance }: { item: CommunityHubItem; onShowMore: (item: CommunityHubItem) => void; onShowGuidance?: (item: CommunityHubItem) => void }) {
  const styles = categoryVisuals[item.category];
  const phones = getPhoneNumbers(item);
  const primaryDirectionsUrl = item.directionsUrl ?? item.mapUrl ?? (item.category === 'health' ? item.sourceUrl : undefined);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition-colors ${styles.border}`}
    >
      <div className="relative">
        <CommunityImage item={item} className="h-[170px] md:h-[190px]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.chip}`}>
            {item.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 text-right" dir="rtl">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {communityCategoryLabels[item.category]}
          </p>
          <h3 className="text-lg font-black leading-snug text-slate-900">{item.title}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          {(item.category === 'health' || phones.length > 0 || (item.category === 'awareness' && item.sourceUrl) || item.guidanceSections || item.mapUrl || item.sourceUrl) && (
            <div className="flex flex-wrap gap-2">
              {item.category === 'health' && primaryDirectionsUrl && (
                <a
                  href={primaryDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-sky-700"
                >
                  <MapPin size={16} />
                  الاتجاهات
                </a>
              )}

              {item.guidanceSections && onShowGuidance ? (
                <button onClick={() => onShowGuidance(item)} className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-800">
                  عرض الإرشادات
                </button>
              ) : item.category === 'awareness' && item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-800">
                  عرض الإرشادات
                </a>
              ) : phones.length === 1 ? (
                <a href={phones[0].type === 'whatsapp' ? `https://wa.me/2${normalizePhone(phones[0].number)}` : `tel:${normalizePhone(phones[0].number)}`} className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-emerald-700">
                  {phones[0].type === 'whatsapp' ? <MessageCircle size={16} /> : <PhoneCall size={16} />}
                  {phones[0].type === 'whatsapp' ? 'واتساب' : 'اتصل الآن'}
                </a>
              ) : phones.length > 1 ? (
                <button onClick={() => onShowMore(item)} className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-emerald-700">
                  <PhoneCall size={16} />
                  اتصال سريع
                </button>
              ) : item.sourceUrl && !item.mapUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-800">
                  زيارة الصفحة
                </a>
              ) : null}

              {!item.category || item.category !== 'health' ? (
                (item.directionsUrl || item.mapUrl) && (
                  <a href={item.directionsUrl ?? item.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-sky-700">
                    <MapPin size={16} />
                    الاتجاهات
                  </a>
                )
              ) : null}
            </div>
          )}
          
          <button onClick={() => onShowMore(item)} className="w-full inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300">
            المزيد
          </button>
        </div>
      </div>
    </article>
  );
}

function EmergencyCard({ item, onShowMore }: { item: CommunityHubItem; onShowMore: (item: CommunityHubItem) => void }) {
  const styles = categoryVisuals.emergency;
  const phones = getPhoneNumbers(item);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-br ${styles.outer} shadow-sm ${styles.border}`}
    >
      <div className="relative">
        <CommunityImage item={item} className="h-[160px] md:h-[180px]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.chip}`}>
            {item.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 text-right" dir="rtl">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {communityCategoryLabels[item.category]}
          </p>
          <h3 className="text-lg font-black leading-snug text-slate-900">{item.title}</h3>
          <p className="text-sm leading-6 text-slate-600 line-clamp-2">{item.description}</p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          {phones.length === 1 ? (
             <a href={`tel:${normalizePhone(phones[0].number)}`} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-rose-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-rose-700">
               <PhoneCall size={16} />
               اتصل الآن
             </a>
          ) : phones.length > 1 ? (
             <button onClick={() => onShowMore(item)} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-rose-600 text-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-rose-700">
               <PhoneCall size={16} />
               اتصال سريع
             </button>
          ) : (
            <div className="hidden" />
          )}
          
          <button onClick={() => onShowMore(item)} className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-rose-200/50 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-900 transition-colors hover:bg-white">
            المزيد
          </button>
        </div>
      </div>
    </article>
  );
}

function HeroPreview({ item }: { item: CommunityHubItem }) {
  return (
    <div className="group flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-right transition-colors hover:bg-white/10">
      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/10 shrink-0">
        <CommunityImage item={item} className="h-full w-full" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-white/70">{communityCategoryLabels[item.category]}</p>
        <h3 className="line-clamp-1 text-sm font-bold text-white">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">{item.description}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <h2 className="text-xl font-black leading-snug text-slate-900 md:text-2xl">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{subtitle}</p>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        {icon}
      </div>
    </div>
  );
}

function CommunitySection({
  title,
  subtitle,
  items,
  icon,
  onShowMore,
  onShowGuidance,
}: {
  title: string;
  subtitle: string;
  items: CommunityHubItem[];
  icon: ReactNode;
  onShowMore: (item: CommunityHubItem) => void;
  onShowGuidance?: (item: CommunityHubItem) => void;
}) {
  return (
    <section className="space-y-4">
      <SectionHeader title={title} subtitle={subtitle} icon={icon} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item) => (
          <CommunityCard key={item.id} item={item} onShowMore={onShowMore} onShowGuidance={onShowGuidance} />
        ))}
      </div>
    </section>
  );
}

export function CommunityHubPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | CommunityCategory>('all');
  const [activeModalItem, setActiveModalItem] = useState<CommunityHubItem | null>(null);
  const [activeGuidanceItem, setActiveGuidanceItem] = useState<CommunityHubItem | null>(null);

  const visibleItems = useMemo(() => communityHubItems.filter((item) => item.isPublic !== false), []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return visibleItems.filter((item) => {
      const categoryLabel = communityCategoryLabels[item.category].toLowerCase();
      const searchBlob = [
        item.title,
        item.description,
        item.keywords.join(' '),
        item.contactNote ?? '',
        categoryLabel,
        item.sourceLabel,
      ]
        .join(' ')
        .toLowerCase();

      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery = !query || searchBlob.includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, search, visibleItems]);

  const featuredItems = useMemo(() => {
    const preferredItems = filteredItems
      .filter((item) => item.isFeatured)
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      .slice(0, 6);

    return preferredItems.length > 0 ? preferredItems : filteredItems.slice(0, 6);
  }, [filteredItems]);

  const emergencyItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.category === 'emergency')
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999)),
    [filteredItems],
  );

  const awarenessItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.category === 'awareness')
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999)),
    [filteredItems],
  );

  const categoryGroups = useMemo(() => {
    return communityCategoryOrder
      .filter((category) => category !== 'education' && category !== 'emergency' && category !== 'awareness')
      .map((category) => ({
        category,
        items: filteredItems
          .filter((item) => item.category === category)
          .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999)),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const educationItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.category === 'education')
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999)),
    [filteredItems],
  );

  const previewItems = useMemo(() => featuredItems.slice(0, 3), [featuredItems]);
  const hasResults = filteredItems.length > 0;

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_28%,#ffffff_100%)] text-right" dir="rtl">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.96),rgba(15,23,42,0.88)_48%,rgba(2,6,23,0.94)_100%)] px-4 py-14 text-white sm:px-6 md:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-emerald-400/20" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-400/15" />
          </div>

          <div className="relative mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to={ROUTES.SERVICES}
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                <ArrowRight size={16} className="rotate-180" />
                العودة إلى الخدمات
              </Link>

              <span className="inline-flex self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 sm:self-auto">
                يتم تحديث ومراجعة البيانات دورياً
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.92fr] lg:items-start">
              <div className="space-y-5">
                <div className="space-y-4">
                  <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">البوابة المجتمعية</h1>
                  <p className="max-w-3xl text-base leading-8 text-white/80 md:text-lg">
                    كل ما يحتاجه أهل المنطقة في مكان واحد: تعليم، صحة، طوارئ، وإرشادات مجتمعية موثوقة وجاهزة
                    للاستخدام.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                        {item.icon}
                      </div>
                      <h2 className="text-sm font-bold text-white">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-white/70">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm md:p-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <Search size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/70">ابحث بسرعة</p>
                        <p className="text-base font-bold text-white">عن جامعة أو مستشفى أو مطعم أو سوق</p>
                      </div>
                    </div>

                    <label className="block">
                      <span className="sr-only">البحث في البوابة المجتمعية</span>
                      <div className="relative">
                        <Search
                          size={18}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          placeholder="ابحث عن جامعة، مستشفى، مطعم، سوق، أو إرشاد..."
                          className="w-full rounded-2xl border border-white/10 bg-white/95 px-12 py-4 text-right text-sm font-medium text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.18)]"
                        />
                      </div>
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {communityCategoryFilters.map((filter) => {
                        const isActive = activeCategory === filter.key;

                        return (
                          <button
                            key={filter.key}
                            type="button"
                            onClick={() => setActiveCategory(filter.key)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                              isActive
                                ? 'bg-white text-slate-900'
                                : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                            }`}
                          >
                            {filter.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-7 text-white/75">
                      نجمع روابط ومعلومات مفيدة من مصادر عامة لتسهيل الوصول، مع مراجعة البيانات دوريًا.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white/70">لقطات سريعة</p>
                      <p className="text-lg font-bold text-white">بعض من أبرز الأقسام</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Sparkles size={20} />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {previewItems.map((item) => (
                      <HeroPreview key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 md:py-10">
          <div className="mb-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            محتوى موثوق وجاهز للاستخدام
          </div>

          <section className="space-y-5">
            <SectionHeader
              title="مختارات من البوابة المجتمعية"
              subtitle="روابط ومعلومات مجتمعية مفيدة تساعدك على الوصول السريع إلى أفضل الخيارات القريبة."
              icon={<Sparkles size={18} />}
            />

            {hasResults ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {featuredItems.map((item) => (
                  <CommunityCard key={item.id} item={item} onShowMore={setActiveModalItem} onShowGuidance={setActiveGuidanceItem} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                لم نجد نتيجة مطابقة لبحثك. جرّب كلمة مختلفة أو تصنيفًا آخر.
              </div>
            )}
          </section>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent md:my-12" />

          <div className="space-y-10">
            <section className="space-y-4">
              <SectionHeader
                title="البوابة التعليمية"
                subtitle="روابط مباشرة للصفحات الرسمية أو المراجع العامة الخاصة بالجامعات القريبة من المنطقة."
                icon={categoryIcons.education}
              />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {educationItems.map((item) => (
                  <CommunityCard key={item.id} item={item} onShowMore={setActiveModalItem} onShowGuidance={setActiveGuidanceItem} />
                ))}
              </div>
            </section>

            {categoryGroups.map((group) => (
              <CommunitySection
                key={group.category}
                title={communityCategoryLabels[group.category]}
                subtitle={communityCategoryDescriptions[group.category]}
                items={group.items}
                icon={categoryIcons[group.category]}
                onShowMore={setActiveModalItem}
                onShowGuidance={setActiveGuidanceItem}
              />
            ))}

            {emergencyItems.length > 0 && (
              <section className="space-y-4">
                <SectionHeader
                  title="أرقام وإرشادات سريعة وقت الحاجة"
                  subtitle="عرض بصري أوضح لمصادر الطوارئ والسلامة مع بقاء المعلومات قابلة للتحديث."
                  icon={<ShieldAlert size={18} />}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {emergencyItems.map((item) => (
                    <EmergencyCard key={item.id} item={item} onShowMore={setActiveModalItem} />
                  ))}
                </div>
              </section>
            )}

            {awarenessItems.length > 0 && (
              <section className="space-y-4">
                <SectionHeader
                  title={communityCategoryLabels.awareness}
                  subtitle="إرشادات عامة مختصرة وسهلة القراءة، مع تذكير واضح بأنها لا تغني عن المختصين وقت الطوارئ."
                  icon={categoryIcons.awareness}
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {awarenessItems.map((item) => (
                    <CommunityCard key={item.id} item={item} onShowMore={setActiveModalItem} onShowGuidance={setActiveGuidanceItem} />
                  ))}
                </div>
                <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
                  هذه إرشادات عامة ولا تغني عن التواصل مع الجهات المختصة وقت الطوارئ.
                </p>
              </section>
            )}
          </div>

          <footer className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
            دليل السبحي لا يدّعي ملكية أو إدارة الجهات الخارجية المعروضة، ويتم عرض الروابط لتسهيل الوصول فقط.
          </footer>
        </main>
      </div>

      {activeModalItem && (
        <ActionModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
      )}
      {activeGuidanceItem && (
        <GuidanceModal item={activeGuidanceItem} onClose={() => setActiveGuidanceItem(null)} />
      )}
    </>
  );
}

export default CommunityHubPage;
