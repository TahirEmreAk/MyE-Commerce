import React, { useEffect, useState, useRef } from 'react';
import { Menu, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setUser } from '../store/actions/userActions';
import { fetchCategories } from '../store/actions/categoryActions';
import CategoryMenu from '../components/CategoryMenu';

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser, isAuthenticated, loading } = useSelector(state => state.user);
    const { categories } = useSelector(state => state.categories);
    const { cart } = useSelector(state => state.cart);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);

    // Debug için kullanıcı bilgilerini logla
    useEffect(() => {
        console.log('Header - currentUser:', currentUser);
        console.log('Header - isAuthenticated:', isAuthenticated);
        console.log('Header - loading:', loading);
        
        // Kullanıcı değiştiğinde dropdown'ı kapat
        if (!isAuthenticated || !currentUser) {
            setUserDropdownOpen(false);
        }
        
        // Eğer authenticated ama currentUser yoksa, localStorage'dan almaya çalış
        if (isAuthenticated && !currentUser && !loading) {
            console.log('Header - currentUser eksik, localStorage kontrol ediliyor');
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('Header - localStorage user:', parsedUser);
                    if (parsedUser && parsedUser.name && parsedUser.email) {
                        dispatch(setUser(parsedUser));
                    }
                } catch (error) {
                    console.error('Header - localStorage user parse error:', error);
                }
            }
        }
    }, [currentUser, isAuthenticated, loading, dispatch]);

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
        console.log('Logout çağrıldı');
        dispatch(logoutUser());
    };

    // Avatar renklerini kullanıcı adına göre belirle
    const getAvatarColors = (name) => {
        const colors = [
            'from-blue-400 to-purple-500',
            'from-green-400 to-blue-500',
            'from-purple-400 to-pink-500',
            'from-orange-400 to-red-500',
            'from-teal-400 to-green-500',
            'from-indigo-400 to-purple-500',
            'from-pink-400 to-red-500',
            'from-yellow-400 to-orange-500'
        ];
        
        if (!name || typeof name !== 'string') return colors[0];
        
        // Kullanıcı adının karakterlerinin toplamını al ve renk seç
        const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const colorIndex = charSum % colors.length;
        return colors[colorIndex];
    };

    // Kullanıcı adının ilk harfini güvenli şekilde al
    const getUserInitial = (user) => {
        if (!user || !user.name || typeof user.name !== 'string') return 'U';
        return user.name.charAt(0).toUpperCase();
    };

    // Kullanıcı adını güvenli şekilde al
    const getUserName = (user) => {
        if (!user || !user.name || typeof user.name !== 'string') return 'Kullanıcı';
        return user.name;
    };

    // Kullanıcı email'ini güvenli şekilde al
    const getUserEmail = (user) => {
        if (!user || !user.email || typeof user.email !== 'string') return 'email@example.com';
        return user.email;
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
                        {isAuthenticated && currentUser && currentUser.name && currentUser.email ? (
                            <>
                                <div className="relative flex items-center space-x-2" ref={userDropdownRef}>
                                    <div 
                                        className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br ${getAvatarColors(getUserName(currentUser))}`}
                                        onClick={() => setUserDropdownOpen((open) => !open)}
                                    >
                                        {getUserInitial(currentUser)}
                                    </div>
                                    <span className="text-[#252B42] cursor-pointer font-medium" onClick={() => setUserDropdownOpen((open) => !open)}>{getUserName(currentUser)}</span>
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[220px] overflow-hidden">
                                            {/* Profil Bilgileri */}
                                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md bg-gradient-to-br ${getAvatarColors(getUserName(currentUser))}`}>
                                                        {getUserInitial(currentUser)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800">{getUserName(currentUser)}</div>
                                                        <div className="text-sm text-gray-500">{getUserEmail(currentUser)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Menü Öğeleri */}
                                            <div className="py-2">
                                                <Link 
                                                    to="/previous-orders" 
                                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors" 
                                                    onClick={() => setUserDropdownOpen(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Önceki Siparişlerim
                                                </Link>
                                                <button
                                                    onClick={() => { setUserDropdownOpen(false); handleLogout(); }}
                                                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <LogOut size={20} className="mr-3" />
                                                    Çıkış Yap
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 border-2 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-[#252B42] text-sm">Yükleniyor...</span>
                                    </div>
                                ) : (
                                    <>
                                        {isAuthenticated && (
                                            <>
                                                <div className="relative flex items-center space-x-2" ref={userDropdownRef}>
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm cursor-pointer hover:bg-gray-400 transition-colors" onClick={() => setUserDropdownOpen((open) => !open)}>
                                                        U
                                                    </div>
                                                    <span className="text-[#252B42] cursor-pointer font-medium" onClick={() => setUserDropdownOpen((open) => !open)}>Kullanıcı</span>
                                                    {userDropdownOpen && (
                                                        <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px] overflow-hidden">
                                                            <div className="py-2">
                                                                <button
                                                                    onClick={() => { setUserDropdownOpen(false); handleLogout(); }}
                                                                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                >
                                                                    <LogOut size={20} className="mr-3" />
                                                                    Çıkış Yap
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Debug bilgisi */}
                                                {process.env.NODE_ENV === 'development' && (
                                                    <div className="text-xs text-gray-500 ml-2">
                                                        Debug: {currentUser ? `User: ${currentUser.name || 'No name'}, ${currentUser.email || 'No email'}` : 'No user data'}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {!isAuthenticated && (
                                            <>
                                                <Link to="/login" className="text-[#252B42] hover:text-[#23A6F0] transition-colors font-medium">
                                                    Giriş Yap
                                                </Link>
                                                <Link to="/signup" className="bg-[#23A6F0] text-white px-4 py-2 rounded hover:bg-[#2A7CC7] transition-colors font-medium">
                                                    Kayıt Ol
                                                </Link>
                                            </>
                                        )}
                                    </>
                                )}
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