import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Eye, ChevronLeft, ChevronRight, Loader2, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, fetchProducts } from '../store/actions/productActions';
import ProductCard from '../components/common/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error, products: bestsellerProducts } = useSelector(state => state.product);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
    dispatch(fetchProducts({ limit: 4, sort: 'sell_count:desc' }));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImageIndex(0);
    }
  }, [product]);

  console.log("Bestseller Products in ProductDetail: ", bestsellerProducts);

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
        <p>Ürün yüklenirken bir hata oluştu: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-gray-500">
        <p>Ürün bulunamadı.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1320px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-blue-500">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Ürün Detay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Sol Taraf - Ürün Görselleri */}
          <div className="space-y-4">
            {/* Ana Görsel */}
            <div className="relative aspect-square mb-4">
              <img
                src={product.images[activeImageIndex]?.url || 'https://via.placeholder.com/600x600?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Küçük Görseller */}
            {product.images.length > 0 && (
              <div className="flex gap-4 justify-center md:justify-start">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252B42]">{product.name}</h1>
            
            {/* Değerlendirme */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-[#737373]">({product.sell_count} Reviews)</span>
            </div>

            {/* Fiyat */}
            <div className="text-2xl sm:text-3xl font-bold text-[#252B42] mb-4">
              ${product.price ? product.price.toFixed(2) : 'N/A'}
            </div>

            {/* Stok Durumu */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#737373] font-semibold">Availability :</span>
              <span className={product.stock > 0 ? "text-[#23A6F0] font-bold" : "text-red-500 font-bold"}>
                {product.stock > 0 ? 'In Stock' : 'Tükendi'}
              </span>
            </div>

            {/* Bölücü Çizgi */}
            <hr className="border-t border-gray-200 my-6" />

            {/* Renk Seçenekleri */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-[#737373]">Colors:</h3>
              <div className="flex gap-2">
                {['#23A6F0', '#238561', '#E77C40', '#252B42'].map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-4 items-center">
              <button className="bg-[#23A6F0] text-white py-3 px-6 rounded-md hover:bg-[#2A7CC7] transition-colors font-bold text-sm">
                Select Options
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                <ShoppingCart size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                <Eye size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex border-b">
            {['Description', 'Additional Information', 'Reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '').replace('(', '').replace(')', ''))}
                className={`py-4 px-6 font-medium ${
                  activeTab === tab.toLowerCase().replace(' ', '').replace('(', '').replace(')', '')
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'additionalinformation' && (
              <div className="prose max-w-none">
                <p>Additional product information goes here...</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="prose max-w-none">
                <p>{product.sell_count} reviews total.</p>
              </div>
            )}
          </div>
        </div>

        {/* Geri Butonu */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 py-2 px-6 rounded hover:bg-gray-300 transition-colors flex items-center justify-center mx-auto"
          >
            <ChevronLeft size={20} className="mr-2" /> Geri Dön
          </button>
        </div>

        {/* Bestseller Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">BESTSELLER PRODUCTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellerProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
