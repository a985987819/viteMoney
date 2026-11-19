/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageTransition from '../components/PageTransition';
import PageLoading from '../components/PageTransition/PageLoading';
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
const TimeManage = lazy(() => import('../pages/TimeManage'));

const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  { path: '/', element: <PageTransition><Home /></PageTransition>, errorElement: <RouteError /> },
  { path: '/add', element: <PageTransition><LazyWrapper><AddRecord /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/add-record', element: <PageTransition><LazyWrapper><AddRecord /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/statistics', element: <PageTransition><LazyWrapper><Statistics /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/savings', element: <PageTransition><LazyWrapper><Savings /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/savings-manage', element: <PageTransition><LazyWrapper><SavingsManage /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/profile', element: <PageTransition><LazyWrapper><Profile /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/category-manage', element: <PageTransition><LazyWrapper><CategoryManage /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/budget', element: <PageTransition><LazyWrapper><Budget /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/changelog', element: <PageTransition><LazyWrapper><Changelog /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/features', element: <PageTransition><LazyWrapper><Features /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/about', element: <PageTransition><LazyWrapper><About /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/recurring', element: <PageTransition><LazyWrapper><Recurring /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/quick-record-manage', element: <PageTransition><LazyWrapper><QuickRecordManage /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/my-fridge', element: <PageTransition><LazyWrapper><MyFridge /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '/time-manage', element: <PageTransition><LazyWrapper><TimeManage /></LazyWrapper></PageTransition>, errorElement: <RouteError /> },
  { path: '*', element: <Navigate to="/" replace />, errorElement: <RouteError /> },
]);

export default router;
