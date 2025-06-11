import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, setProductCategoryId, setProductSort, setProductFilter, setOffset } from '../store/actions/productActions';
import ProductCard from '../components/common/ProductCard';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const ShoppingPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, total, filterText: reduxFilterText, limit, offset } = useSelector(state => state.product);
  const { categoryId } = useParams();

  const [sortOption, setSortOption] = useState('');
  const [localFilterText, setLocalFilterText] = useState(reduxFilterText);

  const totalPages = Math.ceil(total / limit);
  const currentPage = (offset / limit) + 1;

  useEffect(() => {
    if (categoryId) {
      dispatch(setProductCategoryId(categoryId));
    } else {
      dispatch(setProductCategoryId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    dispatch(setProductSort(sortOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  useEffect(() => {
    setLocalFilterText(reduxFilterText);
  }, [reduxFilterText]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, categoryId, sortOption, reduxFilterText, limit, offset]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setOffset(offset - limit));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setOffset(offset + limit));
    }
  };

  const handlePageClick = (pageNumber) => {
    dispatch(setOffset((pageNumber - 1) * limit));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <div className="flex gap-4">
          <select
            className="border p-2 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sıralama Seçiniz</option>
            <option value="price:asc">Fiyata Göre Artan</option>
            <option value="price:desc">Fiyata Göre Azalan</option>
            <option value="rating:asc">Puana Göre Artan</option>
            <option value="rating:desc">Puana Göre Azalan</option>
          </select>
          <input
            type="text"
            placeholder="Filtrele..."
            className="border p-2 rounded"
            value={localFilterText}
            onChange={(e) => setLocalFilterText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch(setProductFilter(e.target.value));
              }
            }}
          />
        </div>
        <p className="text-gray-600">Toplam {total} ürün</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Önceki
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingPage; 