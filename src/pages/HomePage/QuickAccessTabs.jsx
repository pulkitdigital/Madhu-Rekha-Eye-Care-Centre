import { FileText, Scissors, Clipboard, Users, Settings } from 'lucide-react';

function QuickAccessTabs({ setActivePage }) {
  const menuItems = [
    { id: 'discharge', label: 'Discharge Slips', icon: FileText },
    { id: 'surgery', label: 'Surgery Slips', icon: Scissors },
    { id: 'ot', label: 'O.T. Slips', icon: Clipboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="flex items-center space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <item.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-500">Manage {item.label.toLowerCase()}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickAccessTabs;