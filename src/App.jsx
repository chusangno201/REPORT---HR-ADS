import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import SalesKpi from "./pages/SalesKpi";
import Reports from "./pages/Reports";
import Issues from "./pages/Issues";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/sales-kpi" element={<SalesKpi />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
