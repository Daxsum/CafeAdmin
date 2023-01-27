import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDashboard from "./dashboard/ProductDashboard";
import OrdersDashboard from "./Orders/OrdersDashboard";
import AdminLogin from "./login/login";
import "./css/style.css";
import Choose from "./choose";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<AdminLogin />} />

        <Route exact path="/products" element={<ProductDashboard />} />

        <Route exact path="/orders" element={<OrdersDashboard />} />
        <Route exact path="/report" element={<Dashboard />} />
        <Route exact path="/" element={<Choose />} />
      </Routes>
    </>
  );
}

export default App;
