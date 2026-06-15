import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  Ban,
} from 'lucide-react';
import { getItem, createServiceRequest } from '../../lib/api/services-service';
import type { CreateServiceRequestPayload } from '../../lib/api/types';

interface FormState {
  requesterName: string;
  requesterPhone: string;
  unitText: string;
  problemDescription: string;
  priority: 'NORMAL' | 'URGENT';
  preferredTime: string;
  imageUrl: string;
}

const initialForm: FormState = {
  requesterName: '',
  requesterPhone: '',
  unitText: '',
  problemDescription: '',
  priority: 'NORMAL',
  preferredTime: '',
  imageUrl: '',
};

export function ServiceRequestPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: item, isLoading: itemLoading, isError: itemError } = useQuery({
    queryKey: ['services', 'item', slug],
    queryFn: () => getItem(slug!),
    enabled: !!slug,
  });

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    // Basic validation
    if (!form.requesterName.trim()) {
      setError('يرجى إدخال الاسم.');
      return;
    }
    if (!form.requesterPhone.trim()) {
      setError('يرجى إدخال رقم الهاتف.');
      return;
    }
    if (!form.problemDescription.trim()) {
      setError('يرجى وصف المشكلة أو الطلب.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload: CreateServiceRequestPayload = {
        requesterName: form.requesterName.trim(),
        requesterPhone: form.requesterPhone.trim(),
        problemDescription: form.problemDescription.trim(),
        priority: form.priority,
      };
      if (form.unitText.trim()) payload.unitText = form.unitText.trim();
      if (form.preferredTime.trim()) payload.preferredTime = form.preferredTime.trim();
      if (form.imageUrl.trim()) payload.imageUrl = form.imageUrl.trim();

      const result = await createServiceRequest(item.id, payload);
      setSuccess({ id: result.id });
      setForm(initialForm);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'حدث خطأ أثناء إرسال الطلب.');
      } else {
        setError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (itemLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  // Item not found
  if (itemError || !item) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-on-surface mb-3">الخدمة غير موجودة</h2>
          <p className="text-on-surface-muted mb-6">عذراً، لم يتم العثور على هذه الخدمة.</p>
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

  // Service doesn't accept requests
  if (!item.acceptsRequests) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="inline-flex p-4 rounded-full bg-amber-50 mb-6">
            <Ban size={48} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            هذه الخدمة لا تستقبل طلبات حالياً
          </h2>
          <p className="text-on-surface-muted mb-6 max-w-md mx-auto">
            يمكنك التواصل مباشرة مع مقدم الخدمة من صفحة التفاصيل.
          </p>
          <Link
            to={`/services/items/${item.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
          >
            <ArrowRight size={18} />
            العودة لتفاصيل الخدمة
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in max-w-md">
          <div className="inline-flex p-4 rounded-full bg-green-50 mb-6">
            <CheckCircle size={56} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3">
            تم إرسال طلبك بنجاح
          </h2>
          <p className="text-on-surface-muted mb-2">
            سيتم التواصل معك في أقرب وقت
          </p>
          <p className="text-sm text-on-surface-muted mb-8">
            رقم الطلب: <span className="font-mono text-accent font-semibold">{success.id}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/services/items/${item.slug}`}
              className="px-6 py-3 border border-surface-border rounded-xl font-semibold text-on-surface hover:bg-surface-muted transition-colors"
            >
              العودة للخدمة
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
            >
              تصفح الخدمات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-muted mb-6 flex-wrap">
        <Link to="/services" className="hover:text-accent transition-colors">الخدمات</Link>
        <span>/</span>
        <Link to={`/services/items/${item.slug}`} className="hover:text-accent transition-colors">
          {item.title}
        </Link>
        <span>/</span>
        <span className="text-on-surface font-medium">طلب خدمة</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
          طلب خدمة: {item.title}
        </h1>
        <p className="text-on-surface-muted">
          يرجى ملء البيانات التالية وسيتم التواصل معك في أقرب وقت.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle size={20} className="flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-on-surface mb-1.5">
            الاسم <span className="text-red-500">*</span>
          </label>
          <input
            id="requesterName"
            name="requesterName"
            type="text"
            value={form.requesterName}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
            className="form-input"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="requesterPhone" className="block text-sm font-medium text-on-surface mb-1.5">
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <input
            id="requesterPhone"
            name="requesterPhone"
            type="tel"
            dir="ltr"
            value={form.requesterPhone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className="form-input text-left"
            required
          />
        </div>

        {/* Unit */}
        <div>
          <label htmlFor="unitText" className="block text-sm font-medium text-on-surface mb-1.5">
            الوحدة / العنوان <span className="text-on-surface-muted text-xs">(اختياري)</span>
          </label>
          <input
            id="unitText"
            name="unitText"
            type="text"
            value={form.unitText}
            onChange={handleChange}
            placeholder="مثال: عمارة 5، شقة 12"
            className="form-input"
          />
        </div>

        {/* Problem Description */}
        <div>
          <label htmlFor="problemDescription" className="block text-sm font-medium text-on-surface mb-1.5">
            وصف المشكلة / الطلب <span className="text-red-500">*</span>
          </label>
          <textarea
            id="problemDescription"
            name="problemDescription"
            rows={4}
            value={form.problemDescription}
            onChange={handleChange}
            placeholder="اشرح المشكلة أو الخدمة المطلوبة بالتفصيل..."
            className="form-input resize-y"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-on-surface mb-1.5">
            الأولوية
          </label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="form-input"
          >
            <option value="NORMAL">عادية</option>
            <option value="URGENT">عاجلة</option>
          </select>
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-medium text-on-surface mb-1.5">
            الوقت المفضل <span className="text-on-surface-muted text-xs">(اختياري)</span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            value={form.preferredTime}
            onChange={handleChange}
            placeholder="مثال: صباحاً من 9 إلى 12"
            className="form-input"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-on-surface mb-1.5">
            رابط صورة <span className="text-on-surface-muted text-xs">(اختياري)</span>
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            dir="ltr"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="form-input text-left"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-accent hover:bg-accent-dark disabled:bg-accent/50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-lg transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send size={20} />
              إرسال الطلب
            </>
          )}
        </button>
      </form>
    </div>
  );
}
