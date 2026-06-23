export interface ServiceItem {
  id: string;
  kind: 'FACILITY' | 'TECHNICAL';
  serviceType: 'TECHNICAL' | 'REAL_ESTATE';
  title: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  images: string[];
  address?: string | null;
  googleMapsUrl?: string | null;
  locationText?: string | null;
  workingHours?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  isPublic: boolean;
  isFeatured: boolean;
  sortOrder: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface ServicesHomeResponse {
  facilities: ServiceItem[];
  technicalServices: ServiceItem[];
  realEstateServices: ServiceItem[];
  featured: ServiceItem[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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
