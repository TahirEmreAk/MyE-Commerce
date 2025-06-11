import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopCategories = () => {
  const { categories } = useSelector(state => state.categories);

  // Tüm kategorileri birleştir ve rating'e göre sırala
  const allCategories = [...(categories.kadin || []), ...(categories.erkek || [])]
    .filter(category => category && category.name) // Geçerli kategori ve name kontrolü
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#252B42] mb-8">
          Popüler Kategoriler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {allCategories.map((category) => {
            const gender = category.gender === 'k' ? 'kadin' : 'erkek';
            const categoryName = category.name.toLowerCase();
            return (
              <Link
                key={category.id}
                to={`/shop/${gender}/${categoryName}/${category.id}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={category.image || `https://via.placeholder.com/300x300?text=${category.name}`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories; 