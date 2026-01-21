import { Home, FileText, Scissors, Clipboard, Users, Settings, Building2 } from 'lucide-react';
import ClinicProfile from './ClinicProfile';
import NavigationMenu from './NavigationMenu';

function Sidebar({ sidebarOpen, activePage, setActivePage }) {
  const menuItems = [
    { id: 'discharge', label: 'Discharge Slips', icon: FileText },
    { id: 'surgery', label: 'Surgery Slips', icon: Scissors },
    { id: 'ot', label: 'O.T. Slips', icon: Clipboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white shadow-lg overflow-hidden`}>
      <div className="p-6">
        <ClinicProfile />
        <NavigationMenu 
          activePage={activePage}
          setActivePage={setActivePage}
          menuItems={menuItems}
        />
      </div>
    </div>
  );
}

export default Sidebar;