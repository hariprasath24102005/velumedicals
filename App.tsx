import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MedicineList from './components/MedicineList';
import MedicineDetail from './components/MedicineDetail';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import { MEDICINES as INITIAL_MEDICINES } from './constants';
import { Medicine, CartItem } from './types';

const App: React.FC = () => {
  // Centralized State
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Logic
  const handleAddToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    setCart((prev) => 
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Admin CRUD Logic
  const handleAddMedicine = (newMedicine: Medicine) => {
    setMedicines([...medicines, newMedicine]);
  };

  const handleUpdateMedicine = (updatedMedicine: Medicine) => {
    setMedicines(medicines.map(m => m.id === updatedMedicine.id ? updatedMedicine : m));
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Header cartCount={cartTotalItems} />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <MedicineList 
                  medicines={medicines} 
                  onAddToCart={handleAddToCart} 
                />
              } 
            />
            <Route 
              path="/medicine/:id" 
              element={
                <MedicineDetail 
                  medicines={medicines} 
                  onAddToCart={handleAddToCart} 
                />
              } 
            />
             <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  onRemove={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateCartQty}
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminDashboard 
                  medicines={medicines}
                  onAdd={handleAddMedicine}
                  onUpdate={handleUpdateMedicine}
                  onDelete={handleDeleteMedicine}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;