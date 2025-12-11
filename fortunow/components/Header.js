// components/Header.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Home, BarChart3, Trophy } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Header({ user }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FortuNow</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive('/dashboard')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              Accueil
            </Link>

            <Link
              href="/markets"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive('/markets')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Marchés
            </Link>

            <Link
              href="/leaderboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive('/leaderboard')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-5 h-5" />
              Classement
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user && <NotificationBell userId={user.id} />}
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name || user?.email}</p>
              <p className="text-xs text-gray-600">Actif</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
