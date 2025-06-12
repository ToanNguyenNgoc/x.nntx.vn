/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { FC} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const AuthLogin: FC = () => {
  const { mutateLogin } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = async (data: any) => mutateLogin.mutate(data);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-5xl font-cursive text-black text-center mb-8">Instagram</h1>

        <form className="bg-white p-6 rounded" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Số điện thoại, tên người dùng hoặc email"
            className={`w-full mb-1 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
          />
          {errors.email && <p id="email-error" className="text-red-500 text-xs mb-2">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Mật khẩu"
            className={`w-full mb-4 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors.password && <p id="password-error" className="text-red-500 text-xs mb-3">{errors.password.message}</p>}
          <Button className="w-full" loading={mutateLogin.isLoading}>
            Đăng nhập
          </Button>
        </form>

        <div className="flex items-center my-4 text-gray-400">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* <button className="w-full flex items-center justify-center text-blue-600 font-semibold mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.497V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
          </svg>
          Đăng nhập bằng Facebook
        </button> */}
        <GoogleLogin
          onSuccess={response => console.log(response)}
          onError={()=>{}}
        />

        <div className="text-center text-sm text-blue-500 mb-2 cursor-pointer hover:underline">
          Quên mật khẩu?
        </div>

        <div className="text-center text-gray-700 text-sm">
          Bạn chưa có tài khoản ư?{" "}
          <Link to="register" className="text-blue-500 font-semibold hover:underline cursor-pointer">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )
}