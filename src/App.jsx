import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

import GlobalStyles from './styles/GlobalStyles';

import Spinner from './ui/Spinner';
import AppLayout from "./ui/AppLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Booking = lazy(() => import('./pages/Booking'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Login = lazy(() => import('./pages/Login'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Account = lazy(() => import('./pages/Account'));

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
         retry: false,
      },
   },
});

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <GlobalStyles />

         <BrowserRouter>
            <Suspense fallback={<Spinner />}>
               <Routes>
                  <Route element={
                     <ProtectedRoute>
                        <AppLayout />
                     </ProtectedRoute>
                  }>
                     <Route index element={<Navigate replace to={'/dashboard'} />} />
                     <Route path="/dashboard" element={<Dashboard />} />
                     <Route path="/cabins" element={<Cabins />} />
                     <Route path="/bookings" element={<Bookings />} />
                     <Route path="/bookings/:bookingId" element={<Booking />} />
                     <Route path="/check-in/:bookingId" element={<CheckIn />} />
                     <Route path="/users" element={<Users />} />
                     <Route path="/settings" element={<Settings />} />
                     <Route path="/account" element={<Account />} />
                  </Route>

                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<PageNotFound />} />
               </Routes>
            </Suspense>
         </BrowserRouter>

         <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{margin: '8px'}}
            toastOptions={{
               success: {duration: 3000},
               error: {duration: 3000},
               style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'var(--color-grey-0)',
                  color: 'var(--color-grey-700)',
               }
            }}
         />
      </QueryClientProvider>
   );
};

export default App;