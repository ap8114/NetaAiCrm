import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Header from './Layout/Header';
import Home from './Components/HomePage/home';
import AdminSection from './Components/AdminSection/AdminSection';
import LeadOpportunities from './Components/LeadOpportunity/LeadOpportunities';
import BillsTab from './Components/LeadOpportunity/BillsTab';
import NotesTab from './Components/LeadOpportunity/NotesTab';
import InternalProjects from './Components/Internalproject/InternalProjects';
import VendorsPage from './Components/Vendorspage/VendorsPage';
import Reports from './Components/Reports/Reports';
import ClientsData from './Components/Clientpage/ClientsData';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route Start */}
        <Route path="/header" element={<Header />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminsection" element={<AdminSection />} />
        <Route path="/leadopportunities" element={<LeadOpportunities />} />
        <Route path="/billstab" element={<BillsTab />} />
        <Route path="/notestab" element={<NotesTab />} />
        <Route path="/internalprojects" element={<InternalProjects />} />
        <Route path="/clientdata" element={<ClientsData />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/vendorspage" element={<VendorsPage />} />
        {/* Home Route End */}
      </Routes>
    </Router>
  );
}

export default App;
