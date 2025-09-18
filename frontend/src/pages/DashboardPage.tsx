import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import UserManagement from '../components/dashboard/UserManagement';
import ToursManagement from '../components/dashboard/ToursManagement';
import GalleryManagement from '../components/dashboard/GalleryManagement';
import BlogManagement from '../components/dashboard/BlogManagement';

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroRef.current && !isLoading) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-on-scroll'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [isLoading]);

  const statsData = [
    {
      title: 'Total Users',
      value: 1247,
      change: '+12%',
      changeType: 'positive' as const,
      icon: '👥',
      color: 'blue' as const
    },
    {
      title: 'Active Tours',
      value: 48,
      change: '+5%',
      changeType: 'positive' as const,
      icon: '🗺️',
      color: 'green' as const
    },
    {
      title: 'Gallery Items',
      value: 156,
      change: '+8%',
      changeType: 'positive' as const,
      icon: '📸',
      color: 'purple' as const
    },
    {
      title: 'Blog Posts',
      value: 23,
      change: '+3%',
      changeType: 'positive' as const,
      icon: '📝',
      color: 'orange' as const
    },
    {
      title: 'Total Bookings',
      value: 892,
      change: '+15%',
      changeType: 'positive' as const,
      icon: '📋',
      color: 'indigo' as const
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+18%',
      changeType: 'positive' as const,
      icon: '💰',
      color: 'emerald' as const
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('users')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-left"
                >
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium text-gray-900">Manage Users</div>
                  <div className="text-sm text-gray-600">View and edit user accounts</div>
                </button>
                <button
                  onClick={() => setActiveSection('tours')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-left"
                >
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="font-medium text-gray-900">Manage Tours</div>
                  <div className="text-sm text-gray-600">Add and edit tour packages</div>
                </button>
                <button
                  onClick={() => setActiveSection('gallery')}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-left"
                >
                  <div className="text-2xl mb-2">📸</div>
                  <div className="font-medium text-gray-900">Manage Gallery</div>
                  <div className="text-sm text-gray-600">Upload and organize images</div>
                </button>
                <button
                  onClick={() => setActiveSection('blog')}
                  className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 text-left"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-medium text-gray-900">Manage Blog</div>
                  <div className="text-sm text-gray-600">Create and edit blog posts</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New user registration: John Doe</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Tour "Bali Adventure" was updated</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New gallery image uploaded</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Blog post "Travel Tips" published</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'tours':
        return <ToursManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'blog':
        return <BlogManagement />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div 
          ref={heroRef}
          className="bg-white border-b border-gray-200 px-6 py-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="animate-on-scroll">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">
                Manage your travel platform with ease. Monitor users, tours, gallery, and blog content.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
