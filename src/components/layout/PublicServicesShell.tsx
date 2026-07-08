import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/dalil-subhi-logo-192.jpg';

const navLinks = [
  { label: 'الصفحة الرئيسية', href: '/' },
  { label: 'الخدمات العامة', href: '/services' },
  { label: 'الخدمات الفنية', href: '/services' },
];

export function PublicServicesShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/'
      ? location.pathname === '/'
      : location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f1] text-right text-on-surface" dir="rtl">
      <header className="sticky top-0 z-50 border-b border-[#d6b25e]/15 bg-white text-on-surface shadow-[0_10px_30px_rgba(7,22,20,0.04)] backdrop-blur-0 md:bg-white/86 md:backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-20">
            <Link to="/" className="flex items-center gap-3 rounded-2xl px-1 py-1 transition-transform duration-300 hover:scale-[1.01]">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-[#d6b25e]/15 bg-[#fffaf0] shadow-sm">
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
                <div className="text-base font-black tracking-tight text-[#071614] sm:text-lg">مجمع الخدمات للمنطقة</div>
                <div className="text-[11px] font-medium text-[#6b7280]">دليل السبحي</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-[#0fa37f]/10 text-[#0f3b35] shadow-sm ring-1 ring-inset ring-[#0fa37f]/15'
                      : 'text-[#4b5563] hover:bg-[#f8f3e7] hover:text-[#0f3b35]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://dalilsubhi.com/"
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#4b5563] transition-all duration-300 hover:bg-[#f8f3e7] hover:text-[#0f3b35]"
              >
                دليل السبحي
              </a>
              <Link
                to="/services"
                className="mr-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,163,127,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,163,127,0.2)]"
              >
                تصفح الخدمات
              </Link>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-[#ebdcb9] bg-white p-2.5 text-[#0f3b35] shadow-sm transition-colors hover:border-[#d6b25e] hover:bg-[#fffaf0] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="قائمة التنقل"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#ebdcb9]/60 bg-white/95 md:hidden animate-fade-in">
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-[#0fa37f]/10 text-[#0f3b35] ring-1 ring-inset ring-[#0fa37f]/15'
                      : 'bg-[#fbf8f1] text-[#4b5563] hover:bg-[#f8f3e7] hover:text-[#0f3b35]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://dalilsubhi.com/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl bg-[#fbf8f1] px-4 py-3 text-sm font-semibold text-[#4b5563] transition-all duration-300 hover:bg-[#f8f3e7] hover:text-[#0f3b35]"
              >
                دليل السبحي
              </a>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,163,127,0.15)] transition-all duration-300"
              >
                تصفح الخدمات
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[#ebdcb9]/50 bg-[#fcfaf5] text-[#0f172a]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-right md:grid-cols-3" dir="rtl">
            <div className="space-y-3">
              <h3 className="text-base font-black text-[#071614]">مجمع الخدمات للمنطقة</h3>
              <p className="text-sm leading-relaxed text-[#6b7280]">
                منصة خفيفة وأنيقة لعرض خدمات المنطقة وروابطها الأساسية.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-black text-[#071614]">للتواصل والدعم</h3>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0fa37f]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0f766e] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0fa37f]/30 hover:bg-[#f6fbf8]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#0fa37f]" />
                  جروب الواتساب
                </a>
                <a
                  href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1877F2]/15 bg-white px-3 py-2 text-sm font-semibold text-[#1d4ed8] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1877F2]/30 hover:bg-[#f8fbff]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#1877F2]" />
                  جروب الفيس بوك
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-black text-[#071614]">روابط مهمة</h3>
              <ul className="space-y-2 text-sm text-[#6b7280]">
                <li>
                  <a
                    href="https://www.dalilsubhi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#0f766e]"
                  >
                    الصفحة الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/ECEZfbsvjlU43eDvKa9XUu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#0f766e]"
                  >
                    جروب الواتساب
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/share/g/1CzbCwjugk/?mibextid=KtfwRi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#0f766e]"
                  >
                    جروب الفيس بوك
                  </a>
                </li>
                <li>
                  <a
                    href="https://dalilsubhi.com/publishing-policy"
                    className="transition-colors hover:text-[#0f766e]"
                  >
                    سياسة النشر والإعلان
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-[#ebdcb9]/60 pt-6 text-center">
            <p className="text-xs text-[#8a6d22]">
              © 2026 مجمع الخدمات للمنطقة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
