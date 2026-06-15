import axios from 'axios';
import type {
  ApiResponse,
  PaginatedApiResponse,
  CreateServiceRequestPayload,
  ServiceCategory,
  ServiceCategoryDetailResponse,
  ServiceItem,
  ServiceRequest,
  ServicesHomeResponse,
} from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://compound-os-api.onrender.com/api/v1',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Home ──────────────────────────────────────────────────────────────────────

export async function getServicesHome(): Promise<ServicesHomeResponse> {
  const { data } = await api.get<ApiResponse<ServicesHomeResponse>>('/services');
  return data.data;
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ServiceCategory[]> {
  const { data } = await api.get<ApiResponse<ServiceCategory[]>>('/services/categories');
  return data.data;
}

export async function getCategory(slug: string): Promise<ServiceCategoryDetailResponse> {
  const { data } = await api.get<ApiResponse<ServiceCategoryDetailResponse>>(`/services/categories/${slug}`);
  return data.data;
}

// ── Items ─────────────────────────────────────────────────────────────────────

export async function getItems(params?: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  featured?: boolean;
  search?: string;
}): Promise<{ items: ServiceItem[]; meta: PaginatedApiResponse<ServiceItem>['meta'] }> {
  const { data } = await api.get<PaginatedApiResponse<ServiceItem>>('/services/items', { params });
  return { items: data.data, meta: data.meta };
}

export async function getItem(slug: string): Promise<ServiceItem> {
  const { data } = await api.get<ApiResponse<ServiceItem>>(`/services/items/${slug}`);
  return data.data;
}

// ── Requests ──────────────────────────────────────────────────────────────────

export async function createServiceRequest(
  itemId: string,
  payload: CreateServiceRequestPayload,
): Promise<ServiceRequest> {
  const { data } = await api.post<ApiResponse<ServiceRequest>>(
    `/services/items/${itemId}/requests`,
    payload,
  );
  return data.data;
}
