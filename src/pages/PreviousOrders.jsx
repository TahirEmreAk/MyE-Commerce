import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/actions/orderActions';

const PreviousOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [openOrderId, setOpenOrderId] = React.useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Debug için sipariş verilerini console'da göster
  useEffect(() => {
    if (orders.length > 0) {
      console.log('Siparişler yüklendi:', orders);
      console.log('İlk sipariş detayı:', orders[0]);
    }
  }, [orders]);

  const handleToggle = (orderId) => {
    console.log('Detaylar açılıyor/kapanıyor, sipariş ID:', orderId);
    console.log('Seçilen sipariş:', orders.find(order => order.id === orderId));
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Tarih formatlanırken hata:', error);
      return dateString || '-';
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return '-';
    try {
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
      }).format(price);
    } catch (error) {
      console.error('Fiyat formatlanırken hata:', error);
      return `${price || 0} TL`;
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto p-4">Yükleniyor...</div>;
  if (error) return <div className="max-w-4xl mx-auto p-4">Hata: {error}</div>;

  try {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Önceki Siparişlerim</h2>
        {!orders || orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Henüz siparişiniz bulunmamaktadır.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg shadow-sm">
                <div className="bg-gray-50 p-4 rounded-t-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <span className="text-sm text-gray-600">Sipariş No:</span>
                      <div className="font-semibold">#{order.id}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Tarih:</span>
                      <div className="font-semibold">{formatDate(order.order_date || order.date)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Toplam:</span>
                      <div className="font-semibold text-green-600">{formatPrice(order.price || order.total)}</div>
                    </div>
                    <div className="text-right">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={() => handleToggle(order.id)}
                      >
                        {openOrderId === order.id ? 'Detayları Gizle' : 'Detayları Göster'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {openOrderId === order.id && (
                  <div className="p-4 border-t">
                    <h4 className="font-semibold mb-3">Sipariş Detayları</h4>
                    
                    {/* Ürünler */}
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 mb-2">Ürünler:</h5>
                      {order.products && Array.isArray(order.products) && order.products.length > 0 ? (
                        <div className="space-y-2">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">{product.product_name || product.name || 'Ürün Adı Yok'}</span>
                                <span className="text-gray-600 ml-2">x {product.count || product.quantity || 1}</span>
                              </div>
                              <div className="text-green-600 font-medium">
                                {formatPrice(product.price || 0)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">{item.productName || item.name || 'Ürün Adı Yok'}</span>
                                <span className="text-gray-600 ml-2">x {item.quantity || item.count || 1}</span>
                              </div>
                              <div className="text-green-600 font-medium">
                                {formatPrice(item.price || 0)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">Ürün bilgisi bulunamadı.</div>
                      )}
                    </div>

                    {/* Adres Bilgisi */}
                    {order.address && typeof order.address === 'object' && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-700 mb-2">Teslimat Adresi:</h5>
                        <div className="p-2 bg-gray-50 rounded text-sm">
                          {order.address.name || 'Ad'} {order.address.surname || 'Soyad'}<br />
                          {order.address.neighborhood || order.address.address || 'Adres detayı yok'}<br />
                          {order.address.district || 'İlçe'}/{order.address.city || 'Şehir'}
                        </div>
                      </div>
                    )}

                    {/* Ödeme Bilgisi */}
                    {order.card_no && (
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Ödeme Bilgisi:</h5>
                        <div className="p-2 bg-gray-50 rounded text-sm">
                          Kart: **** **** **** {typeof order.card_no === 'string' ? order.card_no.slice(-4) : '****'}<br />
                          Kart Sahibi: {order.card_name || 'Bilinmiyor'}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('PreviousOrders render hatası:', error);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Önceki Siparişlerim</h2>
        <div className="text-center py-8 text-red-500">
          Siparişler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
        </div>
      </div>
    );
  }
};

export default PreviousOrders; 