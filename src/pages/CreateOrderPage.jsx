import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAddresses, addAddress, updateAddress, deleteAddress, setSelectedAddress } from '../store/actions/addressActions';
import { fetchCards, addCard, updateCard, deleteCard, setSelectedCard } from '../store/actions/cardActions';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { setCart } from '../store/actions/cartActions';

const turkishCities = [
  "ADANA", "ADIYAMAN", "AFYONKARAHİSAR", "AĞRI", "AMASYA", "ANKARA", "ANTALYA", "ARTVİN", "AYDIN", "BALIKESİR",
  "BİLECİK", "BİNGÖL", "BİTLİS", "BOLU", "BURDUR", "BURSA", "ÇANAKKALE", "ÇANKIRI", "ÇORUM", "DENİZLİ",
  "DİYARBAKIR", "EDİRNE", "ELAZIĞ", "ERZİNCAN", "ERZURUM", "ESKİŞEHİR", "GAZİANTEP", "GİRESUN", "GÜMÜŞHANE", "HAKKARİ",
  "HATAY", "ISPARTA", "MERSİN", "İSTANBUL", "İZMİR", "KARS", "KASTAMONU", "KAYSERİ", "KIRKLARELİ", "KIRŞEHİR",
  "KOCAELİ", "KONYA", "KÜTAHYA", "MALATYA", "MANİSA", "KAHRAMANMARAŞ", "MARDİN", "MUĞLA", "MUŞ", "NEVŞEHİR",
  "NİĞDE", "ORDU", "RİZE", "SAKARYA", "SAMSUN", "SİİRT", "SİNOP", "SİVAS", "TEKİRDAĞ", "TOKAT",
  "TRABZON", "TUNCELİ", "ŞANLIURFA", "UŞAK", "VAN", "YOZGAT", "ZONGULDAK", "AKSARAY", "BAYBURT", "KARAMAN",
  "KIRIKKALE", "BATMAN", "ŞIRNAK", "BARTIN", "ARDAHAN", "IĞDIR", "YALOVA", "KARABÜK", "KİLİS", "OSMANİYE",
  "DÜZCE"
];

