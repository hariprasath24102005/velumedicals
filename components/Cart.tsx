import React from 'react';
import { CartItem } from '../types';
import { Trash2, MessageCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove, onUpdateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    // Updated Phone Number
    const phoneNumber = "9363115217"; 
    
    let message = "Hello Velu Medicals and Generals, I need these products:%0A%0A";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    
    message += `%0A*Total Order Value: $${total.toFixed(2)}*`;
    message += "%0A%0APlease let me know when these will be ready.";

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-teal-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-lg">Add items to your cart to checkout via WhatsApp.</p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors font-bold shadow-lg shadow-teal-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Shopping Cart</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="divide-y divide-gray-100">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-xl bg-gray-100 shadow-sm border border-gray-100"
              />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-teal-600 font-medium text-sm bg-teal-50 inline-block px-2 py-1 rounded-md mt-1">{item.category}</p>
                <div className="text-gray-900 font-bold mt-2 text-lg">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-l-xl font-bold hover:text-teal-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-gray-900 w-8 text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-r-xl font-bold hover:text-teal-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-teal-600 font-medium flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Add More Medicines
          </Link>
          <div className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="text-gray-500 text-lg mr-2 font-medium">Total:</span> 
            <span className="text-teal-700">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleWhatsAppCheckout}
          className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 transition-all hover:-translate-y-1"
        >
          <MessageCircle className="w-6 h-6" />
          <span>Checkout via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;