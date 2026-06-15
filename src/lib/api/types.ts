// ── Types mirroring the backend API response shapes ──────────────────────────

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
  itemCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  locationText: string | null;
  workingHours: string | null;
  phone: string | null;
  whatsapp: string | null;
  isPublic: boolean;
  isFeatured: boolean;
  acceptsRequests: boolean;
  sortOrder: number;
  status: 'ACTIVE' | 'INACTIVE';
  category?: ServiceCategory;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesHomeResponse {
  categories: ServiceCategory[];
  featuredItems: ServiceItem[];
  latestItems: ServiceItem[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ServiceCategoryDetailResponse {
  category: ServiceCategory;
  items: ServiceItem[];
}

export interface CreateServiceRequestPayload {
  requesterName: string;
  requesterPhone: string;
  unitText?: string;
  problemDescription: string;
  priority: 'NORMAL' | 'URGENT';
  preferredTime?: string;
  imageUrl?: string;
}

export interface ServiceRequest {
  id: string;
  serviceItemId: string;
  requesterName: string;
  requesterPhone: string;
  unitText: string | null;
  problemDescription: string;
  priority: 'NORMAL' | 'URGENT';
  status: 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'DONE' | 'CANCELLED';
  preferredTime: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}
