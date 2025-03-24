import { PostsFilterParams } from '@/types'
import { createQueryParams } from '@/utils'

export const apiGuestRoutes = {
    posts: {
        general: '/posts/published',
        withParams: (params: PostsFilterParams) =>
          `/posts/published${createQueryParams({ ...params, order: 'DESC' })}`,
        withId: (id: number) => `/posts/${id}`,
      },
}
