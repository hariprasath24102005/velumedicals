import React, { useState, useMemo } from 'react';
import { Medicine, Category } from '../types';
import MedicineCard from './MedicineCard';
import { Search, Tablet, Droplet, Pill, Syringe, Salad, Truck, ShieldCheck, Clock } from 'lucide-react';

interface MedicineListProps {
  medicines: Medicine[];
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categories: { name: Category; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Salad className="w-4 h-4" /> },
    { name: 'Tablets', icon: <Tablet className="w-4 h-4" /> },
    { name: 'Syrups', icon: <Droplet className="w-4 h-4" /> },
    { name: 'Capsules', icon: <Pill className="w-4 h-4" /> },
    { name: 'Injections', icon: <Syringe className="w-4 h-4" /> },
    { name: 'Topical', icon: <Droplet className="w-4 h-4" /> },
  ];

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchTerm, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-teal-700 text-white overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Velu Medicals <span className="text-teal-200">& Generals</span>
          </h1>
          <p className="text-teal-100 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Your trusted neighborhood pharmacy. Genuine medicines delivered with care.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for medicines (e.g., Paracetamol, Vitamin C)..."
              className="block w-full pl-14 pr-6 py-5 rounded-full text-gray-900 shadow-2xl focus:ring-4 focus:ring-teal-400 focus:outline-none text-lg transition-shadow placeholder-gray-400 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 text-gray-600 text-sm font-medium">
              <div className="flex items-center space-x-2">
                  <div className="p-2 bg-teal-50 rounded-full text-teal-600"><Truck className="w-5 h-5" /></div>
                  <span>Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                  <div className="p-2 bg-teal-50 rounded-full text-teal-600"><ShieldCheck className="w-5 h-5" /></div>
                  <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center space-x-2">
                  <div className="p-2 bg-teal-50 rounded-full text-teal-600"><Clock className="w-5 h-5" /></div>
                  <span>Available 24/7</span>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Categories */}
        <div className="mb-10">
             <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Browse by Category</h2>
             <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                        selectedCategory === cat.name
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50'
                    }`}
                    >
                    {cat.icon}
                    <span>{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Product Grid */}
        <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {selectedCategory === 'All' ? 'Popular Medicines' : `${selectedCategory}`}
            </h2>
            <span className="text-gray-500 font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">{filteredMedicines.length} items</span>
        </div>

        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((medicine) => (
              <MedicineCard 
                key={medicine.id} 
                medicine={medicine} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 mx-auto max-w-lg text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-500">We couldn't find matches for "{searchTerm}".<br/>Try checking for typos or use a broader category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;