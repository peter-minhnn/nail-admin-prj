import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import { AlbumPublicType } from '@/types/(guest)'
import get from 'lodash/get'
import { FormattedMessage, useIntl } from 'react-intl'
import { cn } from '@/lib/utils.ts'
import Banner from '@/components/(guest)/layout/banner'
import { Container } from '@/components/(guest)/layout/container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import Lightbox from '@/components/(guest)/lightbox.tsx'
import { useGetAlbums } from '@/features/(guest)/hook/use-guest-queries'

export default function AlbumComponent() {
  const intl = useIntl()

  const [albums, setAlbums] = useState<AlbumPublicType[]>([])
  const { data, status, isRefetching } = useGetAlbums()
  const [open, setOpen] = useState<boolean>(false)

  const [currentAlbum, setCurrentAlbum] = useState<AlbumPublicType | undefined>(
    undefined
  )

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    setAlbums(list)
  }, [data, status, isRefetching])

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'))
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])
  return (
    <PageContainer
      title={intl.formatMessage({ id: 'guest.common.product' })}
      description={intl.formatMessage({ id: 'guest.common.product' })}
      canonical={menuRoutes.album}
      image={'/images/bg-home.png'}
    >
      <div className={``}>
        <Navbar />
        <Banner path={''}>
          <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EFE5D2] pt-20'>
            <p className='philosopher-regular text-7xl uppercase'>
              <FormattedMessage id='albums.headerTitle' />
            </p>
            <p className='philosopher-regular text-7xl text-[#E48E43]'>
              DEJÀ VU
            </p>
            <img
              className='my-7 flex-1 object-contain'
              srcSet='/images/hompage_footer_2.png'
              alt=''
            />
          </div>
        </Banner>
        <Container>
          <h1 className='relative my-10 text-center text-2xl font-bold uppercase text-[#E48E43]'>
            <FormattedMessage id='albums.listAlbums' />
            <span className='absolute bottom-[-5px] left-1/2 w-24 -translate-x-1/2 transform border-2 border-b-2 border-[#E48E43]'></span>
          </h1>
          <div className='mb-32 grid h-fit w-full grid-cols-1 gap-7 md:grid-cols-4'>
            {albums.map((item, index) => {
              const remainingItems = albums.length % 4
              const isLastRow = index >= albums.length - remainingItems
              return (
                <button
                  type='button'
                  key={item.id}
                  onClick={() => {
                    setCurrentAlbum(item)
                    setOpen(true)
                  }}
                  className={cn(
                    'relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded shadow-md',
                    {
                      'md:col-span-2': index >= albums.length - 2,
                      [`md:col-span-${4 / remainingItems}`]: isLastRow,
                    }
                  )}
                  title='Albums'
                >
                  <img
                    className='h-full w-full object-cover'
                    src={item.thumbnail}
                    alt={item.name}
                  />
                  <p className='absolute transform text-xl font-bold text-white transition-transform duration-300 hover:translate-y-0 hover:scale-150'>
                    {item.name}
                  </p>
                </button>
              )
            })}
          </div>
        </Container>
      </div>
      {open && (
        <Lightbox
          images={currentAlbum?.details.map((v) => v.url) ?? []}
          initialIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </PageContainer>
  )
}
