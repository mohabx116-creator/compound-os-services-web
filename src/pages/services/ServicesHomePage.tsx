import { memo, startTransition, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { getCachedServicesHome, getServicesHome } from '../../lib/api/services-service';
import type { ServiceItem, ServicesHomeResponse } from '../../lib/api/types';
import { getWhatsappHref } from '../../lib/whatsapp';
import { SERVICES_HOME_FALLBACK } from '../../data/services-home-fallback';
import logo from '../../assets/dalil-subhi-logo-192.jpg';

const sectionCopy = {
  facilities: {
    title: 'الخدمات العامة',
    empty: 'لا توجد مرافق مسجلة حالياً.',
    icon: <Building size={22} className="text-[#0fa37f]" />,
  },
  technical: {
    title: 'الخدمات الفنية',
    empty: 'لا توجد خدمات فنية مسجلة حالياً.',
    icon: <Wrench size={22} className="text-[#0fa37f]" />,
  },
  realEstate: {
    title: 'خدمة العقارات',
    empty: 'لا توجد خدمات عقارية مسجلة حالياً.',
    icon: <Building size={22} className="text-[#0fa37f]" />,
  },
} as const;

const SERVICES_ERROR_MESSAGE =
  'تعذر تحميل مجمع الخدمات الآن. يرجى إعادة المحاولة أو التحقق من الاتصال بالخادم.';

type ServicesHomeDataSource = 'cache' | 'fallback' | 'api';

interface ServicesHomeState {
  data: ServicesHomeResponse;
  error: string | null;
  source: ServicesHomeDataSource;
}

function getOptimizedServiceImageUrl(url: string) {
  if (!url.includes('/image/upload/')) {
    return url;
  }

  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_640,h_360/');
}

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none';
}

function createInitialServicesState() {
  const cached = getCachedServicesHome();
  const source: ServicesHomeDataSource = cached ? 'cache' : 'fallback';

  return {
    data: cached ?? SERVICES_HOME_FALLBACK,
    error: null as string | null,
    source,
  };
}


const actionButtonBase =
  'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

function ServiceCardView({ item }: { item: ServiceItem }) {
  const isFacility = item.kind === 'FACILITY';
  const isRealEstate = item.serviceType === 'REAL_ESTATE';
  const coverImage = item.images?.[0] ? getOptimizedServiceImageUrl(item.images[0]) : null;
  const whatsappHref = getWhatsappHref(item.whatsapp);
  const badgeLabel = isFacility ? 'مرفق' : isRealEstate ? 'خدمة عقارية' : 'خدمة فنية';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#ebdcb9]/30 bg-white/90 shadow-[0_16px_45px_rgba(7,22,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0fa37f]/20 hover:shadow-[0_22px_60px_rgba(7,22,20,0.08)]">
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b25e]/70 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0fa37f]/35 to-transparent opacity-60 blur-[1px]" />

      <div className="relative overflow-hidden rounded-t-[28px] bg-gradient-to-br from-[#fffaf0] via-white to-[#eef8f4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,178,94,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(15,163,127,0.08),transparent_30%)]" />
        {coverImage ? (
          <img
            src={coverImage}
            alt={item.title}
            className="relative z-10 h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="640"
            height="360"
            onError={hideBrokenImage}
          />
        ) : (
          <div className="relative z-10 flex h-44 w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#d6b25e]/15 bg-white/80 text-[#0fa37f] shadow-sm">
              {isFacility || isRealEstate ? <Building size={32} /> : <Wrench size={32} />}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
              isFacility
                ? 'border-[#0fa37f]/15 bg-[#0fa37f]/8 text-[#0f766e]'
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

        <h3 className="mb-2 line-clamp-1 text-lg font-black text-[#071614] sm:text-xl">{item.title}</h3>

        {item.shortDescription && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#55605d]">{item.shortDescription}</p>
        )}

        <div className="space-y-2 text-xs text-[#64748b]">
          {item.workingHours && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#0fa37f]" />
              <span>{item.workingHours}</span>
            </div>
          )}
          {isFacility && item.address && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#0fa37f]" />
              <span className="truncate">{item.address}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Link
              to={`/services/items/${item.slug}`}
              className={`${actionButtonBase} border border-[#ebdcb9]/50 bg-[#fcfaf5] text-[#5d4c18] shadow-sm hover:-translate-y-0.5 hover:border-[#d6b25e] hover:bg-white hover:text-[#0f3b35]`}
            >
              عرض التفاصيل
            </Link>

            {item.phone && (
              <a
                href={`tel:${item.phone}`}
                className={`${actionButtonBase} border border-[#0fa37f]/15 bg-[#eef8f4] text-[#0f766e] hover:-translate-y-0.5 hover:border-[#0fa37f]/30 hover:bg-[#e4f4ed]`}
              >
                <Phone size={14} />
                اتصال
              </a>
            )}

            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionButtonBase} border border-emerald-500/15 bg-emerald-50 text-emerald-700 hover:-translate-y-0.5 hover:border-emerald-500/25 hover:bg-emerald-100`}
              >
                <MessageCircle size={14} />
                واتساب
              </a>
            )}

            {item.googleMapsUrl && (
              <a
                href={item.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionButtonBase} border border-sky-500/15 bg-sky-50 text-sky-700 hover:-translate-y-0.5 hover:border-sky-500/25 hover:bg-sky-100`}
              >
                <Navigation size={14} />
                اتجاهات
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

