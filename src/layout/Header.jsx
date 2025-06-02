import { Menu, ShoppingCart, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <button className="md:hidden">
                    <Menu size={24} />
                </button>
                <Link to="/" className="text-xl font-bold">
                    E-Commerce
                </Link>
                <nav className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">Ana Sayfa</Link>
                    <Link to="/shop" className="text-gray-600 hover:text-gray-900">Mağaza</Link>
                    <Link to="/products" className="text-gray-600 hover:text-gray-900">Ürünler</Link>
                </nav>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="relative flex w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
                        <Search size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                    <ShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        0
                    </span>
                </Link>
                <button>
                    <User size={24} />
                </button>
            </div>
        </header>
    );
}