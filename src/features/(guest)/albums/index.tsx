import { useEffect, useState } from 'react'
import { AlbumPublicType } from '@/entities/(guest)/album'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetAlbums } from '@/features/(guest)/hook/use-guest-queries'
import AlbumGroup from './components/album-group'

export default function AlbumComponent() {
  const intl = useIntl()

  const [albums, setAlbums] = useState<AlbumPublicType[]>([])
  const { data, status, isRefetching } = useGetAlbums()

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    setAlbums(list)
  }, [data, status, isRefetching])

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.product' })}
      description={intl.formatMessage({ id: 'guest.common.product' })}
      canonical={menuRoutes.album}
      image={'/images/bg-home.png'}
    >
      <Banner path={''}>
        <Navbar />
        <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EFE5D2] pt-20'>
          <p className='philosopher-regular text-7xl'>BỘ SƯU TẬP</p>
          <p className='philosopher-regular text-7xl text-[#E48E43]'>DEJÀ VU</p>
          <img
            className='my-7 flex-1 object-contain'
            srcSet='/images/hompage_footer_2.png'
            alt=''
          />
        </div>
      </Banner>
      <div className='grid h-screen flex-col items-center justify-items-center bg-[#F2F1ED]'>
        {albums.map((item, index) => {
          return (
            <AlbumGroup
              item={item}
              key={item.id}
              background={index % 2 == 0 ? 'bg-[#EFE5D2]' : 'bg-[#DFDAD4]'}
            />
          )
        })}
      </div>
    </PageContainer>
  )
}
