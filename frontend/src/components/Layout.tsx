import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, KeyRound, User as UserIcon } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white selection:bg-indigo-500/30">
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
               <span className="font-mono text-sm leading-none">OUI</span>
            </div>
            OpenUI
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
               <Home className="w-4 h-4" /> Components
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                 <KeyRound className="w-4 h-4" /> Admin
              </Link>
            )}
            <div className="h-4 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-sm font-medium border border-zinc-700">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={logout}
                className="text-sm text-zinc-400 hover:text-red-400 transition-colors p-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
