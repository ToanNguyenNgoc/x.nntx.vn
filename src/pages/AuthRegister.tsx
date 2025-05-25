import { FC } from "react";
import { Link } from "react-router-dom";

export const AuthRegister: FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Instagram</h1>

        <p className="text-sm text-center text-gray-500 mb-4">
          Đăng ký để xem ảnh và video từ bạn bè.
        </p>

        <button className="w-full flex items-center justify-center text-white bg-blue-600 font-semibold py-2 rounded hover:bg-blue-700 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.497V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
          </svg>
          Đăng ký bằng Facebook
        </button>

        <div className="flex items-center my-4 text-gray-400">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <form className="bg-white space-y-3">
          <input
            type="text"
            placeholder="Số di động hoặc email"
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Tên đầy đủ"
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Tên người dùng"
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded focus:outline-none"
          />

          <p className="text-xs text-gray-500 text-center">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </form>

        <div className="text-center text-sm text-gray-700 mt-6">
          Bạn đã có tài khoản?{" "}
          <Link to={'/'} className="text-blue-500 font-semibold hover:underline cursor-pointer">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}