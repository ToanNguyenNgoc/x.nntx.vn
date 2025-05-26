import { ReqRegister, Res, ResError, ResUser } from "@/interfaces";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useRecaptcha } from "@/hooks";
import { mailRegex, telephoneRegex } from "@/utils";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/apis";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ReqForm extends ReqRegister {
  confirm_password: string
}

export const AuthRegister: FC = () => {
  const { recaptcha_key, refreshReCaptcha, verifyRecaptchaCallback, recaptcha, onRefreshRecaptcha } = useRecaptcha();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const mutate = useMutation<Res<ResUser>, AxiosError<ResError>, ReqRegister>({
    mutationFn: body => AuthApi.register(body),
    onSuccess: (_data, variables) => {
      if (variables.otp) {
        toast.success('Register success');
        setTimeout(() => navigate('/', { replace: true }), 3000)
      } else {
        setOpen(true);
        toast.success(`An email sent to: ${variables.email}`);
      }
      onRefreshRecaptcha();
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Register failed')
      onRefreshRecaptcha();
    }
  })
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ReqForm>({
    defaultValues: {
      email: '',
      telephone: '',
      name: '',
      password: '',
      confirm_password: '',
      otp: undefined
    }
  })
  const onSubmit = (data: ReqForm) => {
    mutate.mutate(Object.assign(data, { recaptcha, otp: open ? data.otp : undefined }))
  }
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptcha_key}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OPT</DialogTitle>
            <DialogDescription>
              Enter OTP code from Email to verify
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="OTP"
                className={`text-center w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                aria-invalid={!!errors.otp}
                aria-describedby="otp-error"
                {...register('otp', {
                  required: open ? 'Otp is required' : false,
                  minLength: { value: 6, message: 'OTP is min 6 characters' },
                  maxLength: { value: 6, message: 'OTP is max 6 characters' },
                })}
              />
              {errors.otp && <DialogDescription id="otp-error" className="text-red-500 text-xs mb-2">{errors.otp.message}</DialogDescription>}
              <Button type="submit" className="w-full" loading={mutate.isLoading} >
                Verify
              </Button>
              <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Instagram</h1>

          <p className="text-sm text-center text-gray-500 mb-4">
            Register to view more images and videos
          </p>

          {/* <button className="w-full flex items-center justify-center text-white bg-blue-600 font-semibold py-2 rounded hover:bg-blue-700 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.497V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
            Sign up with Facebook
          </button> */}

          <div className="flex items-center my-4 text-gray-400">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <form className="bg-white space-y-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <input
              type="text"
              placeholder="Email"
              className={`w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: mailRegex,
                  message: "invalid email address"
                }
              })}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-xs mb-2">{errors.email.message}</p>}
            <input
              type="text"
              placeholder="Telephone"
              className={`w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.telephone ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-invalid={!!errors.telephone}
              {...register('telephone', {
                required: false,
                pattern: {
                  value: telephoneRegex,
                  message: 'invalid telephone'
                }
              })}
              aria-describedby="telephone-error"
            />
            {errors.telephone && <p id="telephone-error" className="text-red-500 text-xs mb-2">{errors.telephone.message}</p>}
            <input
              type="text"
              placeholder="Name"
              className={`w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-invalid={!!errors.name}
              {...register('name', {
                required: 'Name is required'
              })}
              aria-describedby="name-error"
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs mb-2">{errors.name.message}</p>}
            <input
              type="password"
              placeholder="Password"
              className={`w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-invalid={!!errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password is min 6 characters' }
              })}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

            <input
              type="password"
              placeholder="Confirm password"
              className={`w-full mb-3 px-4 py-2 bg-white border rounded text-sm focus:outline-none ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                }`}
              aria-invalid={!!errors.confirm_password}
              {...register('confirm_password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password is min 6 characters' },
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Confirm passwords should match!";
                }
              })}
              aria-describedby="confirm-password-error"
            />
            {errors.confirm_password && <p id="confirm-password-error" className="text-red-500 text-xs mb-2">{errors.confirm_password.message}</p>}

            <p className="text-xs text-gray-500 text-center">
              {/* Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi. */}
            </p>

            <Button type="submit" className="w-full" loading={mutate.isLoading} >
              Register
            </Button>
            <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
          </form>

          <div className="text-center text-sm text-gray-700 mt-6">
            Already have an account?{" "}
            <Link to={'/'} className="text-blue-500 font-semibold hover:underline cursor-pointer">
              Login
            </Link>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  )
}