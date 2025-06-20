import React, { useEffect, useState, useRef } from 'react';
import { Menu, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/userActions';
import { fetchCategories } from '../store/actions/categoryActions';
import CategoryMenu from '../components/CategoryMenu';

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    const { categories } = useSelector(state => state.categories);
    const { cart } = useSelector(state => state.cart);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        }
        if (userDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userDropdownOpen]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const totalCartItems = cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-[#252B42] text-white py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                <span>(225) 555-0118</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={16} className="mr-2" />
                                <span>michelle.rivera@example.com</span>
                            </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <p>Follow Us and get a chance to win 80% off</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 md:mt-0">
                            <span>Follow Us :</span>
                            <Instagram size={16} />
                            <Youtube size={16} />
                            <Facebook size={16} />
                            <Twitter size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-[#252B42]">
                        Bandage
                    </Link>

                    <nav className="mt-4 md:mt-0">
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <Link to="/" className="text-[#737373] hover:text-[#252B42]">
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li>
                                <CategoryMenu title="Kadın" categories={categories.kadin || []} />
                            </li>
                            <li>
                                <CategoryMenu title="Erkek" categories={categories.erkek || []} />
                            </li>
                            <li>
                                <Link to="/about" className="text-[#737373] hover:text-[#252B42]">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-[#737373] hover:text-[#252B42]">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link to="/team" className="text-[#737373] hover:text-[#252B42]">
                                    Takım
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        {isAuthenticated ? (
                            <>
                                <div className="relative flex items-center space-x-2" ref={userDropdownRef}>
                                    <img
                                        src={currentUser.gravatarUrl}
                                        alt={currentUser.name}
                                        className="w-8 h-8 rounded-full cursor-pointer"
                                        onClick={() => setUserDropdownOpen((open) => !open)}
                                    />
                                    <span className="text-[#252B42] cursor-pointer" onClick={() => setUserDropdownOpen((open) => !open)}>{currentUser.name}</span>
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[180px]">
                                            <Link to="/previous-orders" className="block px-4 py-2 text-[#252B42] hover:bg-gray-100" onClick={() => setUserDropdownOpen(false)}>Önceki Siparişlerim</Link>
                                            <button
                                                onClick={() => { setUserDropdownOpen(false); handleLogout(); }}
                                                className="w-full text-left px-4 py-2 text-[#23A6F0] hover:bg-gray-100 flex items-center"
                                            >
                                                <LogOut size={20} className="mr-1" />Çıkış
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-[#23A6F0] hover:text-[#2A7CC7]">
                                    Giriş Yap
                                </Link>
                                <Link to="/signup" className="text-[#23A6F0] hover:text-[#2A7CC7]">
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                        <div 
                            className="relative"
                            onMouseEnter={() => setCartDropdownOpen(true)}
                            onMouseLeave={() => setCartDropdownOpen(false)}
                        >
                            <Link to="/cart" className="text-[#23A6F0] hover:text-[#2A7CC7] flex items-center">
                                <ShoppingCart size={20} />
                                <span className="ml-1 font-bold text-red-500">{totalCartItems}</span>
                            </Link>
                            {cartDropdownOpen && ( 
                                <div 
                                    className="absolute right-0 top-full w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4"
                                >
                                    <h3 className="font-bold text-lg mb-3">Sepetim ({totalCartItems} Ürün)</h3>
                                    {cart.length === 0 ? (
                                        <p className="text-gray-600">Sepetiniz boş.</p>
                                    ) : (
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                            {cart.map(item => (
                                                <div key={item.product.id} className="flex items-center gap-3 pb-3 border-b last:border-b-0">
                                                    <img 
                                                        src={item.product.images?.[0]?.url || 'https://via.placeholder.com/60x60?text=No+Image'}
                                                        alt={item.product.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-800">{item.product.name}</p>
                                                        <p className="text-sm text-gray-600">Adet: {item.count}</p>
                                                        <p className="text-base font-bold text-blue-600">${item.product.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {cart.length > 0 && (
                                        <div className="mt-4 flex justify-between gap-2">
                                            <Link to="/cart" className="flex-1 text-center bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium">
                                                Sepete Git
                                            </Link>
                                            <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium">
                                                Siparişi Tamamla
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;