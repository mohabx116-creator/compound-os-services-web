import axios from 'axios';
import type {
  ApiResponse,
  PaginatedApiResponse,
  ServiceItem,
  ServicesHomeResponse,
} from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://compound-os-api.onrender.com/api/v1',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const SERVICES_HOME_CACHE_KEY = 'compound-os-services-home:v1';
const SERVICES_HOME_CACHE_TTL_MS = 5 * 60 * 1000;

let servicesHomeMemoryCache: { data: ServicesHomeResponse; cachedAt: number } | null = null;
let servicesHomeRequest: Promise<ServicesHomeResponse> | null = null;

function isFresh(cachedAt: number) {
  return Date.now() - cachedAt < SERVICES_HOME_CACHE_TTL_MS;
}

function readServicesHomeCache() {
  if (servicesHomeMemoryCache && isFresh(servicesHomeMemoryCache.cachedAt)) {
    return servicesHomeMemoryCache.data;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawCache = window.localStorage.getItem(SERVICES_HOME_CACHE_KEY);
    if (!rawCache) {
      return null;
    }

    const parsed = JSON.parse(rawCache) as { data?: ServicesHomeResponse; cachedAt?: number };
    if (!parsed.data || !parsed.cachedAt || !isFresh(parsed.cachedAt)) {
      window.localStorage.removeItem(SERVICES_HOME_CACHE_KEY);
      return null;
    }

    servicesHomeMemoryCache = { data: parsed.data, cachedAt: parsed.cachedAt };
    return parsed.data;
  } catch {
    return null;
  }
}

function writeServicesHomeCache(data: ServicesHomeResponse) {
  const cachedAt = Date.now();
  servicesHomeMemoryCache = { data, cachedAt };

  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(SERVICES_HOME_CACHE_KEY, JSON.stringify({ data, cachedAt }));
  } catch {
    // Local storage can fail in private windows; memory cache still covers this page.
  }
}

// ── Home ──────────────────────────────────────────────────────────────────────

export function getCachedServicesHome(): ServicesHomeResponse | null {
  return readServicesHomeCache();
}

export async function getServicesHome(options: { bypassCache?: boolean } = {}): Promise<ServicesHomeResponse> {
  if (!options.bypassCache) {
    const cached = readServicesHomeCache();
    if (cached) {
      return cached;
    }
  }

  if (!servicesHomeRequest) {
    servicesHomeRequest = api
      .get<ApiResponse<ServicesHomeResponse>>('/services')
      .then(({ data }) => {
        writeServicesHomeCache(data.data);
        return data.data;
      })
      .finally(() => {
        servicesHomeRequest = null;
      });
  }

  return servicesHomeRequest;
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
