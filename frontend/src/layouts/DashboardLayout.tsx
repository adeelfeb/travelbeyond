import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiMap,
  FiImage,
  FiBook,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardLayout = ({ children, activeSection, onSectionChange }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FiHome className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <FiUsers className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'tours',
      label: 'Tours & Packages',
      icon: <FiMap className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'gallery',
      label: 'Gallery Management',
      icon: <FiImage className="w-5 h-5" />,
      color: 'orange'
    },
    {
      id: 'blog',
      label: 'Blog Management',
      icon: <FiBook className="w-5 h-5" />,
      color: 'indigo'
    }
  ];


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  const getNavItemClasses = (color: string, isActive: boolean) => {
    const baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium";
    
    if (isActive) {
      const activeClasses = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        purple: "bg-purple-100 text-purple-700",
        orange: "bg-orange-100 text-orange-700",
        indigo: "bg-indigo-100 text-indigo-700",
        emerald: "bg-emerald-100 text-emerald-700",
        gray: "bg-gray-100 text-gray-700"
      };
      return `${baseClasses} ${activeClasses[color as keyof typeof activeClasses]}`;
    }

    const hoverClasses = {
      blue: "hover:bg-blue-50 hover:text-blue-700",
      green: "hover:bg-green-50 hover:text-green-700",
      purple: "hover:bg-purple-50 hover:text-purple-700",
      orange: "hover:bg-orange-50 hover:text-orange-700",
      indigo: "hover:bg-indigo-50 hover:text-indigo-700",
      emerald: "hover:bg-emerald-50 hover:text-emerald-700",
      gray: "hover:bg-gray-50 hover:text-gray-700"
    };

    return `${baseClasses} text-gray-600 ${hoverClasses[color as keyof typeof hoverClasses]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Travel Beyond Tours</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex! items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={getNavItemClasses(item.color, activeSection === item.id)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* User Info and Logout */}
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">A</span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@travelbeyondtours.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                {/* Mobile User Section */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@travelbeyondtours.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
