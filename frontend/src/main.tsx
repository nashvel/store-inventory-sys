import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './assets/css/style.css'
import LoginPage from "./pages/LoginPage";

import Pos from './pages/POS/Products';
import ProductList from './pages/Product_Management/ProductList';
import ProductAdd from './pages/Product_Management/productAdd';

import Dashboard from './pages/Dashboard/dashboard';
import Inventory from './pages/Inventory_Management/Inventory';
import Sales from './pages/SalesHistory/inventory';
import ResetPassword from './layouts/Resetpassword';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #4caf50, #81c784)',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          maxWidth: '500px',
        },
      }}
    />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/inventory" element={<ProductList />} />
        <Route path="/productadd" element={<ProductAdd />} />


        <Route path="/products" element={<Pos />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/productlist" element={<Inventory />} />

        <Route path="/sales" element={<Sales />} />

        <Route path="/forgot-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
