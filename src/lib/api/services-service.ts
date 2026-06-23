import axios from 'axios';
import type {
  ApiResponse,
  PaginatedApiResponse,
  ServiceItem,
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

// ── Items ─────────────────────────────────────────────────────────────────────

export async function getItems(params?: {
  page?: number;
  limit?: number;
  kind?: 'FACILITY' | 'TECHNICAL';
  serviceType?: 'TECHNICAL' | 'REAL_ESTATE';
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
