import React from 'react';
import { ShoppingCart, Stethoscope, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 text-teal-800 hover:text-teal-900 transition-colors group">
          <div className="bg-teal-600 text-white p-2.5 rounded-xl shadow-lg shadow-teal-100 group-hover:bg-teal-700 transition-colors">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">Velu Medicals</span>
            <span className="text-xs text-teal-600 font-bold tracking-widest uppercase mt-0.5">& Generals</span>
          </div>
        </Link>

        {/* Navigation / Actions */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          <Link 
            to="/admin" 
            className="flex items-center space-x-1.5 text-gray-500 hover:text-teal-700 font-semibold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Admin Access</span>
          </Link>

           {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors group bg-gray-50 hover:bg-teal-50 px-4 py-2 rounded-xl border border-transparent hover:border-teal-100">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold text-sm hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;