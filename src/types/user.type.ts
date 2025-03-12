import { CommonType } from '@/types/base.type.ts'

export type UserLoginRequestType = {
  userName: string
  password: string
}

export type LoginResponseType = {
  access_token: string
  companyId: number
  user: AuthUserType
}

export type AuthUserType = {
  userName: string
  roleCode?: string
  companyId?: number
  pwd?: string
  role?: UserRoleType
}

export type UserRoleType = {
  roleCode: string
  roleName: string
  pages: UserRolePagesType[]
}

export type UserRolePagesType = {
  isActive: boolean
  createdAt: Date | null
  pageCode: string
  pageName: string
  pageUrl: string
  pageIcon?: string
  companyId: number
}

export type UserFilterType = {
  companyId?: number
  content?: string
  roleCode?: string
}

export type User = {
  avatar?: string
  birthDate?: string
  companyId: number
  email?: string
  firstName?: string
  gender?: number
  isActive?: boolean
  lastName?: string
  phoneNumber?: string
  roleCode: string
  userName: string
} & CommonType
