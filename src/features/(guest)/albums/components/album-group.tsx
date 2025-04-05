import { useRef } from 'react'
import { AlbumPublicType } from '@/entities/(guest)/album'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface AlbumItemProps {
  item: AlbumPublicType
  background: string
}

export default function AlbumGroup(props: Readonly<AlbumItemProps>) {
  const swiperRef = useRef<any>(null)

  const goNext = () => swiperRef.current?.swiper.slideNext()
  const goPrev = () => swiperRef.current?.swiper.slidePrev()
  if (props.item.details.length == 0) return null
  return (
    <div className='flex h-fit w-screen flex-col items-center justify-center md:h-screen md:flex-row'>
      <div
        className={`flex h-fit w-full md:h-full ${props.background} flex-col items-start justify-center p-8 md:items-center`}
      >
        <p className='text-center font-philosopher text-3xl font-bold'>
          {props.item.name}
        </p>
        <div className='my-14 hidden w-full items-end justify-center md:flex'>
          <img
            src={props.item.thumbnail}
            className='h-2/3 w-1/2 items-center object-cover'
            alt={String(props.item.id)}
          />
        </div>
        <p className='text-center font-roboto text-base'>
          {props.item.thumbnailTitle}
        </p>
      </div>
      <div className='h-full w-full'>
        <Swiper
          ref={swiperRef}
          direction={'horizontal'}
          spaceBetween={32}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={false}
          className='relative flex h-full w-full'
        >
          {props.item.details.map((item, index) => {
            return (
              <SwiperSlide className='!w-full' key={item.id}>
                <div className={`relative flex h-full w-full items-end`}>
                  <img
                    src={item.url}
                    className='h-full w-full object-cover'
                    alt={item.fileName}
                  />
                </div>
                <div
                  className={`absolute inset-0 my-11 flex w-full items-end justify-center gap-8 ${props.item.details.length == 1 ? 'hidden' : 'flex'}`}
                >
                  <button type='button' onClick={goPrev}>
                    <img
                      srcSet='/images/svg/arrow_left.svg'
                      className={`h-[70px] w-[70px] transition-transform duration-300 hover:scale-110 ${index == 0 ? 'hidden' : 'flex'}`}
                      alt=''
                    />
                  </button>
                  <button type='button' onClick={goNext}>
                    <img
                      srcSet='/images/svg/arrow_right.svg'
                      className={`h-[70px] w-[70px] transition-transform duration-300 hover:scale-110 ${index == props.item.details.length - 1 ? 'hidden' : 'flex'}`}
                      alt=''
                    />
                  </button>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
