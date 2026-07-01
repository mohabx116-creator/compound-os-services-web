import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { PublicServicesShell } from '../components/layout/PublicServicesShell';
import { ROUTES } from '../lib/constants/routes';
import { ServicesHomePage } from '../pages/services/ServicesHomePage';
import { CommunityHubPage } from '../pages/community/CommunityHubPage';

const ServiceCategoryPage = lazy(() =>
  import('../pages/services/ServiceCategoryPage').then((module) => ({ default: module.ServiceCategoryPage })),
);

const ServiceDetailPage = lazy(() =>
  import('../pages/services/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })),
);

const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

function RequestRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/services/items/${slug}`} replace />;
}

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center" aria-busy="true">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<PublicServicesShell />}>
            <Route index element={<Navigate to="/services" replace />} />
            <Route path={ROUTES.SERVICES} element={<ServicesHomePage />} />
            <Route path={ROUTES.COMMUNITY} element={<CommunityHubPage />} />
            <Route path={ROUTES.SERVICE_CATEGORY} element={<ServiceCategoryPage />} />
            <Route path={ROUTES.SERVICE_DETAIL} element={<ServiceDetailPage />} />
            <Route path={ROUTES.SERVICE_REQUEST} element={<RequestRedirect />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
