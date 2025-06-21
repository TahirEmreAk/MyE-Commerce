import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginUser } from '../store/actions/userActions';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { rememberMe, ...loginData } = data;
      
      // Login işlemini gerçekleştir
      await dispatch(loginUser({ ...loginData, rememberMe }));
      
      // Başarılı login sonrası yönlendirme
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
      toast.success('Başarıyla giriş yapıldı!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#252B42] mb-6">Giriş Yap</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="ornek@email.com"
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
                required: 'Şifre zorunludur'
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Beni Hatırla */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('rememberMe')}
              id="rememberMe"
              className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Beni Hatırla
            </label>
          </div>

          {/* Submit Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#23A6F0] text-white py-2 px-4 rounded hover:bg-[#2A7CC7] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Giriş Yapılıyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 