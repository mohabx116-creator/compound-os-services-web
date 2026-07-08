import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Building,
  Clock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { getItem } from '../../lib/api/services-service';
import type { ServiceItem } from '../../lib/api/types';
import { getWhatsappHref } from '../../lib/whatsapp';
import logo from '../../assets/dalil-subhi-logo-192.jpg';

const actionButtonBase =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

function DetailBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#d6b25e]/20 bg-[#fffaf0] px-3 py-1 text-xs font-bold text-[#8a6d22]">
      <Sparkles size={12} className="ml-1 text-[#0fa37f]" />
      {label}
    </span>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/82 p-4 shadow-sm">
      <div className="mt-0.5 shrink-0 text-[#0fa37f]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#64748b]">{label}</p>
        <p className="mt-0.5 text-sm font-semibold leading-6 text-[#071614]">{value}</p>
      </div>
    </div>
  );
}

function ActionPanel({
  phone,
  whatsappHref,
  whatsapp,
  googleMapsUrl,
  address,
  workingHours,
}: {
  phone?: string | null;
  whatsappHref: string | null;
  whatsapp?: string | null;
  googleMapsUrl?: string | null;
  address?: string | null;
  workingHours?: string | null;
}) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-28">
      <div className="rounded-[2rem] border border-[#d6b25e]/18 bg-white/90 p-5 shadow-[0_16px_45px_rgba(7,22,20,0.05)] sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#071614] sm:text-xl">تواصل مع الخدمة</h2>
            <p className="mt-1 text-sm leading-6 text-[#55605d]">وسائل التواصل والموقع في مكان واضح ومباشر.</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#0fa37f]/12 bg-[#eef8f4]">
            <MessageCircle size={20} className="text-[#0fa37f]" />
          </div>
        </div>

        <div className="space-y-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className={`${actionButtonBase} w-full border border-[#0fa37f]/18 bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] text-white shadow-[0_12px_28px_rgba(15,163,127,0.16)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,163,127,0.22)]`}
            >
              <Phone size={18} />
              اتصال مباشر
            </a>
          )}

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionButtonBase} w-full border border-emerald-500/18 bg-emerald-50 text-emerald-700 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-emerald-100`}
            >
              <MessageCircle size={18} />
              واتساب
            </a>
          )}

          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionButtonBase} w-full border border-sky-500/18 bg-sky-50 text-sky-700 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-sky-100`}
            >
              <Navigation size={18} />
              الاتجاهات
            </a>
          )}
        </div>

        <div className="mt-5 space-y-3">
          {phone && <InfoRow icon={<Phone size={16} />} label="رقم الاتصال" value={phone} />}
          {whatsapp && <InfoRow icon={<MessageCircle size={16} />} label="رقم واتساب" value={whatsapp} />}
          {workingHours && <InfoRow icon={<Clock size={16} />} label="ساعات العمل" value={workingHours} />}
          {address && <InfoRow icon={<MapPin size={16} />} label="العنوان" value={address} />}
        </div>
      </div>
    </aside>
  );
}

function MobileCtaStrip({
  phone,
  whatsappHref,
  googleMapsUrl,
}: {
  phone?: string | null;
  whatsappHref: string | null;
  googleMapsUrl?: string | null;
}) {
  const actionCount = [phone, whatsappHref, googleMapsUrl].filter(Boolean).length;

  return (
    <section className="lg:hidden rounded-[1.35rem] border border-[#ebdcb9]/50 bg-white p-4 shadow-[0_10px_24px_rgba(7,22,20,0.05)] sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#0fa37f]/12 bg-[#eef8f4] text-[#0fa37f]">
          <MessageCircle size={18} />
        </div>
        <div>
          <h2 className="text-base font-black text-[#071614]">أزرار تواصل سريعة</h2>
          <p className="mt-1 text-xs leading-5 text-[#55605d]">
            {actionCount > 1 ? 'اتصال أو واتساب أو اتجاهات بشكل واضح وسريع.' : 'زر تواصل واضح وسريع.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {phone && (
          <a
            href={`tel:${phone}`}
            className={`${actionButtonBase} w-full justify-center border border-[#0fa37f]/18 bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] text-white shadow-[0_10px_24px_rgba(15,163,127,0.16)]`}
          >
            <Phone size={17} />
            اتصال
          </a>
        )}

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionButtonBase} w-full justify-center border border-emerald-500/18 bg-emerald-50 text-emerald-700`}
          >
            <MessageCircle size={17} />
            واتساب
          </a>
        )}

        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionButtonBase} w-full justify-center border border-sky-500/18 bg-sky-50 text-sky-700 ${actionCount >= 1 ? 'col-span-2' : ''}`}
          >
            <Navigation size={17} />
            اتجاهات
          </a>
        )}
      </div>
    </section>
  );
}

