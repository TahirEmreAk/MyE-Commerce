import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${product.id}`} className="block relative">
                <img
                    src={product.image || 'https://via.placeholder.com/300x300'}
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
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
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