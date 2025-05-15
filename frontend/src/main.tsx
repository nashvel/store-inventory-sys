import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/Productadd" element={<ProductAdd />} />


        <Route path="/pos" element={<Pos />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/Inventory" element={<Inventory />} />

        <Route path="/Sales" element={<Sales />} />



      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
