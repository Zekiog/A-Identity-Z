import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon,
  ServerIcon,
  BriefcaseIcon,
  HomeIcon,
  BellIcon,
  CursorArrowRippleIcon
} from '@heroicons/react/24/outline';

// Admin Pages
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Projects from './pages/Projects';
import TranslationManagement from './pages/TranslationManagement';
import AIModels from './pages/AIModels';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Context for authentication
import { useAuth } from './hooks/useAuth';

const navItems = [
  { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/admin/dashboard' },
  { name: 'Users', icon: <UserGroupIcon className="h-5 w-5" />, path: '/admin/users' },
  { name: 'Projects', icon: <BriefcaseIcon className="h-5 w-5" />, path: '/admin/projects' },
  { name: 'Translations', icon: <DocumentTextIcon className="h-5 w-5" />, path: '/admin/translations' },
  { name: 'AI Models', icon: <ServerIcon className="h-5 w-5" />, path: '/admin/ai-models' },
  { name: 'Settings', icon: <Cog6ToothIcon className="h-5 w-5" />, path: '/admin/settings' },
];

const AdminApp = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-neutral-100 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-neutral-dark">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-neutral-dark/80 border-b border-neutral-700">
              <div className="font-display text-xl font-bold text-white">
                <span className="text-primary-400">A-</span>Identity<span className="text-secondary-400">-Z</span>
                <span className="text-xs text-primary-300 ml-1 font-normal">Admin</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white/70 hover:text-white hover:bg-neutral-700/50 transition-colors"
                  >
                    <div className="mr-3 text-white/60 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-neutral-700">
              <button
                onClick={logout}
                className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-white/70 hover:text-white hover:bg-neutral-700/50 transition-colors"
              >
                <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-3 text-white/60" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/31.jpg"
                      alt=""
                    />
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</div>
                      <div className="text-xs text-gray-500">{user?.role || 'Administrator'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/projects" element={<Projects />} />
              <Route path="/admin/translations" element={<TranslationManagement />} />
              <Route path="/admin/ai-models" element={<AIModels />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} />
              <Route path="*" element={<Navigate replace to="/admin/dashboard" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;