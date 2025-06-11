import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseCartItem, decreaseCartItem, removeFromCart } from '../store/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.count, 0);
  };

  const subtotal = calculateSubtotal();
  
  let shippingCost = 29.99; // Varsayılan kargo ücreti
  if (subtotal >= 500) {
    shippingCost = 0; // 500 TL üzeri siparişlerde kargo bedava
  }

  let discountPercentage = 0;
  if (subtotal >= 3000) {
    discountPercentage = 0.10; // 3000 TL üzeri %10 indirim
  } else if (subtotal >= 2000) {
    discountPercentage = 0.07; // 2000 TL üzeri %7 indirim
  } else if (subtotal >= 1000) {
    discountPercentage = 0.05; // 1000 TL üzeri %5 indirim
  }

  const discountAmount = subtotal * discountPercentage;
  const total = subtotal - discountAmount + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">Sepetinizde ürün bulunmamaktadır.</p>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100?text=No+Image'}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h2 className="font-semibold">{item.product.name}</h2>
                      <p className="text-gray-600">Adet: {item.count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => dispatch(decreaseCartItem(item.product.id))}
                        className="px-3 py-1 hover:bg-gray-100" disabled={item.count === 1}>-
                      </button>
                      <span className="px-4 py-1 border-x">{item.count}</span>
                      <button 
                        onClick={() => dispatch(increaseCartItem(item.product.id))}
                        className="px-3 py-1 hover:bg-gray-100">+
                      </button>
                    </div>
                    <span className="font-semibold">₺{(item.product.price * item.count).toFixed(2)}</span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-red-500 hover:text-red-700">
                      <span className="sr-only">Sil</span>
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sepet Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ara Toplam</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-semibold">
                <span>İndirim ({(discountPercentage * 100).toFixed(0)}%)</span>
                <span>-₺{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Kargo</span>
              <span>{shippingCost === 0 ? 'Bedava' : `₺${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Toplam</span>
                <span className="font-semibold">₺{total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                Ödemeye Geç
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
