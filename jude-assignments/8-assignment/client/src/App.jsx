import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Router } from 'express';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/Signup'));
const ViewUser = lazy(() => import('./pages/ViewUser'));
const ViewAllUser = lazy(() => import('./pages/ViewAllUser'));


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Suspense
          fallback = { <div id="preloader"></div> }
        >

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/view-all-user' element={<ViewUser />} />
            <Route path='/view-user' element={<ViewAllUser />} />
          </Routes>
          
        </Suspense>

        <Footer />

      </BrowserRouter>

    </>
  )
}

export default App
