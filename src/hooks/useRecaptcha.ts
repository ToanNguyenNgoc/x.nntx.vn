/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"

export function useRecaptcha() {

  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const [recaptcha, setRecaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setRecaptcha(token)
  }, [refreshReCaptcha])

  const onRefreshRecaptcha = () => setRefreshReCaptcha(r => !r)

  useEffect(() => {
    onRefreshRecaptcha()
    return () => {
      onRefreshRecaptcha()
    }
  }, [])

  return {
    recaptcha_key: String(import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY),
    refreshReCaptcha,
    onRefreshRecaptcha,
    verifyRecaptchaCallback,
    recaptcha
  }
}