import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Wrench,
  Building,
  Navigation,
} from 'lucide-react';
import { staticServices } from '../../data/services';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Fetch static item
  const item = staticServices.find((s) => s.slug === slug);

  if (!item) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            الخدمة غير موجودة
          </h2>
          <p className="text-on-surface-muted mb-6">
            عذراً، لم يتم العثور على هذه الخدمة.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
          >
            <ArrowRight size={18} />
            العودة للخدمات
          </Link>
        </div>
      </div>
    );
  }

  const isFacility = item.kind === 'FACILITY';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-6 flex-wrap">
        <Link to="/services" className="hover:text-accent transition-colors">الخدمات</Link>
        <span>/</span>
        <Link
          to={`/services/categories/${isFacility ? 'facilities' : 'technical'}`}
          className="hover:text-accent transition-colors"
        >
          {isFacility ? 'المرافق العامة' : 'الخدمات الفنية'}
        </Link>
        <span>/</span>
        <span className="text-on-surface font-medium">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Content (2/3) ────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="rounded-2xl border border-surface-border h-64 md:h-80 bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="w-20 h-20 rounded-full bg-white/50 text-accent flex items-center justify-center">
              {isFacility ? <Building size={48} /> : <Wrench size={48} />}
            </div>
          </div>

          {/* Title & Badge */}
          <div>
            <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-3 ${
              isFacility ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
            }`}>
              {isFacility ? 'مرفق عام' : 'خدمة فنية'}
            </span>
            <h1 className="text-3xl font-black text-on-surface">{item.title}</h1>
          </div>

          {/* Description */}
          {item.description && (
            <div className="prose prose-slate max-w-none">
              <p className="text-on-surface-muted leading-relaxed text-base whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* ── Sidebar (1/3) ─────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Info Card */}
          <div className="service-card p-6 space-y-5">
            <h2 className="font-bold text-on-surface text-lg border-b border-surface-border pb-3">
              تفاصيل الاتصال والموقع
            </h2>

            {isFacility && item.address && (
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">العنوان</p>
                  <p className="text-sm text-on-surface font-semibold">{item.address}</p>
                </div>
              </div>
            )}

            {item.workingHours && (
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">ساعات العمل</p>
                  <p className="text-sm text-on-surface font-semibold">{item.workingHours}</p>
                </div>
              </div>
            )}

            {!isFacility && item.phone && (
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">الهاتف</p>
                  <p className="text-sm text-on-surface font-semibold" dir="ltr">{item.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isFacility && item.googleMapsUrl && (
              <a
                href={item.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold transition-colors"
              >
                <Navigation size={18} />
                فتح على Google Maps
              </a>
            )}

            {!isFacility && item.phone && (
              <a
                href={`tel:${item.phone}`}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-bold transition-colors"
              >
                <Phone size={18} />
                اتصال مباشر
              </a>
            )}

            {!isFacility && item.whatsapp && (
              <a
                href={`https://wa.me/${item.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors"
              >
                <MessageCircle size={18} />
                واتساب
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
