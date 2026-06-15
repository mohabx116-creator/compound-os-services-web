import { useEffect, useState } from 'react';
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
import logo from '../../assets/dalil-subhi-logo.jpg';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

// ── Service Item Card ───────────────────────────────────────────────────────

function ServiceCard({ item }: { item: ServiceItem }) {
  const isFacility = item.kind === 'FACILITY';
  const coverImage = item.images && item.images.length > 0 ? item.images[0] : null;

  return (
    <div className="service-card flex flex-col justify-between overflow-hidden group h-full">
      <div>
        {/* Image / Placeholder */}
        <div className="h-44 bg-gradient-to-br from-accent/5 to-accent/15 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          {coverImage ? (
            <img
              src={coverImage}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {isFacility ? <Building size={32} /> : <Wrench size={32} />}
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Badge */}
          <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-3 ${
            isFacility ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
          }`}>
            {isFacility ? 'مرفق' : 'خدمة فنية'}
          </span>

          <h3 className="text-lg font-bold text-on-surface mb-2 truncate">{item.title}</h3>
          {item.shortDescription && (
            <p className="text-sm text-on-surface-muted leading-relaxed mb-4 line-clamp-2">
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

      <div className="p-5 pt-0 mt-auto border-t border-surface-border/50">
        <div className="flex flex-wrap gap-2 mt-4">
          <Link
            to={`/services/items/${item.slug}`}
            className="flex-1 min-h-10 inline-flex items-center justify-center gap-1 rounded-lg bg-surface-muted hover:bg-surface-border text-on-surface font-semibold text-sm transition-colors"
          >
            عرض التفاصيل
          </Link>
          
          {!isFacility && item.phone && (
            <a
              href={`tel:${item.phone}`}
              className="flex-1 min-h-10 inline-flex items-center justify-center gap-1 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold text-sm transition-colors"
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
              className="flex-1 min-h-10 inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 font-semibold text-sm transition-colors"
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

// ── Main Page ───────────────────────────────────────────────────────────────

export function ServicesHomePage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'FACILITY' | 'TECHNICAL'>('ALL');
  const [data, setData] = useState<{
    facilities: ServiceItem[];
    technicalServices: ServiceItem[];
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-on-surface-muted text-sm font-semibold">جار تحميل الدليل...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in space-y-4">
          <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mx-auto">
            <Wrench size={32} />
          </div>
          <h2 className="text-xl font-bold text-on-surface">خطأ في التحميل</h2>
          <p className="text-on-surface-muted text-sm leading-relaxed">{error}</p>
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
            className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold text-sm transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const showFacilities = activeTab === 'ALL' || activeTab === 'FACILITY';
  const showTechnical = activeTab === 'ALL' || activeTab === 'TECHNICAL';

  const hasFacilities = data.facilities.length > 0;
  const hasTechnical = data.technicalServices.length > 0;

  return (
    <div className="animate-fade-in text-right" dir="rtl">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="hero-gradient text-white py-20 md:py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            مجمع الخدمات للمنطقة
          </h1>
        </div>
      </section>

      {/* ── Main Light Content Area ── */}
      <div className="relative bg-white pb-16">

        <div className="relative z-10">
          {/* ── Important Links Section ─────────────────────────────────── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            {/* Section wrapper: relative+overflow-hidden to contain the watermark */}
            <div className="relative overflow-hidden rounded-3xl py-8 px-2">
              {/* Watermark — behind cards only, inside this section */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
              >
                <img
                  src={logo}
                  alt=""
                  className="w-[320px] md:w-[460px] object-contain opacity-[0.11]"
                />
              </div>

              <div className="relative z-10 text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-on-surface">روابط مهمة</h2>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Card 1: WhatsApp */}
              <a
                href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-surface-container-low border border-surface-border rounded-2xl hover:border-emerald-500/50 hover:bg-surface-container-high transition-all group shadow-sm text-center gap-3 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface group-hover:text-emerald-600 transition-colors">جروب الواتساب</h3>
                </div>
              </a>

              {/* Card 2: Facebook */}
              <a
                href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-surface-container-low border border-surface-border rounded-2xl hover:border-blue-500/50 hover:bg-surface-container-high transition-all group shadow-sm text-center gap-3 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FacebookIcon />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface group-hover:text-blue-600 transition-colors">جروب الفيس بوك</h3>
                </div>
              </a>

              {/* Card 3: Dalil Subhi */}
              <a
                href="https://www.dalilsubhi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-surface-container-low border border-surface-border rounded-2xl hover:border-primary/50 hover:bg-surface-container-high transition-all group shadow-sm text-center gap-3 h-full"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-outline-variant shrink-0">
                  <img src={logo} alt="دليل السبحي" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">دليل السبحي</h3>
                  <p className="text-sm text-on-surface-muted mt-1">الصفحة الرئيسية</p>
                </div>
              </a>
              </div>
            </div>
          </section>

          {/* ── Main Content ─────────────────────────────────────────── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Tabs switcher */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-xl bg-surface-muted p-1 border border-surface-border">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'ALL'
                      ? 'bg-white text-on-surface shadow-sm'
                      : 'text-on-surface-muted hover:text-on-surface'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setActiveTab('FACILITY')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'FACILITY'
                      ? 'bg-white text-on-surface shadow-sm'
                      : 'text-on-surface-muted hover:text-on-surface'
                  }`}
                >
                  المرافق العامة
                </button>
                <button
                  onClick={() => setActiveTab('TECHNICAL')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'TECHNICAL'
                      ? 'bg-white text-on-surface shadow-sm'
                      : 'text-on-surface-muted hover:text-on-surface'
                  }`}
                >
                  الخدمات الفنية
                </button>
              </div>
            </div>

            {/* Directory Sections */}
            <div className="space-y-12">
              {showFacilities && (
                <div className="space-y-6">
                  {activeTab === 'ALL' && hasFacilities && (
                    <div className="flex items-center gap-2 border-b border-surface-border pb-2">
                      <Building className="text-accent" size={24} />
                      <h2 className="text-2xl font-bold text-on-surface">المرافق العامة</h2>
                    </div>
                  )}
                  {hasFacilities ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.facilities.map((service) => (
                        <ServiceCard key={service.id} item={service} />
                      ))}
                    </div>
                  ) : (
                    activeTab === 'FACILITY' && (
                      <div className="text-center py-12">
                        <p className="text-on-surface-muted text-sm">لا توجد مرافق مسجلة حالياً.</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {showTechnical && (
                <div className="space-y-6">
                  {activeTab === 'ALL' && hasTechnical && (
                    <div className="flex items-center gap-2 border-b border-surface-border pb-2">
                      <Wrench className="text-accent" size={24} />
                      <h2 className="text-2xl font-bold text-on-surface">الخدمات الفنية</h2>
                    </div>
                  )}
                  {hasTechnical ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.technicalServices.map((service) => (
                        <ServiceCard key={service.id} item={service} />
                      ))}
                    </div>
                  ) : (
                    activeTab === 'TECHNICAL' && (
                      <div className="text-center py-12">
                        <p className="text-on-surface-muted text-sm">لا توجد خدمات فنية مسجلة حالياً.</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === 'ALL' && !hasFacilities && !hasTechnical && (
                <div className="text-center py-20 bg-surface-muted rounded-2xl border border-surface-border">
                  <p className="text-on-surface-muted font-semibold">الدليل فارغ حالياً. سيتم إضافة الخدمات والمرافق قريباً.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
