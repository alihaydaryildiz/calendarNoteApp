import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DashboardLayoutBranding from './Calendar/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyProfilePage from './Calendar/MyProfilePage';
import ActivitiesPage from './Calendar/ActivitiesPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<DashboardLayoutBranding />} />
      <Route path="/myProfile" element={<MyProfilePage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
    </Routes>
  </Router>
);

reportWebVitals();