function MobileContactCard({
  phone,
  whatsapp,
  address,
  workingHours,
}: {
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  workingHours?: string | null;
}) {
  return (
    <section className="lg:hidden rounded-[1.35rem] border border-[#ebdcb9]/50 bg-white p-5 shadow-[0_10px_24px_rgba(7,22,20,0.05)]">
      <div className="mb-4">
        <h2 className="text-base font-black text-[#071614]">معلومات الاتصال</h2>
        <p className="mt-1 text-xs leading-5 text-[#55605d]">التفاصيل الأساسية بعد ما تشوف الخدمة نفسها.</p>
      </div>

      <div className="space-y-3">
        {phone && <InfoRow icon={<Phone size={16} />} label="رقم الاتصال" value={phone} />}
        {whatsapp && <InfoRow icon={<MessageCircle size={16} />} label="رقم واتساب" value={whatsapp} />}
        {workingHours && <InfoRow icon={<Clock size={16} />} label="ساعات العمل" value={workingHours} />}
        {address && <InfoRow icon={<MapPin size={16} />} label="العنوان" value={address} />}
      </div>
    </section>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getItem(slug)
      .then((res) => {
        setItem(res);
        setSelectedImageIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load item detail', err);
        setError('تعذر تحميل تفاصيل الخدمة حالياً.');
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    if (!item?.id) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [item?.id]);

  const meta = useMemo(() => {
    if (!item) return null;

    const isFacility = item.kind === 'FACILITY';
    const isRealEstate = item.serviceType === 'REAL_ESTATE';

    return {
      isFacility,
      badgeLabel: isFacility ? 'مرفق' : isRealEstate ? 'خدمة عقارية' : 'خدمة فنية',
      categoryHref: isFacility
        ? '/services/categories/facilities'
        : isRealEstate
          ? '/services#real-estate-services'
          : '/services/categories/technical',
      categoryLabel: isFacility
        ? 'الخدمات العامة'
        : isRealEstate
          ? 'خدمة العقارات'
          : 'الخدمات الفنية',
    };
  }, [item]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#0fa37f]/20 border-t-[#0fa37f]" />
          <p className="text-sm font-semibold text-[#55605d]">جار التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !item || !meta) {
    return (
      <div className="min-h-[50vh] px-4 py-10 text-right" dir="rtl">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-8 text-center shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#0fa37f]/15 bg-[#eef8f4] text-[#0fa37f]">
            <Wrench size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#071614]">عنصر غير متاح</h2>
            <p className="text-sm leading-relaxed text-[#55605d]">
              {error || 'تعذر العثور على هذه الخدمة أو قد تكون البيانات لم تُحمّل بعد.'}
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

  const gallery = item.images ?? [];
  const hasImages = gallery.length > 0;
  const whatsappHref = getWhatsappHref(item.whatsapp);
  const heroSummary = item.shortDescription
    ? item.shortDescription
    : item.description
      ? item.description
          .split('\n')
          .map((line) => line.trim())
          .find(Boolean) ?? ''
      : '';
  const compactHeroSummary =
    heroSummary.length > 90 ? `${heroSummary.slice(0, 90).trimEnd()}…` : heroSummary;
  const activeImage = gallery[selectedImageIndex] ?? gallery[0] ?? null;

  return (
    <div
      className="bg-[radial-gradient(circle_at_top_left,rgba(214,178,94,0.1),transparent_35%),radial-gradient(circle_at_top_right,rgba(15,163,127,0.08),transparent_30%),linear-gradient(180deg,#fbf8f1_0%,#fffefb_100%)] text-right text-on-surface"
      dir="rtl"
    >
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-0 hidden justify-center overflow-hidden opacity-[0.06] mix-blend-multiply lg:flex">
          <img src={logo} alt="" className="mt-10 w-[260px] sm:w-[420px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),transparent_42%)] max-md:hidden" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
            <Link to="/services" className="transition-colors hover:text-[#0f766e]">
              الخدمات
            </Link>
            <span>/</span>
            <Link to={meta.categoryHref} className="transition-colors hover:text-[#0f766e]">
              {meta.categoryLabel}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#071614]">{item.title}</span>
          </nav>

          <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1.18fr)]">
            <ActionPanel
              phone={item.phone}
              whatsappHref={whatsappHref}
              whatsapp={item.whatsapp}
              googleMapsUrl={item.googleMapsUrl}
              address={item.address}
              workingHours={item.workingHours}
            />

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-5 shadow-[0_16px_45px_rgba(7,22,20,0.05)] sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <DetailBadge label={meta.badgeLabel} />
                  <span className="inline-flex items-center rounded-full border border-[#0fa37f]/14 bg-[#eef8f4] px-3 py-1 text-xs font-bold text-[#0f766e]">
                    دليل السبحي
                  </span>
                </div>

                <h1 className="text-3xl font-black leading-tight text-[#071614] sm:text-4xl">
                  {item.title}
                </h1>

                {compactHeroSummary && (
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-[#55605d] sm:text-base sm:leading-8">
                    {compactHeroSummary}
                  </p>
                )}

                <div className="mt-6 hidden gap-3 md:grid sm:grid-cols-2">
                  {item.address && <InfoRow icon={<MapPin size={16} />} label="العنوان" value={item.address} />}
                  {item.workingHours && (
                    <InfoRow icon={<Clock size={16} />} label="ساعات العمل" value={item.workingHours} />
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[#ebdcb9]/50 bg-white shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
                <div className="relative">
                  {hasImages ? (
                    <div className="relative overflow-hidden">
                      <div className="relative flex h-[240px] max-h-[280px] w-full items-center justify-center overflow-hidden rounded-3xl border border-[#d6b25e]/15 bg-[#fbf8f1] sm:h-[280px] md:h-auto md:aspect-[16/9] lg:aspect-[16/8.5]">
                        <img
                          src={activeImage || gallery[0]}
                          alt={item.title}
                          className="max-h-full max-w-full h-auto w-auto object-contain object-center transition duration-300"
                          loading="eager"
                        />
                        {gallery.length > 1 && (
                          <>
                            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4">
                              <button
                                type="button"
                                aria-label="الصورة السابقة"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2c4aa] bg-white/85 text-[#132015] shadow-sm transition hover:bg-tertiary hover:text-primary"
                                onClick={() =>
                                  setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
                                }
                              >
                                <ChevronRight className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                aria-label="الصورة التالية"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2c4aa] bg-white/85 text-[#132015] shadow-sm transition hover:bg-tertiary hover:text-primary"
                                onClick={() => setSelectedImageIndex((prev) => (prev + 1) % gallery.length)}
                              >
                                <ChevronLeft className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 flex justify-end px-3 pb-3 sm:px-4 sm:pb-4">
                              <span className="rounded-full border border-[#d2c4aa] bg-white/85 px-3 py-1 text-xs font-bold text-[#132015] shadow-sm">
                                صورة {selectedImageIndex + 1} من {gallery.length}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {gallery.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto border-t border-[#ebdcb9]/40 bg-white p-2 scrollbar-thin scrollbar-thumb-primary/10 snap-x sm:gap-3 sm:p-3">
                          {gallery.map((imgUrl, idx) => (
                            <button
                              key={`${imgUrl}-${idx}`}
                              type="button"
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`relative aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-2xl border bg-surface-dim transition snap-start duration-300 sm:w-20 md:w-24 ${
                                selectedImageIndex === idx
                                  ? 'border-tertiary ring-2 ring-tertiary/30 scale-95 shadow-md'
                                  : 'border-[#ebdcb9]/70 hover:border-[#0fa37f]/40'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`صورة ${idx + 1}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] max-h-[320px] items-center justify-center bg-gradient-to-br from-[#fffaf0] via-white to-[#eef8f4] sm:aspect-[16/10] sm:max-h-none">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-[#0fa37f]/15 bg-white/90 text-[#0fa37f] shadow-sm">
                        {item.kind === 'FACILITY' ? <Building size={42} /> : <Wrench size={42} />}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <MobileCtaStrip phone={item.phone} whatsappHref={whatsappHref} googleMapsUrl={item.googleMapsUrl} />

              {item.description && (
                <div className="rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-6 shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
                  <h2 className="mb-4 text-lg font-black text-[#071614]">تفاصيل الخدمة</h2>
                  <p className="text-base leading-8 text-[#55605d] whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              )}

              <MobileContactCard
                phone={item.phone}
                whatsapp={item.whatsapp}
                address={item.address}
                workingHours={item.workingHours}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
