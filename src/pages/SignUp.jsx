import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Loader2 } from 'lucide-react';

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
        setError('Roller yüklenirken bir hata oluştu.');
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      // Eğer mağaza seçiliyse, store verilerini ekle
      if (data.role_id === '2') { // Mağaza role_id'si
        data = {
          ...data,
          store: {
            name: data.store_name,
            phone: data.store_phone,
            tax_no: data.store_tax_no,
            bank_account: data.store_bank_account
          }
        };
        // Form datasından store_ ile başlayan alanları temizle
        delete data.store_name;
        delete data.store_phone;
        delete data.store_tax_no;
        delete data.store_bank_account;
      }

      await axiosInstance.post('/signup', data);
      navigate(-1); // Önceki sayfaya dön
      // Kullanıcıya bilgi ver (bu kısmı uygulama durumuna göre ayarlayabilirsiniz)
      alert('Hesabınızı aktifleştirmek için e-posta adresinize gönderilen linke tıklayın!');
    } catch (error) {
      setError(error.response?.data?.message || 'Kayıt olurken bir hata oluştu.');
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
                  value: 8,
                  message: 'Şifre en az 8 karakter olmalıdır'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'
                }
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Şifre Tekrar */}
          <div>
            <label className="block text-[#252B42] mb-2">Şifre Tekrar</label>
            <input
              type="password"
              {...register('password_confirmation', {
                required: 'Şifre tekrarı zorunludur',
                validate: (value) =>
                  value === watch('password') || 'Şifreler eşleşmiyor'
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
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
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
                    required: 'Mağaza adı zorunludur',
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
                    required: 'Mağaza telefonu zorunludur',
                    pattern: {
                      value: /^(\+90|0)?[0-9]{10}$/,
                      message: 'Geçerli bir Türkiye telefon numarası giriniz'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
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
                    required: 'Vergi numarası zorunludur',
                    pattern: {
                      value: /^T\d{3}V\d{6}$/,
                      message: 'Vergi numarası TXXXVXXXXXX formatında olmalıdır'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
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
                    required: 'IBAN zorunludur',
                    pattern: {
                      value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                      message: 'Geçerli bir IBAN giriniz'
                    }
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
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