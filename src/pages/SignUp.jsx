import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const selectedRole = watch('role_id');

  useEffect(() => {
    // Rolleri getir
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Roller yüklenirken hata:', error);
        // Varsayılan roller ekle
        setRoles([
          { id: 1, name: 'Müşteri' },
          { id: 2, name: 'Mağaza' }
        ]);
        toast.warning('Roller yüklenirken bir hata oluştu. Varsayılan roller kullanılıyor.');
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      // Form verilerini temizle ve düzenle
      const cleanData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id, 10) // String'i number'a çevir
      };

      // Eğer mağaza seçiliyse, store verilerini ekle
      if (data.role_id === '2') { // Mağaza role_id'si
        cleanData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_no,
          bank_account: data.store_bank_account
        };
      }

      console.log('Gönderilecek veri:', cleanData); // Debug için

      const response = await axiosInstance.post('/signup', cleanData);
      console.log('Başarılı yanıt:', response.data); // Debug için
      
      toast.success('Kayıt başarılı! Hesabınızı aktifleştirmek için e-posta adresinize gönderilen linke tıklayın.');
      navigate(-1); // Önceki sayfaya dön
    } catch (error) {
      console.error('Kayıt hatası:', error); // Debug için
      console.error('Hata detayları:', error.response?.data); // Debug için
      
      if (error.response) {
        // Sunucudan gelen hata mesajı
        let errorMessage = 'Kayıt olurken bir hata oluştu.';
        
        if (error.response.status === 500) {
          errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin veya farklı bilgilerle kayıt olmayı deneyin.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        }
        
        toast.error(errorMessage);
        setError(errorMessage);
      } else if (error.request) {
        // Ağ hatası
        const networkError = 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.';
        toast.error(networkError);
        setError(networkError);
      } else {
        // Diğer hatalar
        const generalError = 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
        toast.error(generalError);
        setError(generalError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#252B42] mb-6">Kayıt Ol</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* İsim */}
          <div>
            <label className="block text-[#252B42] mb-2">İsim</label>
            <input
              type="text"
              {...register('name', {
                required: 'İsim zorunludur',
                minLength: {
                  value: 3,
                  message: 'İsim en az 3 karakter olmalıdır'
                }
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-[#252B42] mb-2">E-posta</label>
            <input
              type="email"
              {...register('email', {
                required: 'E-posta zorunludur',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Geçerli bir e-posta adresi giriniz'
                }
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-[#252B42] mb-2">Şifre</label>
            <input
              type="password"
              {...register('password', {
                required: 'Şifre zorunludur',
                minLength: {
                  value: 6,
                  message: 'Şifre en az 6 karakter olmalıdır'
                }
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Şifre Tekrar (Sadece frontend validasyonu için) */}
          <div>
            <label className="block text-[#252B42] mb-2">Şifre Tekrar</label>
            <input
              type="password"
              {...register('password_confirmation', {
                required: 'Şifre tekrarı zorunludur',
                validate: (value) => {
                  const password = watch('password');
                  return value === password || 'Şifreler eşleşmiyor';
                }
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.password_confirmation && (
              <span className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>

          {/* Rol Seçimi */}
          <div>
            <label className="block text-[#252B42] mb-2">Rol</label>
            <select
              {...register('role_id')}
              defaultValue="1" // Müşteri rolü varsayılan
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            >
              {roles.length > 0 ? (
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="1">Müşteri</option>
                  <option value="2">Mağaza</option>
                </>
              )}
            </select>
          </div>

          {/* Mağaza Bilgileri (Sadece mağaza rolü seçiliyse göster) */}
          {selectedRole === '2' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[#252B42] mb-2">Mağaza Adı</label>
                <input
                  type="text"
                  {...register('store_name', {
                    required: selectedRole === '2' ? 'Mağaza adı zorunludur' : false,
                    minLength: {
                      value: 3,
                      message: 'Mağaza adı en az 3 karakter olmalıdır'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                />
                {errors.store_name && (
                  <span className="text-red-500 text-sm">
                    {errors.store_name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] mb-2">Mağaza Telefonu</label>
                <input
                  type="tel"
                  {...register('store_phone', {
                    required: selectedRole === '2' ? 'Mağaza telefonu zorunludur' : false,
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Telefon numarası 10 haneli olmalıdır (örn: 5551234567)'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  placeholder="5551234567"
                />
                {errors.store_phone && (
                  <span className="text-red-500 text-sm">
                    {errors.store_phone.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] mb-2">Vergi Numarası</label>
                <input
                  type="text"
                  {...register('store_tax_no', {
                    required: selectedRole === '2' ? 'Vergi numarası zorunludur' : false,
                    pattern: {
                      value: /^T\d{3}V\d{6}$/,
                      message: 'Vergi numarası TXXXVXXXXXX formatında olmalıdır (örn: T123V456789)'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  placeholder="T123V456789"
                />
                {errors.store_tax_no && (
                  <span className="text-red-500 text-sm">
                    {errors.store_tax_no.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] mb-2">IBAN</label>
                <input
                  type="text"
                  {...register('store_bank_account', {
                    required: selectedRole === '2' ? 'IBAN zorunludur' : false,
                    pattern: {
                      value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                      message: 'IBAN TR ile başlamalı ve 26 karakter olmalıdır'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  placeholder="TR123456789012345678901234"
                />
                {errors.store_bank_account && (
                  <span className="text-red-500 text-sm">
                    {errors.store_bank_account.message}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Submit Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#23A6F0] text-white py-2 px-4 rounded hover:bg-[#2A7CC7] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Kaydediliyor...
              </>
            ) : (
              'Kayıt Ol'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 