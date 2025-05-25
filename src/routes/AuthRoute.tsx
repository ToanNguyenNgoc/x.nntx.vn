import { AuthLogin, AuthPage, AuthRegister } from "@/pages"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"

export const AuthRoute: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} >
          <Route index element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
      </Routes>
    </div>
  )
}