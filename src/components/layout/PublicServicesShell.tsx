import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/dalil-subhi-logo-192.jpg';

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
              <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 bg-white">
                <img
                  src={logo}
                  alt="مجمع الخدمات للمنطقة"
                  className="h-full w-full object-cover"
                  decoding="async"
                  width="36"
                  height="36"
                />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-base tracking-wide">مجمع الخدمات للمنطقة</div>
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
              <a
                href="https://dalilsubhi.com/"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-white/5"
              >
                دليل السبحي
              </a>
              <Link
                to="/services"
                className="mr-2 px-5 py-2 bg-accent hover:bg-accent-dark rounded-lg text-sm font-semibold transition-colors"
              >
                تصفح الخدمات
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
              <a
                href="https://dalilsubhi.com/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-white/5"
              >
                دليل السبحي
              </a>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-accent hover:bg-accent-dark rounded-lg text-sm font-semibold text-center transition-colors"
              >
                تصفح الخدمات
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
      <footer className="bg-primary text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right" dir="rtl">
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">مجمع الخدمات للمنطقة</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                منصة آمنة لعرض خدمات المنطقة
              </p>
            </div>

            {/* Column 2: Contact/Support */}
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">للتواصل والدعم</h3>
              <div className="flex flex-col gap-2 mt-2">
                <a
                  href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors w-fit"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  جروب الواتساب
                </a>
                <a
                  href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors w-fit"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  جروب الفيس بوك
                </a>
              </div>
            </div>

            {/* Column 3: Important Links */}
            <div className="space-y-3">
              <h3 className="font-bold text-base text-white">روابط مهمة</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://www.dalilsubhi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    الصفحة الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    جروب الواتساب
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    جروب الفيس بوك
                  </a>
                </li>
                <li>
                  <a
                    href="https://dalilsubhi.com/publishing-policy"
                    className="hover:text-accent transition-colors"
                  >
                    سياسة النشر والإعلان
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 مجمع الخدمات للمنطقة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
