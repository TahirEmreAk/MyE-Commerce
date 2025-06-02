// src/pages/ShopPage.jsx
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      rating: 4,
      reviews: 124,
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      rating: 5,
      reviews: 89,
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 149.99,
      rating: 4,
      reviews: 156,
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 4,
      name: 'Wireless Earbuds',
      price: 79.99,
      rating: 4,
      reviews: 234,
      image: 'https://via.placeholder.com/300'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filtreleme ve Sıralama */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <Filter size={18} />
          <span>Filter</span>
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort by:</span>
          <button className="flex items-center gap-1 px-4 py-2 border rounded-lg">
            <span>Featured</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sayfalama */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(page => (
            <button 
              key={page}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                page === 1 ? 'bg-blue-500 text-white' : 'border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <ChevronDown size={16} className="rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}