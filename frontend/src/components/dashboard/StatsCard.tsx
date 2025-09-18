import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'emerald' | 'red' | 'yellow';
}

const StatsCard = ({ title, value, change, changeType, icon, color }: StatsCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100',
        text: 'text-blue-600',
        accent: 'text-blue-500'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100',
        text: 'text-green-600',
        accent: 'text-green-500'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100',
        text: 'text-purple-600',
        accent: 'text-purple-500'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'bg-orange-100',
        text: 'text-orange-600',
        accent: 'text-orange-500'
      },
      indigo: {
        bg: 'bg-indigo-50',
        icon: 'bg-indigo-100',
        text: 'text-indigo-600',
        accent: 'text-indigo-500'
      },
      emerald: {
        bg: 'bg-emerald-50',
        icon: 'bg-emerald-100',
        text: 'text-emerald-600',
        accent: 'text-emerald-500'
      },
      red: {
        bg: 'bg-red-50',
        icon: 'bg-red-100',
        text: 'text-red-600',
        accent: 'text-red-500'
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'bg-yellow-100',
        text: 'text-yellow-600',
        accent: 'text-yellow-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return '↗️';
      case 'negative':
        return '↘️';
      default:
        return '→';
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const colors = getColorClasses(color);

  return (
    <div
      ref={cardRef}
      className={`${colors.bg} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div className={`text-sm font-medium ${getChangeColor()} flex items-center space-x-1`}>
          <span>{getChangeIcon()}</span>
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${colors.text}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>vs last month</span>
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <span className="font-medium">{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
