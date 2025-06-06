import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/Layout/Header';

import AdminHome from './Components/HomePage/AdminHome';
import Dashboard from './Components/Dashboard/Dashboard';
import ClientsData from './Components/Clientpage/ClientsData';
import ContractJobs from './Components/ContractJobs/ContractJobs';
import InternalProjects from './Components/Internalproject/InternalProjects';
import LeadOpportunities from './Components/LeadOpportunity/LeadOpportunities';

import Purchases from './Components/Purchasepage/purchasesData';
import ReportsPage from './Components/Reports/ReportsPage';
import VendorsPage from './Components/Vendorspage/VendorsPage';
import CatalogTabs from './Components/Catalog/CataLog';
import Tasks from './Components/Tasks/Tasks';
import BillsTab from './Components/Bills/BillsTab';
function App() {


  return (
    <>
      <BrowserRouter>
      <Header />
     
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ClientsData" element={<ClientsData />} />
          <Route path="/ContractJobs" element={<ContractJobs />} />
          <Route path="/InternalProjects" element={<InternalProjects />} />
          <Route path="/LeadOpportunities" element={<LeadOpportunities />} />
          <Route path="/purchasesData" element={<Purchases />} />
          <Route path="/ReportsPage" element={<ReportsPage />} />
          <Route path="/VendorsPage" element={<VendorsPage />} />
            <Route path="/CataLog" element={<CatalogTabs />} />
              <Route path="/Tasks" element={<Tasks/>} />
                <Route path="/BillsTab" element={<BillsTab />} />
          
        </Routes>
      
    </BrowserRouter>
      
    </>
  )
}

export default App
