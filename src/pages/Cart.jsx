import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseCartItem, decreaseCartItem, removeFromCart, toggleCartItemChecked, setAllCartItemsCheckedBySeller, addToCart } from '../store/actions/cartActions';
import { Checkbox } from '@headlessui/react';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const groupedCartItems = cart.reduce((acc, item) => {
    const storeId = item.product.store_id || 'unknown_seller';
    const storeName = item.product.store_name || 'Bilinmeyen Satıcı';
    if (!acc[storeId]) {
      acc[storeId] = { name: storeName, items: [] };
    }
    acc[storeId].items.push(item);
    return acc;
  }, {});

  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + (item.checked ? item.product.price * item.count : 0), 0);
  };

  const selectedCartItems = cart.filter(item => item.checked);
  const subtotal = calculateSubtotal(selectedCartItems);
  
  let shippingCost = 29.99; // Varsayılan kargo ücreti
  if (subtotal >= 500) {
    shippingCost = 0; // 500 TL üzeri siparişlerde kargo bedava
  }

  let discountPercentage = 0;
  if (subtotal >= 3000) {
    discountPercentage = 0.10; // 3000 TL üzeri %10 indirim
  } else if (subtotal >= 2000) {
    discountPercentage = 0.07; // 2000 TL üzeri %7 indirim
  } else if (subtotal >= 1000) {
    discountPercentage = 0.05; // 1000 TL üzeri %5 indirim
  }

  let sellerQuantityDiscount = 0;
  Object.keys(groupedCartItems).forEach(storeId => {
    const seller = groupedCartItems[storeId];
    const sellerItemCount = seller.items.reduce((acc, item) => acc + item.count, 0);
    if (sellerItemCount >= 3) {
      sellerQuantityDiscount += 40; // 3 adet ve üzeri ürün için 40 TL indirim
    }
  });

  const discountAmount = (subtotal * discountPercentage) + sellerQuantityDiscount;
  const total = subtotal - discountAmount + shippingCost;

  const handleToggleItemChecked = (productId) => {
    dispatch(toggleCartItemChecked(productId));
  };

  const handleToggleSellerChecked = (sellerId, isChecked) => {
    dispatch(setAllCartItemsCheckedBySeller(sellerId, isChecked));
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.count, 0);

  const handleClearCart = () => {
    // Sepeti boşalt
    cart.forEach(item => {
      dispatch(removeFromCart(item.product.id));
    });
  };

  const [recentlyAddedItems, setRecentlyAddedItems] = React.useState([]);

  React.useEffect(() => {
    // LocalStorage'dan en son eklenen ürünleri al
    const storedItems = JSON.parse(localStorage.getItem('recentlyAddedItems') || '[]');
    setRecentlyAddedItems(storedItems);
  }, []);

  React.useEffect(() => {
    // Sepete yeni ürün eklendiğinde, bu ürünü recentlyAddedItems'a ekle
    cart.forEach(item => {
      addToRecentlyAdded(item.product);
    });
  }, [cart]);

  const addToRecentlyAdded = (product) => {
    const updatedItems = [product, ...recentlyAddedItems.filter(item => item.id !== product.id)].slice(0, 10);
    setRecentlyAddedItems(updatedItems);
    localStorage.setItem('recentlyAddedItems', JSON.stringify(updatedItems));
  };

  const [activeTab, setActiveTab] = React.useState('recentlyAdded');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim ({totalCartItems} Ürün)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
            // Bu checkbox'ın state'i şu an için yönetilmiyor, sadece görsel amaçlı eklendi
          />
          <p className="text-gray-700">Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.</p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700"
        >
          Sepeti Boşalt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2 space-y-6">
          {Object.keys(groupedCartItems).length === 0 ? (
            <p className="text-gray-600 text-center text-lg">Sepetinizde ürün bulunmamaktadır.</p>
          ) : (
            Object.keys(groupedCartItems).map(storeId => {
              const seller = groupedCartItems[storeId];
              const isAllSellerItemsChecked = seller.items.every(item => item.checked);
              const sellerSubtotal = calculateSubtotal(seller.items);
              const sellerShippingCost = sellerSubtotal >= 500 ? 0 : 29.99; 
              const sellerItemCount = seller.items.reduce((acc, item) => acc + item.count, 0);

              return (
                <div key={storeId} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={isAllSellerItemsChecked}
                        onChange={(e) => handleToggleSellerChecked(storeId, e.target.checked)}
                      />
                      <h2 className="font-semibold text-lg ml-3">Satıcı: {seller.name}</h2>
                      <span className="text-sm text-gray-500 ml-2">9.7</span> {/* Placeholder for seller rating */}
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">Kurumsal</span> {/* Placeholder for Kurumsal tag */}
                    </div>
                    {sellerItemCount >= 3 && (
                        <div className="flex items-center gap-3">
                            <span className="text-orange-500 text-sm">3 Adet ve Üzeri 40 TL İndirim</span>
                            <button className="text-blue-500 text-sm hover:underline">Tüm Ürünler</button>
                        </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center bg-green-50 text-green-700 font-semibold p-2 rounded-md mb-4 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M5 18H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v4"/><path d="M17 18h2c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-1"/><path d="M12 18V9"/><path d="M17 9V7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                    <span>Kargo Bedava!</span>
                  </div>
                  
                  {seller.items.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between border-b last:border-b-0 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 rounded"
                          checked={item.checked}
                          onChange={() => handleToggleItemChecked(item.product.id)}
                        />
                        <img
                          src={item.product.images?.[0]?.url || 'https://via.placeholder.com/60x60?text=No+Image'}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded ml-3"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">Beden: {item.product.size || 'Tek Ebat'} Adet: {item.count}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.product.id % 2 === 0 ? '39 dakika içinde sipariş verirsen en geç yarın kargoda!' : 'Tahmini Kargo Teslim: 9 gün içinde'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => dispatch(decreaseCartItem(item.product.id))}
                            className="px-3 py-1 hover:bg-gray-100" disabled={item.count === 1}>-
                          </button>
                          <span className="px-4 py-1 border-x">{item.count}</span>
                          <button 
                            onClick={() => dispatch(increaseCartItem(item.product.id))}
                            className="px-3 py-1 hover:bg-gray-100">+
                          </button>
                        </div>
                        <span className="font-semibold text-gray-800">₺{(item.product.price * item.count).toFixed(2)}</span>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.product.id))}
                          className="text-red-500 hover:text-red-700 ml-2">
                          <span className="sr-only">Sil</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>

        {/* Sepet Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ara Toplam (Seçilenler)</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-semibold">
                <span>Yüzdelik İndirim ({(discountPercentage * 100).toFixed(0)}%)</span>
                <span>-₺{(subtotal * discountPercentage).toFixed(2)}</span>
              </div>
            )}
            {sellerQuantityDiscount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-semibold">
                <span>Mağaza İndirimi</span>
                <span>-₺{sellerQuantityDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Kargo</span>
              <span>{shippingCost === 0 ? 'Bedava' : `₺${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Toplam (Seçilenler)</span>
                <span className="font-semibold">₺{total.toFixed(2)}</span>
              </div>
              <button 
                className={`w-full bg-primary-600 text-white py-2 rounded-lg ${selectedCartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                disabled={selectedCartItems.length === 0}
              >
                Ödemeye Geç
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Sekmeler */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('recentlyAdded')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 ${activeTab === 'recentlyAdded' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} font-medium text-sm`}
            >
              Önceden Eklediklerim
            </button>
            <button
              onClick={() => handleTabChange('recommended')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 ${activeTab === 'recommended' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} font-medium text-sm`}
            >
              Önerilen Ürünler
            </button>
            <button
              onClick={() => handleTabChange('favorites')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 ${activeTab === 'favorites' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} font-medium text-sm relative`}
            >
              Favorilerim <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">Yeni</span>
            </button>
          </nav>
        </div>
        {/* Tab İçerikleri Buraya Gelecek */}
        <div className="py-6">
          {activeTab === 'recentlyAdded' && (
            <>
              <h3 className="text-lg font-semibold mb-4">Önceden Eklediklerim</h3>
              {recentlyAddedItems.length === 0 ? (
                <p className="text-gray-600">Henüz ürün eklenmemiş.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentlyAddedItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                      <Link to={`/shop/${item.gender}/${item.categoryName}/${item.categoryId}/${item.nameSlug}/${item.id}`}>
                        <img
                          src={item.images?.[0]?.url || 'https://via.placeholder.com/150x150?text=No+Image'}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      </Link>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">₺{item.price.toFixed(2)}</p>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeTab === 'recommended' && (
            <>
              <h3 className="text-lg font-semibold mb-4">Önerilen Ürünler</h3>
              <p className="text-gray-600">Önerilen ürünler burada listelenecek...</p>
            </>
          )}
          {activeTab === 'favorites' && (
            <>
              <h3 className="text-lg font-semibold mb-4">Favorilerim</h3>
              <p className="text-gray-600">Favori ürünleriniz burada listelenecek...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
