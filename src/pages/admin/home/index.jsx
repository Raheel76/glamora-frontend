
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import StatsCard from '../../../components/StatsCard';
import { RevenueChart, SalesOverviewChart, TrafficSourcesChart, UserActivityChart } from '../../../components/common';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800  mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue" 
            value="$124,563.00" 
            change="+14.2%" 
            trend="up" 
            icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          />
          <StatsCard 
            title="New Users" 
            value="3,781" 
            change="+5.7%" 
            trend="up" 
            icon={<Users className="h-6 w-6 text-teal-500" />}
          />
          <StatsCard 
            title="Total Orders" 
            value="12,936" 
            change="+8.3%" 
            trend="up" 
            icon={<ShoppingBag className="h-6 w-6 text-purple-500" />}
          />
          <StatsCard 
            title="Conversion Rate" 
            value="3.24%" 
            change="-0.5%" 
            trend="down" 
            icon={<TrendingUp className="h-6 w-6 text-orange-500" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white  rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Revenue Growth</h3>
          <RevenueChart />
        </div>
        <div className="bg-white  rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Sales Overview</h3>
          <SalesOverviewChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white  rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">Traffic Sources</h3>
          <TrafficSourcesChart />
        </div>
        <div className="bg-white  rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-black mb-4">User Activity</h3>
          <UserActivityChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
