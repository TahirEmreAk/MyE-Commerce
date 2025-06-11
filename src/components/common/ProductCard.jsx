import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
    // Ürünün ilk resmini al, yoksa placeholder kullan
    const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].url 
        : 'https://via.placeholder.com/300x300';

    const { categories } = useSelector(state => state.categories);

    let categoryName = 'unknown-category';
    let gender = 'unknown-gender';
    const categoryId = product.category_id;

    if (categories && product.category_id) {
        const allCategories = [...(categories.kadin || []), ...(categories.erkek || [])];
        const foundCategory = allCategories.find(cat => cat.id === product.category_id);
        if (foundCategory) {
            categoryName = foundCategory.title.toLowerCase();
            gender = foundCategory.gender === 'k' ? 'kadin' : 'erkek';
        }
    }

    const slugify = (text) => {
        return text
            .toString()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    const productNameSlug = slugify(product.name);

    const productDetailUrl = `/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`;

    console.log("Product in ProductCard: ", product);
    console.log("Generated Product Detail URL: ", productDetailUrl);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={productDetailUrl} className="block relative cursor-pointer hover:shadow-lg transition-shadow duration-200">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
                {product.discount_percentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                        %{product.discount_percentage} İndirim
                    </span>
                )}
            </Link>

            <div className="p-4">
                <Link to={productDetailUrl} className="block">
                    <div className="text-sm text-gray-500 mb-1">
                        {product.category ? product.category.title : 'Category Name Placeholder'}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">English Department</p>
                </Link>
                
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {product.discount_percentage > 0 ? (
                            <>
                                <span className="text-red-500 font-bold text-lg">
                                    {product.discounted_price} TL
                                </span>
                                <span className="text-gray-400 line-through text-sm ml-2">
                                    {product.price} TL
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-800 font-bold text-lg">
                                {product.price} TL
                            </span>
                        )}
                    </div>
                    
                    <div className="flex space-x-2">
                        <button className="p-2 hover:text-blue-500 transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="p-2 hover:text-blue-500 transition-colors">
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    {product.stock > 0 ? (
                        <span className="text-green-500">Stokta</span>
                    ) : (
                        <span className="text-red-500">Tükendi</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;