const ServiceCard = memo(ServiceCardView);

function ServicesSectionView({
  id,
  title,
  icon,
  items,
  empty,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  items: ServiceItem[];
  empty: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="services-section space-y-4">
      <div className="flex items-center justify-between gap-4 border-b border-[#ebdcb9]/70 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#0fa37f]/12 bg-[#eef8f4] shadow-sm">
            {icon}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black leading-tight text-[#071614] sm:text-2xl">{title}</h2>
            <p className="text-sm text-[#6b7280]">{empty}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((service) => (
          <ServiceCard key={service.id} item={service} />
        ))}
      </div>
    </section>
  );
}

const ServicesSection = memo(ServicesSectionView);

export function ServicesHomePage() {
  const [state, setState] = useState<ServicesHomeState>(createInitialServicesState);
  const initialSource = useRef(state.source);
  const { data, error } = state;

  useEffect(() => {
    let isActive = true;

    getServicesHome({ bypassCache: initialSource.current === 'cache' })
      .then((res) => {
        if (!isActive) {
          return;
        }

        startTransition(() => {
          setState({ data: res, error: null, source: 'api' });
        });
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setState((current) => ({
          ...current,
          error: SERVICES_ERROR_MESSAGE,
        }));
      });

    return () => {
      isActive = false;
    };
  }, []);

  const facilities = data.facilities;
  const technicalServices = data.technicalServices;
  const realEstateServices = data.realEstateServices;
  const hasAnyServices =
    facilities.length > 0 || technicalServices.length > 0 || realEstateServices.length > 0;

  const handleRetry = useCallback(() => {
    setState((current) => ({ ...current, error: null }));
    getServicesHome({ bypassCache: true })
      .then((res) => {
        startTransition(() => {
          setState({ data: res, error: null, source: 'api' });
        });
      })
      .catch(() => {
        setState((current) => ({
          ...current,
          error: SERVICES_ERROR_MESSAGE,
        }));
      });
  }, []);

  if (error && !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="max-w-md space-y-4 text-center animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#0fa37f]/15 bg-[#eef8f4] text-[#0fa37f] shadow-sm">
            <Wrench size={32} />
          </div>
          <h2 className="text-xl font-black text-[#071614]">خطأ في التحميل</h2>
          <p className="text-sm leading-relaxed text-[#55605d]">{error || SERVICES_ERROR_MESSAGE}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,163,127,0.16)] transition-all duration-300 hover:-translate-y-0.5"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="text-right text-on-surface" dir="rtl">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(214,178,94,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(15,163,127,0.09),transparent_30%),linear-gradient(180deg,#fbf8f1_0%,#fffefb_100%)]">
        <section className="relative overflow-hidden px-4 py-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.065] mix-blend-multiply"
          >
            <img src={logo} alt="" className="w-[320px] rotate-[-4deg] blur-[1px] sm:w-[460px]" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_40%)]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex flex-col items-center justify-center pt-1 pb-3 sm:pt-4">
              <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-[#ebdcb9]/40 bg-white/80 shadow-[0_8px_30px_rgba(214,178,94,0.08)] backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02] sm:h-72 sm:w-72 md:h-96 md:w-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d6b25e]/5 via-transparent to-transparent opacity-50" />
                <img
                  src={logo}
                  alt="شعار دليل السبحي الرسمي"
                  className="relative z-10 h-[92%] w-[92%] object-contain mix-blend-multiply drop-shadow-sm"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
                    maskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
                  }}
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="mt-2 mb-6 inline-flex items-center gap-1.5 rounded-full border border-[#ebdcb9] bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#5d4c18] shadow-sm backdrop-blur-md">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#0fa37f]" />
              مجمع الخدمات للمنطقة
            </div>
          </div>
        </section>
      </div>

      <div className="relative bg-[#fffdf8] pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 flex justify-center">
            <h2 className="inline-flex items-center justify-center rounded-2xl border border-[#ebdcb9] bg-white/80 px-8 py-3 text-xl font-black text-[#071614] shadow-sm backdrop-blur-md sm:text-2xl">
              خدمات المنطقة
            </h2>
          </div>
          <div className="space-y-10">

            <ServicesSection
              id="facilities"
              title={sectionCopy.facilities.title}
              icon={sectionCopy.facilities.icon}
              items={facilities}
              empty={sectionCopy.facilities.empty}
            />

            <ServicesSection
              id="technical-services"
              title={sectionCopy.technical.title}
              icon={sectionCopy.technical.icon}
              items={technicalServices}
              empty={sectionCopy.technical.empty}
            />

            <ServicesSection
              id="real-estate-services"
              title={sectionCopy.realEstate.title}
              icon={sectionCopy.realEstate.icon}
              items={realEstateServices}
              empty={sectionCopy.realEstate.empty}
            />

            {!hasAnyServices && (
              <div className="rounded-[2rem] border border-[#ebdcb9]/60 bg-white/90 py-20 text-center shadow-sm">
                <p className="font-semibold text-[#55605d]">لا توجد خدمات أو مرافق مسجلة حالياً.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
