import React from 'react';

const ProductDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün Görseli */}
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src="https://via.placeholder.com/600"
            alt="Ürün"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Ürün Bilgileri */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Ürün Adı</h1>
          <div className="text-2xl font-bold text-primary-600 mb-4">₺199.99</div>
          
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Miktar Seçici */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Miktar:</label>
            <div className="flex items-center border rounded-lg">
              <button className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 border-x">1</span>
              <button className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
          </div>

          {/* Sepete Ekle Butonu */}
          <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
