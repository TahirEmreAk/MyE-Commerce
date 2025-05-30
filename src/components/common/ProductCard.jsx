import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                </Link>
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                    <Heart size={18} className="text-gray-400" />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.id}`} className="font-medium hover:text-blue-500">
                        {product.name}
                    </Link>
                    <span className="font-bold">${product.price}</span>
                </div>

                <div className="flex items-center mb-3">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                fill={i < product.rating ? "#fbbf24" : "none"}
                                className="text-yellow-400"
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <button className="mt-auto w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}