import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/HomePage/HomePage';
import DischargeSlips from './pages/DischargeSlips/DischargeSlips';
import SurgerySlips from './pages/SurgerySlips/SurgerySlips';
import OTSlips from './pages/OTSlips/OTSlips';
import Patients from './pages/Patients/Patients';
import SettingsPage from './pages/Settings/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'discharge':
        return <DischargeSlips />;
      case 'surgery':
        return <SurgerySlips />;
      case 'ot':
        return <OTSlips />;
      case 'patients':
        return <Patients />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;