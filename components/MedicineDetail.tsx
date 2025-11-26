import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShoppingCart } from 'lucide-react';
import { Medicine } from '../types';
import { searchMedicineInfo } from '../services/geminiService';
import GeminiInfo from './GeminiInfo';
import { GroundingChunk } from '../types';

interface MedicineDetailProps {
  medicines: Medicine[];
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({ medicines, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const medicine = medicines.find((m) => m.id === id);
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [aiSources, setAiSources] = useState<GroundingChunk[] | undefined>([]);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!medicine) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Back to Store</Link>
      </div>
    );
  }

  const handleAiSearch = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await searchMedicineInfo(medicine.name);
      setAiContent(response.text);
      setAiSources(response.groundingChunks);
    } catch (err) {
      setAiError("Unable to fetch AI insights at this time.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Medicines
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
             <img 
               src={medicine.image} 
               alt={medicine.name} 
               className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
             />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {medicine.category}
              </span>
              {medicine.inStock && (
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  In Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {medicine.name}
            </h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {medicine.description}
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
               <h3 className="font-semibold text-gray-900 mb-2">Recommended Dosage</h3>
               <p className="text-gray-600">{medicine.dosage}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Price</span>
                <span className="text-4xl font-bold text-gray-900">${medicine.price.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => onAddToCart(medicine)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* AI Integration Section */}
            <GeminiInfo 
              loading={aiLoading}
              content={aiContent}
              sources={aiSources}
              error={aiError}
              onSearch={handleAiSearch}
              medicineName={medicine.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
