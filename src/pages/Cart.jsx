import React from 'react';

const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Ürün"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="font-semibold">Örnek Ürün</h2>
                  <p className="text-gray-600">Kategori: Elektronik</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button className="px-3 py-1 hover:bg-gray-100">-</button>
                  <span className="px-4 py-1 border-x">1</span>
                  <button className="px-3 py-1 hover:bg-gray-100">+</button>
                </div>
                <span className="font-semibold">₺199.99</span>
                <button className="text-red-500 hover:text-red-700">
                  <span className="sr-only">Sil</span>
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sepet Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ara Toplam</span>
              <span>₺199.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Kargo</span>
              <span>₺29.99</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Toplam</span>
                <span className="font-semibold">₺229.98</span>
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
