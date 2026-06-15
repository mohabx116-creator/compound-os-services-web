import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ClipboardList,
  Wrench,
  Loader2,
} from 'lucide-react';
import { getItem } from '../../lib/api/services-service';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ['services', 'item', slug],
    queryFn: () => getItem(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  if (isError || !item) {
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-6 flex-wrap">
        <Link to="/services" className="hover:text-accent transition-colors">الخدمات</Link>
        {item.category && (
          <>
            <span>/</span>
            <Link
              to={`/services/categories/${item.category.slug}`}
              className="hover:text-accent transition-colors"
            >
              {item.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-on-surface font-medium">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Content (2/3) ────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          {item.imageUrl ? (
            <div className="rounded-2xl overflow-hidden border border-surface-border">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-surface-border h-64 md:h-80 bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
              <Wrench size={64} className="text-accent/20" />
            </div>
          )}

          {/* Title & Category */}
          <div>
            {item.category && (
              <Link
                to={`/services/categories/${item.category.slug}`}
                className="inline-block px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-medium mb-3 hover:bg-accent/20 transition-colors"
              >
                {item.category.name}
              </Link>
            )}
            <h1 className="text-3xl font-bold text-on-surface">{item.title}</h1>
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
            <h2 className="font-semibold text-on-surface text-lg">معلومات الخدمة</h2>

            {item.locationText && (
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">الموقع</p>
                  <p className="text-sm text-on-surface font-medium">{item.locationText}</p>
                </div>
              </div>
            )}

            {item.workingHours && (
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">ساعات العمل</p>
                  <p className="text-sm text-on-surface font-medium">{item.workingHours}</p>
                </div>
              </div>
            )}

            {item.phone && (
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-on-surface-muted mb-0.5">الهاتف</p>
                  <p className="text-sm text-on-surface font-medium" dir="ltr">{item.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {item.phone && (
              <a
                href={`tel:${item.phone}`}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-colors"
              >
                <Phone size={18} />
                اتصل الآن
              </a>
            )}

            {item.whatsapp && (
              <a
                href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
              >
                <MessageCircle size={18} />
                واتساب
              </a>
            )}

            {item.acceptsRequests && (
              <Link
                to={`/services/items/${item.slug}/request`}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
              >
                <ClipboardList size={18} />
                طلب الخدمة
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
