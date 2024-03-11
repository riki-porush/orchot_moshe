import React, { useState, useEffect } from "react";
import DonationDetails from "./donationDetails";
import BarScreen from "./barChart";
import "./App.css";
import SplitBarChart from "./splitBarChart";
import Squares from "./squares";
import MainPage from "./MainPage"
import OMHeader from './header.js'
import HomePage from "./home.js";
import Dashboard from "./dashboard.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter >
            <Routes>
                    <Route path="/" exact={true} index element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} /> 
                    <Route path="/donationDetails" element={<DonationDetails />} />                     
            </Routes>
        </BrowserRouter >
    </div>
  );
}

export default App;