// Banka logoları ve Mastercard sembolü
const mastercardLogo = '💳';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useSelector(state => state.user);
  const { addresses, loading, error, selectedAddress } = useSelector(state => state.address);
  const { cards, loading: cardsLoading, error: cardsError, selectedCard } = useSelector(state => state.card);
  const { cart } = useSelector(state => state.cart); // Sepet state'ini dahil et

  // Dinamik Sipariş Özeti Hesaplamaları (Cart.jsx'ten alındı)
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
  if (selectedCartItems.length === 0 || subtotal >= 500) { // Sepet boşsa veya 500 TL üzeri ise kargo bedava
    shippingCost = 0; 
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
    const sellerItemCount = seller.items.reduce((acc, item) => acc + (item.checked ? item.count : 0), 0);
    if (sellerItemCount >= 3) {
      sellerQuantityDiscount += 40; // 3 adet ve üzeri seçili ürün için 40 TL indirim
    }
  });

  const discountAmount = (subtotal * discountPercentage) + sellerQuantityDiscount;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // console.log('CreateOrderPage Yüklendi - isAuthenticated:', isAuthenticated, 'authLoading:', authLoading);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState('Tek Çekim');
  const [displayTotal, setDisplayTotal] = useState(total); // Taksit seçeneğine göre gösterilecek toplam
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { register: registerCard, handleSubmit: handleSubmitCard, reset: resetCard, setValue: setCardValue, formState: { errors: cardErrors } } = useForm();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      dispatch(fetchAddresses());
      dispatch(fetchCards());
    }
  }, [isAuthenticated, authLoading, navigate, dispatch]);

  useEffect(() => {
    if (!loading && addresses.length > 0 && !selectedAddress) {
      dispatch(setSelectedAddress(addresses[0]));
    }
  }, [addresses, loading, selectedAddress, dispatch]);

  useEffect(() => {
    if (!cardsLoading && cards.length > 0 && !selectedCard) {
      dispatch(setSelectedCard(cards[0]));
    }
  }, [cards, cardsLoading, selectedCard, dispatch]);

  useEffect(() => {
    // selectedInstallment veya total değiştiğinde displayTotal'ı güncelle
    const selectedOption = installmentOptions.find(option => option.value === selectedInstallment);
    if (selectedOption) {
      setDisplayTotal(selectedOption.totalAmount);
    }
  }, [selectedInstallment, total]); // total'ı da bağımlılıklara ekledik

  const handleAddAddressClick = () => {
    setShowAddressForm(true);
    setIsEditing(false);
    reset();
  };

  const handleEditAddress = (address) => {
    console.log(`handleEditAddress çağrıldı, gelen adres:`, address);
    setShowAddressForm(true);
    setIsEditing(true);
    dispatch(setSelectedAddress(address)); // Seçilen adresi Redux state'ine kaydet
    // Form alanlarını seçilen adres bilgileriyle doldur
    setValue("id", address.id);
    setValue("title", address.title);
    setValue("name", address.name);
    setValue("surname", address.surname);
    setValue("phone", address.phone);
    setValue("city", address.city);
    setValue("district", address.district);
    setValue("address", address.neighborhood); // Backend'in neighborhood'u frontend'deki address ile eşleşiyor
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteAddress(addressId));
        toast.success('Adres başarıyla silindi!');
      } catch (err) {
        toast.error('Adres silinirken hata oluştu.');
      }
    }
  };

  const onSubmit = async (data) => {
    console.log(`onSubmit çağrıldı, form verileri:`, data);
    const payload = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.address, // Adres detaylarını neighborhood alanına gönder
    };

    if (isEditing) {
      payload.id = data.id;
    }
    console.log(`API'ye gönderilecek payload:`, payload);

    try {
      if (isEditing) {
        await dispatch(updateAddress(payload));
        toast.success('Adres başarıyla güncellendi!');
      } else {
        await dispatch(addAddress(payload));
        toast.success('Adres başarıyla eklendi!');
      }
      setShowAddressForm(false);
      reset();
    } catch (err) {
      toast.error('Adres kaydedilirken hata oluştu.');
    }
  };

  const handleAddCardClick = () => {
    setShowCardForm(true);
    setIsEditingCard(false);
    resetCard();
  };

  const handleEditCard = (card) => {
    setShowCardForm(true);
    setIsEditingCard(true);
    dispatch(setSelectedCard(card));
    setCardValue("id", card.id);
    setCardValue("card_no", card.card_no);
    setCardValue("expire_month", card.expire_month);
    setCardValue("expire_year", card.expire_year);
    setCardValue("name_on_card", card.name_on_card);
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteCard(cardId));
        toast.success('Kart başarıyla silindi!');
      } catch (err) {
        toast.error('Kart silinirken hata oluştu.');
      }
    }
  };

  const onSubmitCard = async (data) => {
    const payload = {
      card_no: data.card_no,
      expire_month: parseInt(data.expire_month, 10),
      expire_year: parseInt(data.expire_year, 10),
      name_on_card: data.name_on_card,
    };

    if (isEditingCard) {
      payload.id = data.id;
    }

    try {
      if (isEditingCard) {
        await dispatch(updateCard(payload));
        toast.success('Kart başarıyla güncellendi!');
      } else {
        await dispatch(addCard(payload));
        toast.success('Kart başarıyla eklendi!');
      }
      setShowCardForm(false);
      resetCard();
    } catch (err) {
      toast.error('Kart kaydedilirken hata oluştu.');
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const calculateInstallmentAmount = (installmentCount, totalAmount) => {
    let interestRate = 0;
    if (installmentCount === 2) interestRate = 0.02; // %2
    else if (installmentCount === 3) interestRate = 0.03; // %3
    else if (installmentCount === 6) interestRate = 0.06; // %6
    else if (installmentCount === 9) interestRate = 0.09; // %9
    else if (installmentCount === 12) interestRate = 0.12; // %12
    return totalAmount * (1 + interestRate);
  };

  const installmentOptions = [
    { label: 'Tek Çekim', value: 'Tek Çekim', monthlyPayment: total, totalAmount: total, interestRate: 0 },
    { label: '2 Taksit', value: '2 Taksit', totalAmount: calculateInstallmentAmount(2, total), interestRate: 0.02 },
    { label: '3 Taksit', value: '3 Taksit', totalAmount: calculateInstallmentAmount(3, total), interestRate: 0.03 },
    { label: '6 Taksit', value: '6 Taksit', totalAmount: calculateInstallmentAmount(6, total), interestRate: 0.06 },
    { label: '9 Taksit', value: '9 Taksit', totalAmount: calculateInstallmentAmount(9, total), interestRate: 0.09 },
    { label: '12 Taksit', value: '12 Taksit', totalAmount: calculateInstallmentAmount(12, total), interestRate: 0.12 },
  ];

  const handleOrder = async () => {
    if (!selectedAddress || !selectedCard || !agreedToTerms || selectedCartItems.length === 0) return;
    try {
      const payload = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: selectedCard.card_no,
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: selectedCard.ccv || '000', // Eğer ccv yoksa dummy değer
        price: displayTotal,
        products: selectedCartItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.detail || ''
        }))
      };
      await axiosInstance.post('/order', payload);
      toast.success('Siparişiniz başarıyla oluşturuldu!');
      dispatch(setCart([])); // Sepeti sıfırla
      navigate('/previous-orders');
    } catch (err) {
      toast.error('Sipariş oluşturulurken hata oluştu.');
    }
  };

  if (authLoading) {
    return <p>Yükleniyor...</p>; // Kimlik doğrulama yüklenirken gösterilecek
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sipariş Oluştur</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol Sütun: Adres ve Kart Bilgileri */}
        <div className="flex-1 flex flex-col space-y-6">

          {/* Adres Bilgileri Bölümü */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Adres Bilgileri</h2>
              <button
                onClick={() => setShowAddressForm(prev => !prev)}
                className="text-blue-500 hover:underline text-sm"
              >
                Değiştir
              </button>
            </div>

            {showAddressForm ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("id")} />
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Adres Başlığı</label>
                  <input type="text" id="title" {...register("title", { required: "Adres başlığı gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad</label>
                  <input type="text" id="name" {...register("name", { required: "Ad gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Soyad</label>
                  <input type="text" id="surname" {...register("surname", { required: "Soyad gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  {errors.surname && <span className="text-red-500 text-sm">{errors.surname.message}</span>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                  <input type="text" id="phone" {...register("phone", { required: "Telefon gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir (İl)</label>
                  <select id="city" {...register("city", { required: "Şehir gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option value="">Şehir Seçiniz</option>
                    {turkishCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">İlçe</label>
                  <input type="text" id="district" {...register("district", { required: "İlçe gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  {errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres Detayları</label>
                  <textarea id="address" {...register("address", { required: "Adres detayları gerekli" })} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                  {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    {isEditing ? 'Adresi Güncelle' : 'Adres Ekle'}
                  </button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
                    İptal
                  </button>
                </div>
              </form>
            ) : addresses.length === 0 ? (
              <p>Henüz kayıtlı adresiniz bulunmamaktadır. Yeni bir adres ekleyin.</p>
            ) : (
              <div className="space-y-4 mt-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border p-4 rounded-md flex items-center justify-between">
                    <div>
                      <input
                        type="radio"
                        name="selectedAddress"
                        id={`address-${address.id}`}
                        value={address.id}
                        checked={selectedAddress?.id === address.id}
                        onChange={() => dispatch(setSelectedAddress(address))}
                        className="mr-2"
                      />
                      <label htmlFor={`address-${address.id}`} className="font-semibold">{address.title}</label>
                      <p className="text-gray-600">{address.name} {address.surname}, {address.phone}</p>
                      <p className="text-gray-600">{address.neighborhood} {address.district}/{address.city}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-blue-500 hover:underline"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-500 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
                {/* Yeni Adres Ekle butonu, eğer adres formu kapalıysa göster */} 
                {!showAddressForm && ( 
                  <button 
                    onClick={handleAddAddressClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4" 
                  > 
                    + Yeni Adres Ekle 
                  </button> 
                )} 
              </div>
            )}
          </div>

          {/* Ödeme Seçenekleri Bölümü */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ödeme Seçenekleri</h2>
              <p className="text-sm text-gray-600">Banka/Kredi Kartı veya Alışveriş Kredisi ile ödemenizi güvenle yapabilirsiniz.</p>
            </div>
            
            <div className="border border-orange-500 rounded-md p-4 mb-6">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="paymentOption"
                  id="payWithCard"
                  value="payWithCard"
                  checked={true} // Varsayılan olarak kart ile ödeme seçili
                  readOnly // Kullanıcının değiştirmesini engelle, şimdilik tek seçenek
                  className="mr-2 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="payWithCard" className="font-bold text-lg text-orange-500">Kart ile Öde</label>
              </div>
              <p className="text-sm text-gray-600 mb-4">Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.</p>

              <div className="flex flex-col lg:flex-row lg:space-x-8">
                {/* Kart Bilgileri */} 
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Kart Bilgileri</h3>
                    <button
                      onClick={handleAddCardClick}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      {cards.length === 0 ? 'Banka/Kredi Kartı Ekle' : 'Başka bir Kart ile Ödeme Yap'}
                    </button>
                  </div>

                  {showCardForm && (
                    <form onSubmit={handleSubmitCard(onSubmitCard)} className="space-y-4 mb-4">
                      <input type="hidden" {...registerCard("id")} />
                      <div>
                        <label htmlFor="card_no" className="block text-sm font-medium text-gray-700">Kart Numarası</label>
                        <input
                          type="text"
                          id="card_no"
                          {...registerCard("card_no", {
                            required: "Kart numarası gerekli",
                            pattern: { value: /^\d{16}$/, message: "Kart numarası 16 haneli olmalıdır." }
                          })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          maxLength="16"
                        />
                        {cardErrors.card_no && <span className="text-red-500 text-sm">{cardErrors.card_no.message}</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700">Son Kullanma Tarihi (Ay)</label>
                          <select
                            id="expire_month"
                            {...registerCard("expire_month", { required: "Ay gerekli" })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          >
                            <option value="">Ay</option>
                            {months.map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>{month.toString().padStart(2, '0')}</option>
                            ))}
                          </select>
                          {cardErrors.expire_month && <span className="text-red-500 text-sm">{cardErrors.expire_month.message}</span>}
                        </div>
                        <div>
                          <label htmlFor="expire_year" className="block text-sm font-medium text-gray-700">Son Kullanma Tarihi (Yıl)</label>
                          <select
                            id="expire_year"
                            {...registerCard("expire_year", { required: "Yıl gerekli" })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          >
                            <option value="">Yıl</option>
                            {years.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                          {cardErrors.expire_year && <span className="text-red-500 text-sm">{cardErrors.expire_year.message}</span>}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700">Kart Üzerindeki Ad Soyad</label>
                        <input type="text" id="name_on_card" {...registerCard("name_on_card", { required: "Kart üzerindeki ad soyad gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {cardErrors.name_on_card && <span className="text-red-500 text-sm">{cardErrors.name_on_card.message}</span>}
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="3d_secure" {...registerCard("3d_secure")} className="mr-2" />
                        <label htmlFor="3d_secure" className="text-sm font-medium text-gray-700">3D Secure ile ödemek istiyorum</label>
                      </div>
                      <div className="flex space-x-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                          {isEditingCard ? 'Kartı Güncelle' : 'Kart Ekle'}
                        </button>
                        <button type="button" onClick={() => setShowCardForm(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
                          İptal
                        </button>
                      </div>
                    </form>
                  )}

                  {cardsLoading ? (
                    <p>Kartlar yükleniyor...</p>
                  ) : cardsError ? (
                    <p className="text-red-500">Kartlar yüklenirken hata oluştu: {cardsError}</p>
                  ) : cards.length === 0 ? (
                    <p>Henüz kayıtlı kartınız bulunmamaktadır. Yeni bir kart ekleyin.</p>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {cards.map((card) => (
                        <div key={card.id} className="border p-4 rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="selectedCard"
                              id={`card-${card.id}`}
                              value={card.id}
                              checked={selectedCard?.id === card.id}
                              onChange={() => dispatch(setSelectedCard(card))}
                              className="mr-2"
                            />
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{mastercardLogo}</span>
                              <label htmlFor={`card-${card.id}`} className="font-semibold">
                                {card.card_no.slice(0, 4)} {card.card_no.slice(4, 6)}** **** {card.card_no.slice(-4)} ({card.expire_month}/{card.expire_year})
                              </label>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCard(card)}
                              className="text-blue-500 hover:underline"
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className="text-red-500 hover:underline"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Taksit Seçenekleri Bölümü */}
                <div className="flex-1 mt-6 lg:mt-0">
                  <h3 className="text-xl font-semibold mb-3">Taksit Seçenekleri</h3>
                  {cards.length === 0 ? (
                    <p className="text-sm text-gray-600">Kartınızı eklediğinizde taksit seçeneklerini görebilirsiniz.</p>
                  ) : !selectedCard ? (
                    <p className="text-sm text-gray-600">Lütfen taksit seçeneklerini görmek için kayıtlı bir kart seçin.</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-4">Kartınıza uygun taksit seçeneğini seçiniz</p>
                      <div className="space-y-2">
                        {installmentOptions.map((option) => (
                          <div key={option.value} className="flex justify-between items-center border p-3 rounded-md">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="installmentOption"
                                id={option.value}
                                value={option.value}
                                checked={selectedInstallment === option.value}
                                onChange={() => setSelectedInstallment(option.value)}
                                className="mr-2 text-orange-500 focus:ring-orange-500"
                              />
                              <label htmlFor={option.value} className="text-gray-700">
                                {option.label}
                              </label>
                            </div>
                            <span className="font-bold text-gray-800">{(option.totalAmount / (option.value === 'Tek Çekim' ? 1 : parseInt(option.value.split(' ')[0]))).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} x {option.value === 'Tek Çekim' ? '' : option.value.split(' ')[0]} = {option.totalAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Sağ Sütun: Sipariş Özeti */}
        <div className="w-full lg:w-1/3">
          {/* Üstteki Ödeme Yap butonu */}
          <button
            disabled={!selectedAddress || !selectedCard || !agreedToTerms || selectedCartItems.length === 0}
            className={`w-full bg-orange-500 text-white py-3 rounded-lg mb-4 ${(!selectedAddress || !selectedCard || !agreedToTerms || selectedCartItems.length === 0) ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-orange-600'}`}
            onClick={handleOrder}
          >
            Ödeme Yap
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ürünün Toplamı</span>
              <span>{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Kargo Toplam</span>
              <span>{shippingCost === 0 ? 'Bedava' : shippingCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            {selectedInstallment !== 'Tek Çekim' && (
              <div className="flex justify-between mb-2 text-orange-500">
                <span>Taksit Farkı ({(installmentOptions.find(opt => opt.value === selectedInstallment)?.interestRate * 100).toFixed(0)}%)</span>
                <span>{(displayTotal - total).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="flex justify-between mb-2 text-orange-500">
                <span>Yüzdelik İndirim ({(discountPercentage * 100).toFixed(0)}%)</span>
                <span>{(subtotal * discountPercentage).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
            )}
            {sellerQuantityDiscount > 0 && (
              <div className="flex justify-between mb-2 text-orange-500">
                <span>Mağaza İndirimi</span>
                <span>{sellerQuantityDiscount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Toplam</span>
              <span>{displayTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <div className="mt-6">
              <label htmlFor="agreedToTerms" className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mr-2 text-orange-500 focus:ring-orange-500 rounded"
                />
                <span>
                  <a href="#" className="text-blue-500 hover:underline">Ön Bilgilendirme Koşulları</a>'nı ve
                  <a href="#" className="text-blue-500 hover:underline"> Mesafeli Satış Sözleşmesi</a>'ni
                  okudum, onaylıyorum.
                </span>
              </label>
            </div>
            <button
              disabled={!selectedAddress || !selectedCard || !agreedToTerms || selectedCartItems.length === 0}
              className={`w-full mt-4 py-3 rounded-lg text-white font-semibold ${(!selectedAddress || !selectedCard || !agreedToTerms || selectedCartItems.length === 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              onClick={handleOrder}
            >
              Ödeme Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage; 