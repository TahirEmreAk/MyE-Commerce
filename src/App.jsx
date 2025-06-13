import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PageContent from './layout/PageContent';
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart'; 
import ShopPage from './pages/ShopPage';
import Contact from './pages/Contact';
import Team from './pages/Team';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ShoppingPage from './pages/ShoppingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyToken } from './store/actions/userActions';
import { setAuthToken } from './utils/authUtils';
import { Provider } from 'react-redux';
import store from './store';
import CreateOrderPage from './pages/CreateOrderPage';

export default function App() {
  const dispatch = useDispatch();

  // Uygulama yüklendiğinde token'ı kontrol et ve Axios header'ına ekle
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  useEffect(() => {
    // Uygulama başlangıcında token kontrolü (Redux state'ini güncellemek için)
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <PageContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShoppingPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/order" element={<CreateOrderPage />} />
            </Routes>
          </PageContent>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
}