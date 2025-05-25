import { FC } from "react";
import { Link } from "react-router-dom";

export const AuthLogin: FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-5xl font-cursive text-black text-center mb-8">Instagram</h1>

        <form className="bg-white p-6 rounded">
          <input
            type="text"
            placeholder="Số điện thoại, tên người dùng hoặc email"
            className="w-full mb-3 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded text-sm focus:outline-none"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full mb-4 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="flex items-center my-4 text-gray-400">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center text-blue-600 font-semibold mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.497V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
          </svg>
          Đăng nhập bằng Facebook
        </button>

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