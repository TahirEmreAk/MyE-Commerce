import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import PreviousOrders from './pages/PreviousOrders';

function AppContent() {
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
          <Route path="/order" element={
            <ProtectedRoute>
              <CreateOrderPage />
            </ProtectedRoute>
          } />
          <Route path="/previous-orders" element={
            <ProtectedRoute>
              <PreviousOrders />
            </ProtectedRoute>
          } />
        </Routes>
      </PageContent>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, currentUser, loading } = useSelector(state => state.user);
  
  // Debug için log
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - currentUser:', currentUser);
  console.log('ProtectedRoute - loading:', loading);
  
  // Eğer authentication yükleniyorsa, yüklenme tamamlanana kadar bekle
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
  }
  
  // Authentication yüklendi ama kullanıcı giriş yapmamışsa veya kullanıcı bilgileri yoksa login'e yönlendir
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}