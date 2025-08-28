import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyCalendar from './Calendar/Calendar';
import DashboardLayoutBranding from './Calendar/Dashboard';
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";


export default function CalendarAppRouter() {
  return (
    <Router>
      <Routes>
        {/*<Route path={'/'} element={<MyCalendar/>}/>  */}
        <Route path={'/'} element={<DashboardLayoutBranding />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CalendarAppRouter />
);
reportWebVitals();
