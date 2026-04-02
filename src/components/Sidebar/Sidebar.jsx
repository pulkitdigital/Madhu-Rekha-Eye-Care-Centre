import { FileText, Settings, LogOut } from 'lucide-react';
import ClinicProfile from './ClinicProfile';
import NavigationMenu from './NavigationMenu';

function Sidebar({ sidebarOpen, activePage, setActivePage, onLogout }) {
  const menuItems = [
    { id: 'discharge', label: 'Discharge Slips', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white shadow-lg overflow-hidden flex flex-col`}>
      <div className="p-6 flex-1">
        <ClinicProfile />
        <NavigationMenu 
          activePage={activePage}
          setActivePage={setActivePage}
          menuItems={menuItems}
        />
      </div>

      {/* Logout Button - bilkul neeche */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200 font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;