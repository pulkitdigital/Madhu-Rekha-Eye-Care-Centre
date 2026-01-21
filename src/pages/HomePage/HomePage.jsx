import StatsCards from './StatsCards';
import QuickAccessTabs from './QuickAccessTabs';

function HomePage({ setActivePage }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <StatsCards />
      <QuickAccessTabs setActivePage={setActivePage} />
    </div>
  );
}

export default HomePage;