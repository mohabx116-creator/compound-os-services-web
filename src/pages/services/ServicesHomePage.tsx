import { useEffect, useState } from 'react';
import type { ReactNode, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Wrench,
  Building,
} from 'lucide-react';
import { getServicesHome } from '../../lib/api/services-service';
import type { ServiceItem } from '../../lib/api/types';
import { ROUTES } from '../../lib/constants/routes';
import logo from '../../assets/dalil-subhi-logo.jpg';

const sectionCopy = {
  facilities: {
    title: 'المرافق العامة',
    empty: 'لا توجد مرافق مسجلة حالياً.',
    icon: <Building size={24} className="text-accent" />,
  },
  technical: {
    title: 'الخدمات الفنية',
    empty: 'لا توجد خدمات فنية مسجلة حالياً.',
    icon: <Wrench size={24} className="text-accent" />,
  },
  realEstate: {
    title: 'خدمة العقارات',
    empty: 'لا توجد خدمات عقارية مسجلة حالياً.',
    icon: <Building size={24} className="text-accent" />,
  },
} as const;

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

function ServiceCard({ item }: { item: ServiceItem }) {
  const isFacility = item.kind === 'FACILITY';
  const isRealEstate = item.serviceType === 'REAL_ESTATE';
  const coverImage = item.images && item.images.length > 0 ? item.images[0] : null;
  const badgeLabel = isFacility ? 'مرفق' : isRealEstate ? 'خدمة عقارية' : 'خدمة فنية';

  return (
    <div className="service-card flex h-full flex-col justify-between overflow-hidden group">
      <div>
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-accent/5 to-accent/15">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          {coverImage ? (
            <img
              src={coverImage}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
              {isFacility || isRealEstate ? <Building size={32} /> : <Wrench size={32} />}
            </div>
          )}
        </div>

        <div className="p-5">
          <span
            className={`mb-3 inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold ${
              isFacility
                ? 'bg-accent/10 text-accent'
                : isRealEstate
                  ? 'bg-secondary/10 text-secondary'
                  : 'bg-primary/10 text-primary'
            }`}
          >
            {badgeLabel}
          </span>

          <h3 className="mb-2 line-clamp-1 font-bold text-on-surface">{item.title}</h3>
          {item.shortDescription && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-on-surface-muted">
              {item.shortDescription}
            </p>
          )}

          <div className="space-y-2 text-xs text-on-surface-muted">
            {item.workingHours && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-accent" />
                <span>{item.workingHours}</span>
              </div>
            )}
            {isFacility && item.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                <span className="truncate">{item.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-surface-border/50 p-5 pt-0">
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/services/items/${item.slug}`}
            className="flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg bg-surface-muted text-sm font-semibold text-on-surface transition-colors hover:bg-surface-border"
          >
            عرض التفاصيل
          </Link>

          {!isFacility && item.phone && (
            <a
              href={`tel:${item.phone}`}
              className="flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg bg-accent/10 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              <Phone size={14} />
              اتصال
            </a>
          )}

          {!isFacility && item.whatsapp && (
            <a
              href={`https://wa.me/${item.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-10 flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/20"
            >
              <MessageCircle size={14} />
              واتساب
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="service-card flex h-full animate-pulse flex-col justify-between overflow-hidden">
      <div>
        <div className="h-44 bg-surface-muted" />
        <div className="space-y-4 p-5">
          <div className="inline-block h-5 w-20 rounded-md bg-surface-muted" />
          <div className="space-y-2">
            <div className="h-5 w-3/4 rounded bg-surface-muted" />
            <div className="h-4 w-full rounded bg-surface-muted" />
            <div className="h-4 w-5/6 rounded bg-surface-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-surface-muted" />
            <div className="h-4 w-2/3 rounded bg-surface-muted" />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-surface-border/50 p-5 pt-0">
        <div className="mt-4 flex gap-2">
          <div className="h-10 flex-1 rounded-lg bg-surface-muted" />
          <div className="h-10 flex-1 rounded-lg bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}

function ServicesSection({
  id,
  title,
  icon,
  items,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  items: ServiceItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="space-y-6">
      <div className="flex items-center gap-2 border-b border-surface-border pb-2">
        {icon}
        <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((service) => (
          <ServiceCard key={service.id} item={service} />
        ))}
      </div>

    </section>
  );
}

export function ServicesHomePage() {
  const [data, setData] = useState<{
    facilities: ServiceItem[];
    technicalServices: ServiceItem[];
    realEstateServices: ServiceItem[];
    featured: ServiceItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServicesHome()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load services', err);
        setError('تعذر تحميل الدليل حالياً. يرجى مراجعة الاتصال بالخادم.');
        setLoading(false);
      });
  }, []);

  const isInitialLoading = loading && !data;
  const facilities = data?.facilities ?? [];
  const technicalServices = data?.technicalServices ?? [];
  const realEstateServices = data?.realEstateServices ?? [];
  const hasAnyServices = facilities.length > 0 || technicalServices.length > 0 || realEstateServices.length > 0;

  if (error && !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="max-w-md space-y-4 text-center animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-error">
            <Wrench size={32} />
          </div>
          <h2 className="text-xl font-bold text-on-surface">خطأ في التحميل</h2>
          <p className="text-sm leading-relaxed text-on-surface-muted">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              getServicesHome()
                .then((res) => {
                  setData(res);
                  setLoading(false);
                })
                .catch(() => {
                  setError('تعذر تحميل الدليل حالياً. يرجى مراجعة الاتصال بالخادم.');
                  setLoading(false);
                });
            }}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent/90"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-right" dir="rtl">
      <section className="hero-gradient relative overflow-hidden px-4 py-20 text-center text-white md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            مجمع الخدمات للمنطقة
          </h1>
        </div>
      </section>

      <div className="relative bg-white pb-16">
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl px-2 py-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center"
            >
              <img
                src={logo}
                alt=""
                className="w-[320px] object-contain opacity-[0.11] md:w-[460px]"
              />
            </div>

            <div className="relative z-10 mx-auto mb-8 max-w-xl text-center">
              <h2 className="text-2xl font-black text-on-surface md:text-3xl">روابط مهمة</h2>
            </div>

            <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <a
                href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-surface-border bg-surface-container-low p-6 text-center shadow-sm transition-all hover:border-emerald-500/50 hover:bg-surface-container-high group"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface transition-colors group-hover:text-emerald-600">جروب الواتساب</h3>
                </div>
              </a>

              <a
                href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-surface-border bg-surface-container-low p-6 text-center shadow-sm transition-all hover:border-blue-500/50 hover:bg-surface-container-high group"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FacebookIcon />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface transition-colors group-hover:text-blue-600">جروب الفيس بوك</h3>
                </div>
              </a>

              <a
                href="https://www.dalilsubhi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-surface-border bg-surface-container-low p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-surface-container-high group"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-outline-variant bg-white">
                  <img src={logo} alt="دليل السبحي" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface transition-colors group-hover:text-primary">دليل السبحي</h3>
                  <p className="mt-1 text-sm text-on-surface-muted">الصفحة الرئيسية</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {isInitialLoading ? (
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-2">
                    <div className="h-6 w-6 rounded bg-surface-muted" />
                    <div className="h-7 w-44 rounded bg-surface-muted" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, skeletonIndex) => (
                      <ServiceCardSkeleton key={`${index}-${skeletonIndex}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              <div className="relative overflow-hidden rounded-[2rem] border border-sky-200/50 bg-gradient-to-br from-sky-50 to-indigo-50/30 p-8 sm:p-12 shadow-sm mb-8">
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 md:text-4xl">البوابة المجتمعية</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    جامعات، مطاعم، طوارئ، إرشادات وروابط مهمة في مكان واحد.
                  </p>
                  <Link to={ROUTES.COMMUNITY} className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-900 px-8 text-base font-bold text-white transition-all hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg shadow-slate-200">
                    استكشف البوابة المجتمعية
                  </Link>
                </div>
              </div>

              <ServicesSection
                id="facilities"
                title={sectionCopy.facilities.title}
                icon={sectionCopy.facilities.icon}
                items={facilities}
              />

              <ServicesSection
                id="technical-services"
                title={sectionCopy.technical.title}
                icon={sectionCopy.technical.icon}
                items={technicalServices}
              />

              <ServicesSection
                id="real-estate-services"
                title={sectionCopy.realEstate.title}
                icon={sectionCopy.realEstate.icon}
                items={realEstateServices}
              />

              {!hasAnyServices && (
                <div className="rounded-2xl border border-surface-border bg-surface-muted py-20 text-center">
                  <p className="font-semibold text-on-surface-muted">
                    لا توجد خدمات أو مرافق مسجلة حالياً.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
