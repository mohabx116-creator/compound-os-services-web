import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { PublicServicesShell } from '../components/layout/PublicServicesShell';
import { ROUTES } from '../lib/constants/routes';
import { ServicesHomePage } from '../pages/services/ServicesHomePage';
import { ServiceCategoryPage } from '../pages/services/ServiceCategoryPage';
import { ServiceDetailPage } from '../pages/services/ServiceDetailPage';
import { NotFoundPage } from '../pages/NotFoundPage';

function RequestRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/services/items/${slug}`} replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicServicesShell />}>
          <Route index element={<Navigate to="/services" replace />} />
          <Route path={ROUTES.SERVICES} element={<ServicesHomePage />} />
          <Route path={ROUTES.SERVICE_CATEGORY} element={<ServiceCategoryPage />} />
          <Route path={ROUTES.SERVICE_DETAIL} element={<ServiceDetailPage />} />
          <Route path={ROUTES.SERVICE_REQUEST} element={<RequestRedirect />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
