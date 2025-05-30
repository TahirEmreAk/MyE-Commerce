import React from 'react';

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ürünler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Ürün kartları buraya gelecek */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="aspect-w-1 aspect-h-1 w-full mb-4">
            <img
              src="https://via.placeholder.com/300"
              alt="Ürün"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">Örnek Ürün</h2>
          <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary-600">₺199.99</span>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
