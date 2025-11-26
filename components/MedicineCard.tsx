import React from 'react';
import { Link } from 'react-router-dom';
import { Medicine } from '../types';
import { Plus } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300 flex flex-col overflow-hidden relative">
      <Link to={`/medicine/${medicine.id}`} className="block relative overflow-hidden aspect-[4/3] bg-gray-50">
        <img 
          src={medicine.image} 
          alt={medicine.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
            <span className="bg-white/95 backdrop-blur-sm text-teal-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-teal-50">
                {medicine.category}
            </span>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/medicine/${medicine.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-1 tracking-tight">
            {medicine.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 h-10 leading-relaxed">
            {medicine.shortDescription}
          </p>
        </Link>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase">Price</span>
            <span className="text-xl font-bold text-gray-900">
                ${medicine.price.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={() => onAddToCart(medicine)}
            className="flex items-center space-x-1 bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;