import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Wrench,
  Package,
  Loader2,
} from 'lucide-react';
import { getCategory } from '../../lib/api/services-service';
import type { ServiceItem } from '../../lib/api/types';

function ItemCard({ item }: { item: ServiceItem }) {
  return (
    <Link
      to={`/services/items/${item.slug}`}
      className="service-card overflow-hidden group"
    >
      {item.imageUrl ? (
        <div className="h-40 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
          <Wrench size={40} className="text-accent/30" />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-on-surface mb-2 line-clamp-1">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-on-surface-muted mb-3 line-clamp-2">{item.description}</p>
        )}

        <div className="flex flex-wrap gap-3 text-xs text-on-surface-muted">
          {item.locationText && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {item.locationText}
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

        {item.acceptsRequests && (
          <div className="mt-3 pt-3 border-t border-surface-border">
            <span className="text-xs text-accent font-medium flex items-center gap-1">
              يقبل الطلبات
              <ArrowLeft size={14} />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['services', 'category', slug],
    queryFn: () => getCategory(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  if (isError || !data) {
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
          >
            <ArrowRight size={18} />
            العودة للخدمات
          </Link>
        </div>
      </div>
    );
  }

  const { category, items } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-6">
        <Link to="/services" className="hover:text-accent transition-colors">الخدمات</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-on-surface mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-on-surface-muted text-lg max-w-2xl">{category.description}</p>
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
