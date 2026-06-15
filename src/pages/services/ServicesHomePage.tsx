import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Wrench,
  Search,
  BookOpen,
  CheckCircle,
  Building,
} from 'lucide-react';
import { staticServices, type StaticService } from '../../data/services';

// ── Service Item Card ───────────────────────────────────────────────────────

function ServiceCard({ item }: { item: StaticService }) {
  const isFacility = item.kind === 'FACILITY';

  return (
    <div className="service-card flex flex-col justify-between overflow-hidden group h-full">
      <div>
        {/* Image / Placeholder */}
        <div className="h-44 bg-gradient-to-br from-accent/5 to-accent/15 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {isFacility ? <Building size={32} /> : <Wrench size={32} />}
          </div>
        </div>

        <div className="p-5">
          {/* Badge */}
          <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-3 ${
            isFacility ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
          }`}>
            {isFacility ? 'مرفق' : 'خدمة فنية'}
          </span>

          <h3 className="text-lg font-bold text-on-surface mb-2">{item.title}</h3>
          <p className="text-sm text-on-surface-muted leading-relaxed mb-4 line-clamp-2">
            {item.shortDescription}
          </p>

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
                <span>{item.address}</span>
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
            تفاصيل
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

// ── How It Works ────────────────────────────────────────────────────────────

const steps = [
  {
    num: '١',
    title: 'تصفح الدليل',
    desc: 'استعرض قائمة المرافق والخدمات المتاحة بالكمبوند.',
    icon: Search,
  },
  {
    num: '٢',
    title: 'تعرف على التفاصيل',
    desc: 'اطلع على مواعيد العمل، العناوين، والتفاصيل الخدمية.',
    icon: BookOpen,
  },
  {
    num: '٣',
    title: 'تواصل مباشر',
    desc: 'اتصل أو راسل الفنيين مباشرة للحصول على الخدمة.',
    icon: CheckCircle,
  },
];

// ── Main Page ───────────────────────────────────────────────────────────────

export function ServicesHomePage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'FACILITY' | 'TECHNICAL'>('ALL');

  const filteredServices = staticServices.filter((service) => {
    if (activeTab === 'ALL') return true;
    return service.kind === activeTab;
  });

  return (
    <div className="animate-fade-in">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="hero-gradient text-white py-20 md:py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">
            دليل الخدمات والمرافق
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            كل مرافق وخدمات Black Horse في مكان واحد للتصفح والتواصل المباشر.
          </p>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} item={service} />
          ))}
        </div>
      </div>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">كيف يعمل الدليل؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-white/10 text-accent flex items-center justify-center mx-auto mb-4 relative">
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
