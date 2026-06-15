import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="inline-flex p-4 rounded-full bg-surface-muted mb-6">
          <SearchX size={48} className="text-on-surface-muted" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-3">
          الصفحة غير موجودة
        </h1>
        <p className="text-on-surface-muted mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
        >
          <Home size={18} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
