import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import RouteError from '../components/RouteError';
import Home from '../pages/Home';

const AddRecord = lazy(() => import('../pages/AddRecord'));
const Statistics = lazy(() => import('../pages/Statistics'));
const Savings = lazy(() => import('../pages/SavingsOperate'));
const SavingsManage = lazy(() => import('../pages/Savings'));
const Profile = lazy(() => import('../pages/Profile'));
const CategoryManage = lazy(() => import('../pages/CategoryManage'));
const Budget = lazy(() => import('../pages/Budget'));
const Changelog = lazy(() => import('../pages/Changelog'));
const Features = lazy(() => import('../pages/Features'));
const About = lazy(() => import('../pages/About'));
const Recurring = lazy(() => import('../pages/Recurring'));
const QuickRecordManage = lazy(() => import('../pages/QuickRecordManage'));
const MyFridge = lazy(() => import('../pages/MyFridge'));

const PageLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f4d03f'
  }}>
    <Spin size="large" />
  </div>
);

const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <RouteError /> },
  { path: '/add', element: <LazyWrapper><AddRecord /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/add-record', element: <LazyWrapper><AddRecord /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/statistics', element: <LazyWrapper><Statistics /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/savings', element: <LazyWrapper><Savings /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/savings-manage', element: <LazyWrapper><SavingsManage /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/profile', element: <LazyWrapper><Profile /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/category-manage', element: <LazyWrapper><CategoryManage /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/budget', element: <LazyWrapper><Budget /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/changelog', element: <LazyWrapper><Changelog /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/features', element: <LazyWrapper><Features /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/about', element: <LazyWrapper><About /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/recurring', element: <LazyWrapper><Recurring /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/quick-record-manage', element: <LazyWrapper><QuickRecordManage /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '/my-fridge', element: <LazyWrapper><MyFridge /></LazyWrapper>, errorElement: <RouteError /> },
  { path: '*', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
]);

export default router;
