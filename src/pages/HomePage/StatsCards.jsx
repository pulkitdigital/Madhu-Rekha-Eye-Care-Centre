import { Users, FileText, Scissors, Clipboard } from 'lucide-react';

function StatsCards() {
  const stats = [
    { label: 'Total Patients', value: '1,234', icon: Users, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Discharge Slips', value: '856', icon: FileText, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Surgery Slips', value: '342', icon: Scissors, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'O.T. Slips', value: '189', icon: Clipboard, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;