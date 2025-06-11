import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, setProductCategoryId, setProductSort, setProductFilter } from '../store/actions/productActions';
import ProductCard from '../components/common/ProductCard';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const ShoppingPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, total, filterText: reduxFilterText } = useSelector(state => state.product);
  const { categoryId } = useParams();

  const [sortOption, setSortOption] = useState('');
  const [localFilterText, setLocalFilterText] = useState(reduxFilterText);

  useEffect(() => {
    // URL'den gelen categoryId varsa Redux state'ini güncelle
    if (categoryId) {
      dispatch(setProductCategoryId(categoryId));
    } else {
      // categoryId URL'den gelmiyorsa Redux state'indeki categoryId'yi sıfırla
      dispatch(setProductCategoryId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    dispatch(setProductSort(sortOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  useEffect(() => {
    // Redux state'indeki filterText değiştiğinde yerel state'i güncelle
    setLocalFilterText(reduxFilterText);
  }, [reduxFilterText]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, categoryId, sortOption, reduxFilterText]);

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
    </div>
  );
};

export default ShoppingPage; 