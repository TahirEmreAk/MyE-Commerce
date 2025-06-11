// src/pages/ShopPage.jsx
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/common/ProductCard';
import { fetchProducts, setOffset, setProductFilter, setProductSort } from '../store/actions/productActions';

export default function ShopPage() {
  const dispatch = useDispatch();
  const { products, total, limit, offset, loading, error, filterText, sort } = useSelector(state => state.product);
  const [internalFilterText, setInternalFilterText] = useState(filterText);

  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, limit, offset, sort, filterText]);

  const handlePageChange = (pageNumber) => {
    dispatch(setOffset((pageNumber - 1) * limit));
  };

  const handleFilterChange = (e) => {
    setInternalFilterText(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(setProductFilter(internalFilterText));
      dispatch(setOffset(0)); // Filtre değiştiğinde sayfayı başa sar
    }
  };

  const handleSortChange = (e) => {
    dispatch(setProductSort(e.target.value));
    dispatch(setOffset(0)); // Sıralama değiştiğinde sayfayı başa sar
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-red-500">
        <p>Ürünler yüklenirken bir hata oluştu: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filtreleme ve Sıralama */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={internalFilterText}
            onChange={handleFilterChange}
            onKeyPress={handleFilterSubmit}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            <Filter size={18} />
            <span>Ara</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sırala:</span>
          <select
            onChange={handleSortChange}
            value={sort}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Varsayılan</option>
            <option value="price:asc">Fiyata Göre Artan</option>
            <option value="price:desc">Fiyata Göre Azalan</option>
            <option value="rating:desc">Popülerliğe Göre</option>
          </select>
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
          {pages.map(page => (
            <button 
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                offset / limit + 1 === page ? 'bg-blue-500 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}