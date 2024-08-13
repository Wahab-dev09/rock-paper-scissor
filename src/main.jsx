import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css'
import './App.css';
import Loading from './Components/Loading';
const Menu = lazy(() => import('./Components/Menu'));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
    <Route
          path='/'
          element={
            <Suspense fallback={<Loading/>}>
              <Menu />
            </Suspense>
          }
        />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)