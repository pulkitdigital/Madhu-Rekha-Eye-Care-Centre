import { Home } from 'lucide-react';

function NavigationMenu({ activePage, setActivePage, menuItems }) {
  return (
    <nav className="space-y-2">
      <button
        onClick={() => setActivePage('home')}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          activePage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Home</span>
      </button>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activePage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default NavigationMenu;