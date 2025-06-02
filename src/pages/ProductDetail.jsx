import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('blue');

  // Örnek ürün verisi
  const product = {
    id: id,
    name: 'Floating Phone',
    price: 1159.33,
    rating: 4,
    reviews: 10,
    availability: 'In Stock',
    description: 'Mat minim Mollie non desert Alamo est sit cliquey dolor cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial Consequent sent occaecat met.',
    colors: ['#40BFFF', '#FB7181', '#FFC833', '#23262F'],
    images: [
      'https://via.placeholder.com/600x600/FFE817/000000?text=Product+1',
      'https://via.placeholder.com/600x600/FFE817/000000?text=Product+2',
      'https://via.placeholder.com/600x600/FFE817/000000?text=Product+3'
    ]
  };

  // Bestseller ürünleri
  const bestsellerProducts = [
    {
      id: 1,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://via.placeholder.com/300x300'
    },
    // ... diğer ürünler
  ];

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
            <div className="relative aspect-square">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Küçük Görseller */}
            <div className="flex gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-24 aspect-square rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {/* Değerlendirme */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.reviews} Reviews)</span>
            </div>

            {/* Fiyat */}
            <div className="text-3xl font-bold text-blue-500">
              ${product.price.toFixed(2)}
            </div>

            {/* Stok Durumu */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Availability:</span>
              <span className="text-green-500">{product.availability}</span>
            </div>

            {/* Renk Seçenekleri */}
            <div className="space-y-3">
              <h3 className="font-medium">Select Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">
                Select Options
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                <Eye size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex border-b">
            {['Description', 'Additional Information', 'Reviews (0)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-4 px-6 font-medium ${
                  activeTab === tab.toLowerCase()
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
            {activeTab === 'additional information' && (
              <div className="prose max-w-none">
                <p>Additional product information goes here...</p>
              </div>
            )}
            {activeTab === 'reviews (0)' && (
              <div className="prose max-w-none">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bestseller Products */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">BESTSELLER PRODUCTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellerProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.department}</p>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">${product.salePrice}</span>
                  <span className="text-gray-400 line-through">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
