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

  const handleToggle = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Önceki Siparişlerim</h2>
      {orders.length === 0 ? (
        <div>Hiç siparişiniz yok.</div>
      ) : (
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Sipariş No</th>
              <th className="border p-2">Tarih</th>
              <th className="border p-2">Toplam</th>
              <th className="border p-2">Detay</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="border p-2 text-center">{order.id}</td>
                  <td className="border p-2 text-center">{order.date || '-'}</td>
                  <td className="border p-2 text-center">{order.total || '-'}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleToggle(order.id)}
                    >
                      {openOrderId === order.id ? 'Kapat' : 'Detay'}
                    </button>
                  </td>
                </tr>
                {openOrderId === order.id && (
                  <tr>
                    <td colSpan="4" className="border p-2 bg-gray-50">
                      <div>
                        <strong>Ürünler:</strong>
                        <ul className="list-disc ml-6">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                              <li key={item.id}>
                                {item.productName} x {item.quantity} - {item.price} TL
                              </li>
                            ))
                          ) : (
                            <li>Ürün bilgisi yok.</li>
                          )}
                        </ul>
                        {/* Diğer detaylar buraya eklenebilir */}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PreviousOrders; 