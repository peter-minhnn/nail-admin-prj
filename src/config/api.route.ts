export const apiRoutes = {
  login: '/auth/login',
  protected: '/auth/protected',
  logout: '/auth/logout',
  banners: {
    general: '/banners',
    delete: (id: number) => `/banners/${id}`,
  },
  upload: {
    general: '/files',
    deleteFile: (fileName: string) => `/files/${fileName}`,
  },
}
