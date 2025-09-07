import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './components/Auth/Login';
import DashboardLayoutNew from './components/Dashboard/DashboardLayoutNew';
import DashboardRoutes from './components/Dashboard/DashboardRoutes';

// Pages
import Landing from './pages/Landing/Landing';
import Societies from './pages/Societies/Societies';
import Councils from './pages/Councils/Councils';
import SocietyDetail from './pages/Societies/SocietyDetail';
import CouncilDetail from './pages/Councils/CouncilDetail';
import SocietyDashboard from './pages/Societies/SocietyDashboard';
import CouncilDashboard from './pages/Councils/CouncilDashboard';
import Achievements from './pages/Achievements/Achievements';
import Gallery from './pages/Gallery/Gallery';
import PastEvents from './pages/PastEvents/PastEvents';
import UpcommingEvents from './pages/UpcommingEvents/UpcommingEvents';
import Journey from './components/Essentials/Journey';
import Notifications from './components/Essentials/Notifications';
import Newsletter from './components/Essentials/Newsletter';
import Team from './components/Essentials/Team';
import Contact from './components/Essentials/Contact';
import Unauthorized from './pages/Unauthorized';
import LoginHelp from './pages/LoginHelp';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-help" element={<LoginHelp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Dashboard Redirect Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Society Routes */}
          <Route path="/societies" element={<Societies />} />
          <Route path="/societies/:societyId" element={<SocietyDetail />} />
          <Route path="/societies/:societyId/past-events" element={<PastEvents />} />
          <Route path="/societies/:societyId/upcoming-events" element={<UpcommingEvents />} />
          <Route path="/societies/:societyId/achievements" element={<Achievements />} />
          <Route path="/societies/:societyId/gallery" element={<Gallery />} />
          
          {/* Protected Society Dashboard */}
          <Route 
            path="/societies/:societyId/dashboard" 
            element={
              <ProtectedRoute type="society">
                <SocietyDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Council Routes */}
          <Route path="/councils" element={<Councils />} />
          <Route path="/councils/:councilId" element={<CouncilDetail />} />
          
          {/* Protected Council Dashboard */}
          <Route 
            path="/councils/:councilId/dashboard" 
            element={
              <ProtectedRoute type="council">
                <CouncilDashboard />
              </ProtectedRoute>
            } 
          />

          {/* New Dashboard Management Routes - Disabled for now */}
          {/* <Route 
            path="/dashboard/:entityId/*" 
            element={
              <ProtectedRoute>
                <DashboardLayoutNew>
                  <DashboardRoutes />
                </DashboardLayoutNew>
              </ProtectedRoute>
            } 
          /> */}
          
          {/* General Routes */}
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/upcoming-events" element={<UpcommingEvents />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/newsletters" element={<Newsletter />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
