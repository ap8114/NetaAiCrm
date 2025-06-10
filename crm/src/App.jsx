import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../src/Layout/Header';

import AdminHome from './Components/HomePage/AdminHome';
import Dashboard from './Components/Dashboard/Dashboard';
import ClientsData from './Components/Clientpage/ClientsData';
import ContractJobs from './Components/ContractJobs/ContractJobs';
import InternalProjects from './Components/Internalproject/InternalProjects';
import LeadOpportunities from './Components/LeadOpportunity/LeadOpportunities';
import Purchases from './Components/Purchasepage/purchasesData';

import VendorsPage from './Components/Vendorspage/VendorsPage';
import CatalogTabs from './Components/Catalog/CataLog';
import Tasks from './Components/Tasks/Tasks';
import BillsTab from './Components/Bills/BillsTab';
import Reports from './Components/Reports/Reports';

// Auth pages
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgotPassword';
import AdminSection from './Components/AdminSection/AdminSection';
import InvoiceDashboard from './Components/Invoice/InvoiceDashboard';
import TimeTracker from './Components/TimeTracker/TimeTracker';
import CalendarView from './Components/Scheduling/CalendarView';
import CopyFromSpreadsheetModal from './Components/Purchasepage/CopyFromSpreadsheetModal';

import Editpurposal from './Components/ContractJobs/Editpurposal';
import UnallocatedTabs from './Components/Internalproject/UnallocatedTabs ';
import PurchaseOrderModal from './Components/Purchasepage/PurchaseOrderModal';


function AppContent() {
  const location = useLocation();
  // Auth routes jahan header nahi dikhana
  const hideHeaderRoutes = ['/', '/signup', '/forgot-password'];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/home" element={<AdminHome />} />


        <Route path="/Dashboard" element={<Dashboard />} />


        <Route path="/ClientsData" element={<ClientsData />} />


        <Route path="/ContractJobs" element={<ContractJobs />} />
        <Route path="/detail" element={<Editpurposal />} />


        <Route path="/InternalProjects" element={<InternalProjects />} />
        <Route path="/UnallocatedTabs" element={<UnallocatedTabs  />} />
<Route path="/PurchaseOrderModal" element={<PurchaseOrderModal  />} />

        <Route path="/LeadOpportunities" element={<LeadOpportunities />} />


        <Route path="/purchasesData" element={<Purchases />} />


          <Route path="/copyfromspreadsheetmodal" element={<CopyFromSpreadsheetModal />} />

        <Route path="/ReportsPage" element={<Reports />} />

        <Route path="/VendorsPage" element={<VendorsPage />} />

        <Route path="/CataLog" element={<CatalogTabs />} />

        <Route path="/Tasks" element={<Tasks />} />

        <Route path="/BillsTab" element={<BillsTab />} />

        <Route path="/InvoiceDashboard" element={<InvoiceDashboard />} />

         <Route path="/TimeTracker" element={<TimeTracker />} />

         <Route path="/CalendarView" element={<CalendarView />} />

         <Route path="/adminsection" element={<AdminSection />} />

        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
