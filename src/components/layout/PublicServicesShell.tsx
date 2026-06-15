import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Wrench } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المرافق', href: '/services' },
  { label: 'الخدمات الفنية', href: '/services' },
];

export function PublicServicesShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ── Top Navigation ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
                <Wrench size={20} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm tracking-wide">Black Horse Services</div>
                <div className="text-xs text-gray-300">دليل الخدمات والمرافق</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/services"
                className="mr-2 px-5 py-2 bg-accent hover:bg-accent-dark rounded-lg text-sm font-semibold transition-colors"
              >
                طلب خدمة
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="قائمة التنقل"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-accent hover:bg-accent-dark rounded-lg text-sm font-semibold text-center transition-colors"
              >
                طلب خدمة
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Wrench size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm">Black Horse Services</div>
                  <div className="text-xs text-gray-400">دليل الخدمات والمرافق</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                منصة متكاملة لعرض جميع مرافق وخدمات الكمبوند وتسهيل طلب الخدمات الفنية.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-400 hover:text-accent transition-colors">الرئيسية</Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-gray-400 hover:text-accent transition-colors">جميع الخدمات</Link>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-semibold text-sm mb-4">تواصل معنا</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                للاستفسارات والمقترحات تواصل مع إدارة الكمبوند.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Black Horse Compound. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
