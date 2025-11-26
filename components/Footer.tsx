import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Velu Medicals & Generals</h3>
            <p className="text-slate-400">
              Your trusted partner in health. Genuine medicines delivered with care.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <p className="text-slate-400 mb-2">NANTHAVANAPATTY, DINDIGUL - 624005</p>
            <a 
              href="mailto:dharshikapharma@gmail.com"
              className="text-slate-400 hover:text-white transition-colors block"
            >
              dharshikapharma@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; 2025 Velu Medicals. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Made by Hari Prasath</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;