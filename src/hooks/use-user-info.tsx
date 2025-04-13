import { useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { CookieStorageKeys } from '@/entities/common-data.ts'
import { LoginResponseType } from '@/types/user.type.ts'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<LoginResponseType | null>(null)

  useEffect(() => {
    const storedUserInfo = Cookie.get(CookieStorageKeys.USER_INFO)
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo) as LoginResponseType)
    }
  }, [])

  return userInfo
}
