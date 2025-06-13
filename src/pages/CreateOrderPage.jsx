import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAddresses, addAddress, updateAddress, deleteAddress, setSelectedAddress } from '../store/actions/addressActions';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useSelector(state => state.user);
  const { addresses, loading, error, selectedAddress } = useSelector(state => state.address);

  console.log('CreateOrderPage Yüklendi - isAuthenticated:', isAuthenticated, 'authLoading:', authLoading);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      dispatch(fetchAddresses());
    }
  }, [isAuthenticated, authLoading, navigate, dispatch]);

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

  if (authLoading) {
    return <p>Yükleniyor...</p>; // Kimlik doğrulama yüklenirken gösterilecek
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sipariş Oluştur - Adres Bilgileri</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Adres Bilgileri</h2>
        <button
          onClick={handleAddAddressClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          + Yeni Adres Ekle
        </button>

        {showAddressForm && (
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
              <input type="text" id="city" {...register("city", { required: "Şehir gerekli" })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
        )}

        {loading ? (
          <p>Adresler yükleniyor...</p>
        ) : error ? (
          <p className="text-red-500">Adresler yüklenirken hata oluştu: {error}</p>
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
          </div>
        )}
      </div>

      {/* Devam et butonu */}
      <div className="mt-8 text-right">
        <button
          disabled={!selectedAddress} // Adres seçilmediyse butonu devre dışı bırak
          className={`bg-orange-500 text-white px-6 py-3 rounded-lg ${!selectedAddress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
        >
          Kaydet ve Devam Et
        </button>
      </div>
    </div>
  );
};

export default CreateOrderPage; 