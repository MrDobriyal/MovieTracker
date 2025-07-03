import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useRouter();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) return null;

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link href="/movies" className="text-2xl font-bold text-red-600">
              MovieTracker
            </Link>
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-4">
              <Link
                href="/movies"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/movies') ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                Browse Movies
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/selectMovies"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/selectMovies') ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    Select Movies
                  </Link>
                  <Link
                    href="/watched"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/watched') ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    My Watched
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-gray-300">Welcome, {user?.email}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:bg-gray-800 hidden md:flex"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  location.push('/login');
                }}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-800 hidden md:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link
              href="/movies"
              className="block px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
            >
              Browse Movies
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/selectMovies"
                  className="block px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
                >
                  Select Movies
                </Link>
                <Link
                  href="/watched"
                  className="block px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700"
                >
                  My Watched
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="w-full text-black border-gray-600 hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  location.push('/login');
                }}
                variant="outline"
                size="sm"
                className="w-full text-black border-gray-600 hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log In
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
