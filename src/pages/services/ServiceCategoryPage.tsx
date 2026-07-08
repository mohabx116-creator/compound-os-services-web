import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Wrench,
  Package,
  Building,
} from 'lucide-react';
import { getItems } from '../../lib/api/services-service';
import type { ServiceItem } from '../../lib/api/types';

function ItemCard({ item }: { item: ServiceItem }) {
  const isFacility = item.kind === 'FACILITY';
  const isRealEstate = item.serviceType === 'REAL_ESTATE';
  const coverImage = item.images && item.images.length > 0 ? item.images[0] : null;
  const badgeLabel = isFacility ? 'مرفق' : isRealEstate ? 'خدمة عقارية' : 'خدمة فنية';

  return (
    <Link
      to={`/services/items/${item.slug}`}
      className="service-card overflow-hidden group flex flex-col justify-between h-full"
    >
      <div>
        <div className="h-40 bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center relative">
          {coverImage ? (
            <img src={coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {isFacility ? <Building size={24} /> : <Wrench size={24} />}
            </div>
          )}
        </div>

        <div className="p-5">
          <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-3 ${
            isFacility ? 'bg-accent/10 text-accent' : isRealEstate ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
          }`}>
            {badgeLabel}
          </span>
          <h3 className="font-bold text-on-surface mb-2 line-clamp-1">{item.title}</h3>
          {item.shortDescription && <p className="text-sm text-on-surface-muted mb-3 line-clamp-2">{item.shortDescription}</p>}

          <div className="flex flex-wrap gap-3 text-xs text-on-surface-muted">
            {isFacility && item.address && (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {item.address}
              </span>
            )}
            {item.workingHours && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {item.workingHours}
              </span>
            )}
            {item.phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} /> {item.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto border-t border-surface-border/50">
        <span className="mt-3 text-xs text-accent font-medium flex items-center gap-1">
          عرض التفاصيل
          <ArrowLeft size={14} />
        </span>
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

  if (!isValidCategory) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            التصنيف غير موجود
          </h2>
          <p className="text-on-surface-muted mb-6">
            عذراً، لم يتم العثور على هذا التصنيف.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-colors"
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-on-surface-muted text-sm font-semibold">جار التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-on-surface-muted">{error}</p>
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
            className="px-6 py-2 bg-accent text-white font-bold rounded-xl text-xs"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Determine category name and filter criteria
  let categoryName = slug === 'facilities' ? 'الخدمات العامة' : 'الخدمات الفنية';
  let categoryDescription = slug === 'facilities'
    ? 'استعرض جميع المرافق والمنشآت المتوفرة داخل الكمبوند للخدمة العامة.'
    : 'تواصل مباشرة مع فنيي الصيانة والأعمال المنزلية المتخصصين بالكمبوند.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-6">
        <Link to="/services" className="hover:text-accent transition-colors">الخدمات</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">{categoryName}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-on-surface mb-3">{categoryName}</h1>
        {categoryDescription && (
          <p className="text-on-surface-muted text-lg max-w-2xl">{categoryDescription}</p>
        )}
      </div>

      {/* Items Grid or Empty */}
      {items.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-flex p-5 rounded-full bg-surface-muted mb-6">
            <Package size={48} className="text-on-surface-muted" />
          </div>
          <h2 className="text-xl font-bold text-on-surface mb-2">
            لا توجد خدمات داخل هذا التصنيف حالياً
          </h2>
          <p className="text-on-surface-muted">
            سيتم إضافة الخدمات قريباً.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
