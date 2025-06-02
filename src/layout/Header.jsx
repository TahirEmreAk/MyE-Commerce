import { Menu, ShoppingCart, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <Menu size={24} />
                </button>
                <Link to="/" className="text-xl font-bold">
                    E-Commerce
                </Link>
                <nav className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-[#737373] hover:text-[#252B42]">Ana Sayfa</Link>
                    <Link to="/shop" className="text-[#737373] hover:text-[#252B42]">Mağaza</Link>
                    <Link to="/products" className="text-[#737373] hover:text-[#252B42]">Ürünler</Link>
                    <Link to="/team" className="text-[#737373] hover:text-[#252B42]">Takım</Link>
                    <Link to="/contact" className="text-[#737373] hover:text-[#252B42]">İletişim</Link>
                </nav>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="relative flex w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-[#23A6F0] text-white rounded-r-lg hover:bg-[#2A7CC7]">
                        <Search size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative">
                    <ShoppingCart size={24} className="text-[#252B42]" />
                    <span className="absolute -top-2 -right-2 bg-[#E51F5A] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        0
                    </span>
                </Link>
                <button>
                    <User size={24} className="text-[#252B42]" />
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden fixed top-[64px] left-0 right-0 bg-white shadow-lg p-4 z-50">
                    <Link 
                        to="/" 
                        className="block py-2 text-[#737373] hover:text-[#252B42]"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Ana Sayfa
                    </Link>
                    <Link 
                        to="/shop" 
                        className="block py-2 text-[#737373] hover:text-[#252B42]"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Mağaza
                    </Link>
                    <Link 
                        to="/products" 
                        className="block py-2 text-[#737373] hover:text-[#252B42]"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Ürünler
                    </Link>
                    <Link 
                        to="/team" 
                        className="block py-2 text-[#737373] hover:text-[#252B42]"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Takım
                    </Link>
                    <Link 
                        to="/contact" 
                        className="block py-2 text-[#737373] hover:text-[#252B42]"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        İletişim
                    </Link>
                </div>
            )}
        </header>
    );
}