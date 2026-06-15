import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Layers,
  Wrench,
  ClipboardList,
  CheckCircle,
  Package,
} from 'lucide-react';
import { getServicesHome } from '../../lib/api/services-service';
import type { ServiceCategory, ServiceItem } from '../../lib/api/types';

// ── Skeleton Loader ─────────────────────────────────────────────────────────

function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-12 max-w-7xl mx-auto px-4 py-12">
      {/* Hero skeleton */}
      <div className="space-y-4">
        <div className="skeleton h-8 w-2/3 mx-auto" />
        <div className="skeleton h-5 w-1/2 mx-auto" />
      </div>
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-20 px-4 animate-fade-in">
      <div className="inline-flex p-5 rounded-full bg-surface-muted mb-6">
        <Package size={56} className="text-on-surface-muted" />
      </div>
      <h2 className="text-2xl font-bold text-on-surface mb-3">
        لم تتم إضافة خدمات بعد
      </h2>
      <p className="text-on-surface-muted max-w-md mx-auto">
        سيتم عرض المرافق والخدمات هنا قريباً
      </p>
    </div>
  );
}

// ── Category Card ───────────────────────────────────────────────────────────

function CategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      to={`/services/categories/${category.slug}`}
      className="service-card p-6 flex flex-col items-center text-center group"
    >
      <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
        <Layers size={28} />
      </div>
      <h3 className="font-semibold text-on-surface mb-1">{category.name}</h3>
      {category.description && (
        <p className="text-sm text-on-surface-muted line-clamp-2">{category.description}</p>
      )}
      <span className="mt-3 text-xs text-accent font-medium flex items-center gap-1">
        عرض الخدمات
        <ArrowLeft size={14} />
      </span>
    </Link>
  );
}

// ── Service Item Card ───────────────────────────────────────────────────────

function ServiceItemCard({ item }: { item: ServiceItem }) {
  return (
    <Link
      to={`/services/items/${item.slug}`}
      className="service-card overflow-hidden group"
    >
      {/* Image */}
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
        {/* Category badge */}
        {item.category && (
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium mb-2">
            {item.category.name}
          </span>
        )}

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

// ── How It Works ────────────────────────────────────────────────────────────

const steps = [
  {
    num: '١',
    title: 'تصفح الخدمات',
    desc: 'استعرض جميع المرافق والخدمات المتاحة في الكمبوند.',
    icon: Search,
  },
  {
    num: '٢',
    title: 'اختر الخدمة',
    desc: 'اطلع على تفاصيل الخدمة وطرق التواصل المتاحة.',
    icon: ClipboardList,
  },
  {
    num: '٣',
    title: 'أرسل طلبك',
    desc: 'قدم طلب الخدمة وسيتم التواصل معك في أقرب وقت.',
    icon: CheckCircle,
  },
];

// ── Main Page ───────────────────────────────────────────────────────────────

export function ServicesHomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['services', 'home'],
    queryFn: getServicesHome,
  });

  if (isLoading) return <HomeSkeleton />;

  if (isError) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-red-600 font-semibold mb-2">حدث خطأ في تحميل البيانات</p>
        <p className="text-on-surface-muted text-sm">يرجى المحاولة مرة أخرى لاحقاً.</p>
      </div>
    );
  }

  const isEmpty =
    !data ||
    (data.categories.length === 0 &&
      data.featuredItems.length === 0 &&
      data.latestItems.length === 0);

  return (
    <div>
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="hero-gradient text-white py-20 md:py-28 px-4">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            كل خدمات ومرافق الكمبوند في مكان واحد
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            تصفح المرافق المتاحة واطلب الخدمات الفنية بسهولة.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold text-lg transition-colors"
          >
            تصفح الخدمات
            <ArrowLeft size={20} />
          </Link>
        </div>
      </section>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* ── Featured Services ───────────────────────────────────── */}
          {data.featuredItems.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-on-surface">خدمات مميزة</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.featuredItems.map((item) => (
                  <ServiceItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* ── Categories ──────────────────────────────────────────── */}
          {data.categories.length > 0 && (
            <section className="bg-surface-dim py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-on-surface mb-8 text-center">
                  تصنيفات الخدمات
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Latest Services ─────────────────────────────────────── */}
          {data.latestItems.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-2xl font-bold text-on-surface mb-8">أحدث الخدمات</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.latestItems.map((item) => (
                  <ServiceItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">كيف تطلب خدمة؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="step-badge mx-auto mb-4">{step.num}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
