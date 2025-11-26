import React, { useState } from 'react';
import { Medicine } from '../types';
import { Trash2, Edit, Plus, X, Save, LogOut, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  medicines: Medicine[];
  onAdd: (medicine: Medicine) => void;
  onUpdate: (medicine: Medicine) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ medicines, onAdd, onUpdate, onDelete }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<Partial<Medicine>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Strict password check for VELU@123
    if (password === 'VELU@123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentMedicine({});
  };

  const handleEditClick = (medicine: Medicine) => {
    setCurrentMedicine(medicine);
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setCurrentMedicine({
      id: Date.now().toString(),
      inStock: true,
      category: 'Tablets',
      image: 'https://picsum.photos/400/400'
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMedicine.name || !currentMedicine.price) return;

    // Ensure all required fields have some value
    const medicineToSave = {
        ...currentMedicine,
        price: Number(currentMedicine.price),
        shortDescription: currentMedicine.shortDescription || '',
        description: currentMedicine.description || '',
        dosage: currentMedicine.dosage || 'Consult your doctor',
        image: currentMedicine.image || 'https://picsum.photos/400/400',
    } as Medicine;

    const exists = medicines.find(m => m.id === medicineToSave.id);
    if (exists) {
      onUpdate(medicineToSave);
    } else {
      onAdd(medicineToSave);
    }
    resetForm();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-4 rounded-full">
                <ShieldCheck className="w-10 h-10 text-teal-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Admin Login</h2>
          <p className="text-gray-500 text-center mb-8">Velu Medicals & Generals</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            {loginError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
                    {loginError}
                </div>
            )}
            <button 
              type="submit"
              className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage inventory for Velu Medicals</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">
                    {medicines.find(m => m.id === currentMedicine.id) ? 'Edit Medicine' : 'Add New Medicine'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
                        value={currentMedicine.name || ''}
                        onChange={e => setCurrentMedicine({...currentMedicine, name: e.target.value})}
                        placeholder="e.g. Paracetamol 500mg"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all bg-white"
                        value={currentMedicine.category || 'Tablets'}
                        onChange={e => setCurrentMedicine({...currentMedicine, category: e.target.value})}
                    >
                        {['Tablets', 'Syrups', 'Capsules', 'Injections', 'Topical'].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                    <input 
                        type="number" 
                        step="0.01"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
                        value={currentMedicine.price || ''}
                        onChange={e => setCurrentMedicine({...currentMedicine, price: parseFloat(e.target.value)})}
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
                        value={currentMedicine.image || ''}
                        onChange={e => setCurrentMedicine({...currentMedicine, image: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
                        value={currentMedicine.shortDescription || ''}
                        onChange={e => setCurrentMedicine({...currentMedicine, shortDescription: e.target.value})}
                        placeholder="Brief summary for list view"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Description</label>
                    <textarea 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all h-32"
                        value={currentMedicine.description || ''}
                        onChange={e => setCurrentMedicine({...currentMedicine, description: e.target.value})}
                        placeholder="Detailed information about the medicine"
                    />
                </div>

                <div className="col-span-1 md:col-span-2 flex gap-4">
                    <button 
                        type="button"
                        onClick={resetForm}
                        className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors flex justify-center items-center space-x-2 shadow-lg shadow-teal-100"
                    >
                        <Save className="w-5 h-5" />
                        <span>Save Product</span>
                    </button>
                </div>
            </form>
        </div>
      ) : (
        <button 
          onClick={handleAddNewClick}
          className="mb-8 flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-teal-100 hover:scale-105"
        >
          <Plus className="w-6 h-6" />
          <span>Add New Medicine</span>
        </button>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Product</th>
                    <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Category</th>
                    <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Price</th>
                    <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider text-right">Manage</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {medicines.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-8 py-5">
                            <div className="flex items-center space-x-4">
                                <img src={medicine.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100 shadow-sm" />
                                <span className="font-bold text-gray-900 text-lg">{medicine.name}</span>
                            </div>
                        </td>
                        <td className="px-8 py-5">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                                {medicine.category}
                            </span>
                        </td>
                        <td className="px-8 py-5 font-bold text-gray-900 text-lg">${medicine.price.toFixed(2)}</td>
                        <td className="px-8 py-5 text-right">
                            <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleEditClick(medicine)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                    title="Edit"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => onDelete(medicine.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                    title="Delete"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {medicines.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-8 py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 p-4 rounded-full mb-3">
                                    <Plus className="w-6 h-6 text-gray-400" />
                                </div>
                                <p>Inventory is empty.</p>
                                <p className="text-sm mt-1">Click "Add New Medicine" to start.</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;