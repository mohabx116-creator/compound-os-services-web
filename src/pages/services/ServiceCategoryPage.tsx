import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Clock,
  MapPin,
  Package,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { getItems } from '../../lib/api/services-service';
import type { ServiceItem } from '../../lib/api/types';
import logo from '../../assets/dalil-subhi-logo-192.jpg';

function ItemCard({ item }: { item: ServiceItem }) {
  const isFacility = item.kind === 'FACILITY';
  const isRealEstate = item.serviceType === 'REAL_ESTATE';
  const coverImage = item.images && item.images.length > 0 ? item.images[0] : null;
  const badgeLabel = isFacility ? 'مرفق' : isRealEstate ? 'خدمة عقارية' : 'خدمة فنية';

  return (
    <Link
      to={`/services/items/${item.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#ebdcb9]/30 bg-white/92 shadow-[0_14px_40px_rgba(7,22,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0fa37f]/20 hover:shadow-[0_20px_55px_rgba(7,22,20,0.08)]"
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b25e]/70 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0fa37f]/35 to-transparent opacity-60 blur-[1px]" />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#fffaf0] via-white to-[#eef8f4]">
        {coverImage ? (
          <img
            src={coverImage}
            alt={item.title}
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="640"
            height="360"
            onError={(event) => {
              (event.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#d6b25e]/15 bg-white/85 text-[#0fa37f] shadow-sm">
              {isFacility || isRealEstate ? <Building size={30} /> : <Wrench size={30} />}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
              isFacility
                ? 'border-[#0fa37f]/15 bg-[#eef8f4] text-[#0f766e]'
                : isRealEstate
                  ? 'border-[#d6b25e]/18 bg-[#fff7e6] text-[#8a6d22]'
                  : 'border-[#0fa37f]/15 bg-[#eef8f4] text-[#0f766e]'
            }`}
          >
            {badgeLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#ebdcb9]/40 bg-[#fcfaf5] px-3 py-1 text-[11px] font-semibold text-[#6b7280]">
            <Sparkles size={12} className="text-[#d6b25e]" />
            دليل السبحي
          </span>
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-black text-[#071614]">{item.title}</h3>
        {item.shortDescription && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#55605d]">{item.shortDescription}</p>
        )}

        <div className="space-y-2 text-xs text-[#64748b]">
          {isFacility && item.address && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#0fa37f]" />
              <span className="truncate">{item.address}</span>
            </div>
          )}
          {item.workingHours && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#0fa37f]" />
              <span>{item.workingHours}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0f766e] transition-colors group-hover:text-[#0a8a6b]">
            عرض التفاصيل
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValidCategory = slug === 'facilities' || slug === 'technical';
  const kind = slug === 'facilities' ? 'FACILITY' : 'TECHNICAL';
  const serviceType = slug === 'technical' ? 'TECHNICAL' : undefined;

  useEffect(() => {
    if (!isValidCategory) return;
    setLoading(true);
    setError(null);
    getItems({ kind, serviceType })
      .then((res) => {
        setItems(res.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load items by kind', err);
        setError('تعذر تحميل عناصر هذا القسم حالياً.');
        setLoading(false);
      });
  }, [slug, isValidCategory, kind, serviceType]);

  const categoryMeta = useMemo(() => {
    if (slug === 'facilities') {
      return {
        name: 'الخدمات العامة',
        description: 'استعرض المرافق والمنشآت المتوفرة داخل المجمع مع نفس روح العرض الخفيف والواضح.',
        icon: <Building size={18} className="text-[#0fa37f]" />,
      };
    }

    return {
      name: 'الخدمات الفنية',
      description: 'تصفح الخدمات الفنية المتاحة واتصل مباشرة أو افتح التفاصيل بكل سهولة.',
      icon: <Wrench size={18} className="text-[#0fa37f]" />,
    };
  }, [slug]);

  if (!isValidCategory) {
    return (
      <div className="min-h-[50vh] px-4 py-10 text-right" dir="rtl">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-8 text-center shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#0fa37f]/15 bg-[#eef8f4] text-[#0fa37f]">
            <Package size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#071614]">التصنيف غير موجود</h2>
            <p className="text-sm leading-relaxed text-[#55605d]">
              عذراً، لم يتم العثور على هذا التصنيف داخل مجمع الخدمات.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,163,127,0.16)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowRight size={18} />
            العودة للخدمات
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-[#0fa37f]/20 border-t-[#0fa37f] animate-spin" />
          <p className="text-sm font-semibold text-[#55605d]">جار التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] px-4 py-10 text-right" dir="rtl">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-8 text-center shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
          <p className="text-sm leading-relaxed text-[#55605d]">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              getItems({ kind, serviceType })
                .then((res) => {
                  setItems(res.items);
                  setLoading(false);
                })
                .catch(() => {
                  setError('تعذر تحميل عناصر هذا القسم حالياً.');
                  setLoading(false);
                });
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-6 py-3 text-xs font-bold text-white shadow-[0_12px_28px_rgba(15,163,127,0.16)] transition-all duration-300 hover:-translate-y-0.5"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const categoryDescription = categoryMeta.description;

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(214,178,94,0.1),transparent_35%),radial-gradient(circle_at_top_right,rgba(15,163,127,0.08),transparent_30%),linear-gradient(180deg,#fbf8f1_0%,#fffefb_100%)] text-right text-on-surface" dir="rtl">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden opacity-[0.06] mix-blend-multiply">
          <img src={logo} alt="" className="mt-10 w-[260px] sm:w-[420px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_42%)]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#ebdcb9]/60 bg-white/90 px-4 py-2 text-sm font-semibold text-[#5d4c18] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6b25e] hover:bg-white"
          >
            <ArrowRight size={16} className="rotate-180" />
            العودة للخدمات
          </Link>

          <div className="mt-8 rounded-[2rem] border border-[#d6b25e]/18 bg-white/86 p-6 shadow-[0_16px_45px_rgba(7,22,20,0.05)] sm:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0fa37f]/15 bg-[#eef8f4] px-4 py-2 text-xs font-bold text-[#0f766e]">
              {categoryMeta.icon}
              قسم الخدمات
            </div>
            <h1 className="text-3xl font-black leading-tight text-[#071614] sm:text-4xl">
              {categoryMeta.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#55605d]">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[#ebdcb9]/60 bg-white/92 p-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#0fa37f]/15 bg-[#eef8f4] text-[#0fa37f]">
              <Package size={32} />
            </div>
            <h2 className="text-xl font-black text-[#071614]">لا توجد خدمات داخل هذا التصنيف حالياً</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#55605d]">سيتم إضافة الخدمات قريباً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
