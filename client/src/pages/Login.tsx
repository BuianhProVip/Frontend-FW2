import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { MIN_PASSWORD } from 'src/consts';

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormParams>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormParams) => {
    try {
      const { data: responseData } = await axios.post("/auth/login", data);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      setErrorMessage(null); 
      window.location.href = "/";
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-50 z-50 font-sans w-full fixed top-0">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="/">
            <img
              src="https://theme.hstatic.net/200000549029/1000902525/14/logo.png?v=3329"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    {...register('email', {
                      required: "Email là bắt buộc",
                      validate: value => isEmail(value) || "Địa chỉ email không hợp lệ"
                    })}
                    type="text"
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Nhập email của bạn"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Mật khẩu</label>
                <div className="relative flex items-center">
                  <input
                    {...register('password', {
                      required: "Mật khẩu là bắt buộc",
                      minLength: {
                        value: MIN_PASSWORD,
                        message: `Mật khẩu phải có ít nhất ${MIN_PASSWORD} ký tự`
                      }
                    })}
                    type="password"
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Nhập mật khẩu của bạn"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Lưu đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Đăng nhập
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Bạn chưa có tài khoản?{" "}
                <a href="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Đăng ký tại đây
                </a>
              </p>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
