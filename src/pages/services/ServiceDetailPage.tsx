import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
  Wrench,
  Building,
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
  mobile = false,
}: {
  phone?: string | null;
  whatsappHref: string | null;
  whatsapp?: string | null;
  googleMapsUrl?: string | null;
  address?: string | null;
  workingHours?: string | null;
  mobile?: boolean;
}) {
  return (
    <aside className={mobile ? 'lg:hidden' : 'hidden lg:block lg:sticky lg:top-28'}>
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
          {phone && (
            <InfoRow icon={<Phone size={16} />} label="رقم الاتصال" value={phone} />
          )}
          {whatsapp && (
            <InfoRow icon={<MessageCircle size={16} />} label="رقم الواتساب" value={whatsapp} />
          )}
          {workingHours && (
            <InfoRow icon={<Clock size={16} />} label="ساعات العمل" value={workingHours} />
          )}
          {address && (
            <InfoRow icon={<MapPin size={16} />} label="العنوان" value={address} />
          )}
        </div>
      </div>
    </aside>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getItem(slug)
      .then((res) => {
        setItem(res);
        setActiveImage(res.images?.[0] ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load item detail', err);
        setError('تعذر تحميل تفاصيل الخدمة حالياً.');
        setLoading(false);
      });
  }, [slug]);

  const meta = useMemo(() => {
    if (!item) return null;

    const isFacility = item.kind === 'FACILITY';
    const isRealEstate = item.serviceType === 'REAL_ESTATE';

    return {
      isFacility,
      isRealEstate,
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
        <div className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-[#0fa37f]/20 border-t-[#0fa37f] animate-spin" />
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

  const isFacility = meta.isFacility;
  const hasImages = item.images && item.images.length > 0;
  const whatsappHref = getWhatsappHref(item.whatsapp);

  return (
    <div
      className="bg-[radial-gradient(circle_at_top_left,rgba(214,178,94,0.1),transparent_35%),radial-gradient(circle_at_top_right,rgba(15,163,127,0.08),transparent_30%),linear-gradient(180deg,#fbf8f1_0%,#fffefb_100%)] text-right text-on-surface"
      dir="rtl"
    >
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden opacity-[0.06] mix-blend-multiply">
          <img src={logo} alt="" className="mt-10 w-[260px] sm:w-[420px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),transparent_42%)]" />

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
              <div className="rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-6 shadow-[0_16px_45px_rgba(7,22,20,0.05)] sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <DetailBadge label={meta.badgeLabel} />
                  <span className="inline-flex items-center rounded-full border border-[#0fa37f]/14 bg-[#eef8f4] px-3 py-1 text-xs font-bold text-[#0f766e]">
                    دليل السبحي
                  </span>
                </div>

                <h1 className="text-3xl font-black leading-tight text-[#071614] sm:text-4xl">
                  {item.title}
                </h1>

                {item.description && (
                  <p className="mt-4 max-w-4xl text-base leading-8 text-[#55605d] whitespace-pre-line">
                    {item.description}
                  </p>
                )}

                {(item.address || item.workingHours) && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {item.address && <InfoRow icon={<MapPin size={16} />} label="العنوان" value={item.address} />}
                    {item.workingHours && (
                      <InfoRow icon={<Clock size={16} />} label="ساعات العمل" value={item.workingHours} />
                    )}
                  </div>
                )}
              </div>

              <div className="lg:hidden">
                <ActionPanel
                  mobile
                  phone={item.phone}
                  whatsappHref={whatsappHref}
                  whatsapp={item.whatsapp}
                  googleMapsUrl={item.googleMapsUrl}
                  address={item.address}
                  workingHours={item.workingHours}
                />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[#ebdcb9]/50 bg-white shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
                <div className="relative">
                  {hasImages ? (
                    <div className="relative overflow-hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#fffaf0] via-white to-[#eef8f4] sm:aspect-[16/9]">
                        <img
                          src={activeImage || item.images[0]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 to-transparent" />
                      </div>

                      {item.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto border-t border-[#ebdcb9]/40 bg-[#fcfaf5] p-4">
                          {item.images.map((imgUrl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveImage(imgUrl)}
                              className={`h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 ${
                                activeImage === imgUrl
                                  ? 'border-[#0fa37f] ring-2 ring-[#0fa37f]/15'
                                  : 'border-[#ebdcb9]/70 hover:border-[#0fa37f]/40'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`صورة ${idx + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#fffaf0] via-white to-[#eef8f4] sm:aspect-[16/9]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-[#0fa37f]/15 bg-white/90 text-[#0fa37f] shadow-sm">
                        {isFacility ? <Building size={42} /> : <Wrench size={42} />}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {item.description && (
                <div className="rounded-[2rem] border border-[#ebdcb9]/50 bg-white/92 p-6 shadow-[0_16px_45px_rgba(7,22,20,0.05)]">
                  <h2 className="mb-4 text-lg font-black text-[#071614]">تفاصيل الخدمة</h2>
                  <p className="text-base leading-8 text-[#55605d] whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
