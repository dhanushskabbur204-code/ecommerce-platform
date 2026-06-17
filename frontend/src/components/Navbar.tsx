import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Shield, Search, Store, Calculator } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
            <Store className="w-6 h-6" />
            ShopEase
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Link to="/emi-calculator" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">EMI Calculator</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Cart</span>
                </Link>
                <Link to="/orders" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <Package className="w-5 h-5" />
                  <span className="hidden sm:inline">Orders</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                    <Shield className="w-5 h-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.username}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="hover:text-emerald-400 transition-colors">Login</Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
