import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/dalil-subhi-logo-192.jpg';
import Footer from './Footer';

const SERVICES_ORIGIN = 'https://services-ds-core-91.dalilsubhi.com';

const navLinks = [
  { label: 'ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©', href: '/' },
  { label: 'ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ط¹ط§ظ…ط©', href: '/services' },
  { label: 'ط§ظ„ط®ط¯ظ…ط§طھ ط§ظ„ظپظ†ظٹط©', href: '/services' },
];

function updateHeadTag(
  selector: string,
  create: () => HTMLElement,
  update: (element: HTMLElement) => void,
): void {
  const element = document.head.querySelector(selector) as HTMLElement | null;
  if (element) {
    update(element);
    return;
  }

  const created = create();
  update(created);
  document.head.appendChild(created);
}

function useServicesSeo(pathname: string) {
  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const canonicalPath = normalizedPath === '/' ? '/services' : normalizedPath;

    const seo =
      normalizedPath === '/community'
        ? {
            title: 'البوابة المجتمعية | مجمع الخدمات للمنطقة',
            description: 'استعرض البوابة المجتمعية الرسمية لمجمع الخدمات للمنطقة وروابطها المفيدة.',
          }
        : normalizedPath.startsWith('/services/categories/')
          ? {
              title: 'فئات الخدمات | مجمع الخدمات للمنطقة',
              description: 'تصفح فئات الخدمات المتاحة داخل مجمع الخدمات للمنطقة.',
            }
          : normalizedPath.startsWith('/services/items/') && normalizedPath.endsWith('/request')
            ? {
                title: 'طلب الخدمة | مجمع الخدمات للمنطقة',
                description: 'أرسل طلبًا مباشرًا للخدمة المطلوبة من خلال الصفحة المخصصة لذلك.',
              }
            : normalizedPath.startsWith('/services/items/')
              ? {
                  title: 'تفاصيل الخدمة | مجمع الخدمات للمنطقة',
                  description: 'اطلع على تفاصيل الخدمة وروابط التواصل والإرشادات المرتبطة بها.',
                }
              : {
                  title: 'خدمات المنطقة | مجمع الخدمات للمنطقة',
                  description: 'اكتشف الخدمات العامة والفنية والمجتمعية الرسمية لمجمع الخدمات للمنطقة.',
                };

    document.title = seo.title;

    updateHeadTag(
      'meta[name="description"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('name', 'description');
        element.setAttribute('content', seo.description);
      },
    );

    updateHeadTag(
      'meta[property="og:title"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('property', 'og:title');
        element.setAttribute('content', seo.title);
      },
    );

    updateHeadTag(
      'meta[property="og:description"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('property', 'og:description');
        element.setAttribute('content', seo.description);
      },
    );

    updateHeadTag(
      'meta[property="og:url"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('property', 'og:url');
        element.setAttribute('content', `${SERVICES_ORIGIN}${canonicalPath}`);
      },
    );

    updateHeadTag(
      'meta[name="twitter:title"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('name', 'twitter:title');
        element.setAttribute('content', seo.title);
      },
    );

    updateHeadTag(
      'meta[name="twitter:description"]',
      () => document.createElement('meta'),
      (element) => {
        element.setAttribute('name', 'twitter:description');
        element.setAttribute('content', seo.description);
      },
    );

    updateHeadTag(
      'link[rel="canonical"]',
      () => document.createElement('link'),
      (element) => {
        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', `${SERVICES_ORIGIN}${canonicalPath}`);
      },
    );
  }, [pathname]);
}

export function PublicServicesShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useServicesSeo(location.pathname);

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
                  alt="ظ…ط¬ظ…ط¹ ط§ظ„ط®ط¯ظ…ط§طھ ظ„ظ„ظ…ظ†ط·ظ‚ط©"
                  className="h-full w-full object-cover"
                  decoding="async"
                  width="36"
                  height="36"
                />
              </div>
              <div className="leading-tight">
                <div className="text-base font-black tracking-tight text-[#071614] sm:text-lg">ظ…ط¬ظ…ط¹ ط§ظ„ط®ط¯ظ…ط§طھ ظ„ظ„ظ…ظ†ط·ظ‚ط©</div>
                <div className="text-[11px] font-medium text-[#6b7280]">ط¯ظ„ظٹظ„ ط§ظ„ط³ط¨ط­ظٹ</div>
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
                ط¯ظ„ظٹظ„ ط§ظ„ط³ط¨ط­ظٹ
              </a>
              <Link
                to="/services"
                className="mr-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,163,127,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,163,127,0.2)]"
              >
                طھطµظپط­ ط§ظ„ط®ط¯ظ…ط§طھ
              </Link>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-[#ebdcb9] bg-white p-2.5 text-[#0f3b35] shadow-sm transition-colors hover:border-[#d6b25e] hover:bg-[#fffaf0] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="ظ‚ط§ط¦ظ…ط© ط§ظ„طھظ†ظ‚ظ„"
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
                ط¯ظ„ظٹظ„ ط§ظ„ط³ط¨ط­ظٹ
              </a>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#0fa37f] to-[#0a8a6b] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,163,127,0.15)] transition-all duration-300"
              >
                طھطµظپط­ ط§ظ„ط®ط¯ظ…ط§طھ
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
