import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/Signup'));
const ViewUser = lazy(() => import('./pages/ViewUser'));
const ViewAllUser = lazy(() => import('./pages/ViewAllUser'));
const AdminBOard = lazy(() => import('./pages/AdminBoard'));


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Suspense
          fallback = { <div id="preloader"></div> }
        >

          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/view-all-user' element={<ViewUser />} />
            <Route path='/view-user' element={<ViewAllUser />} />
            <Route path='/admin-dashboard' element={<AdminBOard />} />
          </Routes>
          
        </Suspense>

        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
