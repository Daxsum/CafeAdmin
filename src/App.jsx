import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardHospital from "../src/dashboard/DashboardHospital";
import PatientHospital from "../src/hospitalDashboard/patientHospital/patientHospital";
import DashboardPatient from "./Patients/DashboardPatient";
import AdminLogin from "./login/login";
import RegisterForm from "./signup/signUp";
import "./css/style.css";
import Choose from "./choose";
import HospitalLogin from "./hospitalDashboard/login";
import HospitalDashboard from "./hospitalDashboard/hospitalDashboard";

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
        <Route exact path="/signUp" element={<RegisterForm />} />
        <Route exact path="/patientHospital" element={<PatientHospital />} />
        <Route exact path="/login" element={<AdminLogin />} />
        <Route exact path="/hospitalAdmin" element={<HospitalDashboard />} />
        <Route exact path="/hospital" element={<DashboardHospital />} />
        <Route exact path="/hospitalLogin" element={<HospitalLogin />} />
        <Route exact path="/patient" element={<DashboardPatient />} />
        <Route exact path="/report" element={<Dashboard />} />
        <Route exact path="/" element={<Choose />} />
      </Routes>
    </>
  );
}

export default App;
