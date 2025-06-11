import React, { useEffect } from 'react';
import { Menu, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/userActions';
import { fetchCategories } from '../store/actions/categoryActions';
import CategoryMenu from '../components/CategoryMenu';

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated } = useSelector(state => state.user);
    const { categories } = useSelector(state => state.categories);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

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
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={currentUser.gravatarUrl}
                                        alt={currentUser.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-[#252B42]">{currentUser.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-[#23A6F0] hover:text-[#2A7CC7] flex items-center"
                                >
                                    <LogOut size={20} className="mr-1" />
                                    Çıkış
                                </button>
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
                        <Link to="/cart" className="text-[#23A6F0] hover:text-[#2A7CC7]">
                            <ShoppingCart size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;