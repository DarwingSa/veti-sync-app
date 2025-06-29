import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  trendColor: 'text-green-500' | 'text-red-500';
}

const StatCard = ({ title, value, trend, icon, trendColor }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-3xl font-bold my-2">{value}</p>
          <p className={`text-sm ${trendColor}`}>{trend}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;