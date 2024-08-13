import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css'
import './App.css';
import Loading from './Components/Loading';
import App from './App.jsx';
const Menu = lazy(() => import('./Components/Menu'));
const UserName = lazy(() => import('./Components/UserName'));
const Rounds = lazy(() => import('./Components/Rounds'));
const Rps = lazy(() => import('./Components/Rps'));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
    <Route
          path='/'
          element={
            <Suspense fallback={<Loading/>}>
              <Menu/>
            </Suspense>
          }
        />
    <Route
          path='/username'
          element={
            <Suspense fallback={<Loading/>}>
              <UserName/>
            </Suspense>
          }
        />
    <Route
          path='/rounds'
          element={
            <Suspense fallback={<Loading/>}>
              <Rounds/>
            </Suspense>
          }
        />
    <Route
          path='/rps'
          element={
            <Suspense fallback={<Loading/>}>
              <Rps/>
            </Suspense>
          }
        />
    <Route
          path='*'
          element={
              <App/>
          }
        />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)