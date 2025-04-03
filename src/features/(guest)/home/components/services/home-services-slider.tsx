'use client'

import { useEffect, useState, useRef } from 'react'
import { menuRoutes } from '@/entities/(guest)'
import { PostPublicType } from '@/entities/(guest)/post'
import { ListResponseType, PostsFilterParams } from '@/types'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button from '@/components/(guest)/layout/button'
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import HomeItemService from './home-item-service'

export default function ServicesSlider() {
  const intl = useIntl()

  const swiperRef = useRef<any>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const goNext = () => swiperRef.current?.swiper.slideNext()
  const goPrev = () => swiperRef.current?.swiper.slidePrev()

  const [filterParams] = useState<PostsFilterParams>({
    postType: 'service',
    page: 1,
    take: 10,
  })

  const [dataSource, setDataSource] = useState<
    ListResponseType<PostPublicType>
  >({
    data: [],
    meta: {
      page: 1,
      take: 50,
    },
  })
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: list, meta })
  }, [data, status, isRefetching])

  return (dataSource.data ?? []).length == 0 ? (
    <div></div>
  ) : (
    <div className='my-10 w-full flex-col'>
      <div>
        <p className={`philosopher-regular mb-16 flex pl-16 text-7xl`}>
          {intl.formatMessage({
            id: 'homeGuest.service',
          })}
        </p>
      </div>
      <div className='relative h-full w-full flex-1'>
        <div className='lg:4/6 absolute right-0 top-0 z-10 h-24 w-full items-end justify-end pl-16 sm:w-1/2 sm:pl-0 lg:w-4/6'>
          <div className='flex justify-between gap-3 sm:ml-10 md:mx-8'>
            <div
              className={`w-full items-start gap-8 ${(dataSource.data ?? []).length > 3 ? 'flex' : (dataSource.data ?? []).length > 2 ? 'flex lg:hidden' : ''}`}
            >
              <img
                onClick={goPrev}
                srcSet='/images/svg/arrow_left.svg'
                className='h-[40px] w-[40px] transition-transform duration-300 hover:scale-110'
                alt=''
              />
              <img
                onClick={goNext}
                srcSet='/images/svg/arrow_right.svg'
                className='h-[40px] w-[40px] transition-transform duration-300 hover:scale-110'
                alt=''
              />
            </div>
            <div className='roboto-regular flex w-full items-end justify-end'>
              <a href={menuRoutes.services}>
                <Button
                  title={intl.formatMessage({
                    id: 'guest.common.more',
                  })}
                />
              </a>
            </div>
          </div>
        </div>
        <div className='relative w-screen overflow-hidden'>
          <Swiper
            ref={swiperRef}
            direction={'horizontal'}
            onSlideChange={(swiper) => {
              if (swiper.activeIndex < (dataSource.data ?? []).length - 3) {
                setActiveIndex(swiper.activeIndex)
              }
            }}
            spaceBetween={32}
            modules={[Navigation, Pagination]}
            slidesPerView={"auto"}
            loop={false}
            className='relative flex h-[624px] w-full pl-16'
          >
            {(dataSource.data ?? []).map((item, index) => {
              const itemHeight: string =
                index == activeIndex ? 'md:h-[512px] h-[416px] w-[416px]' : 'h-[416px] w-[416px]'
              const height: string =
                index == activeIndex ? 'md:h-[624px] h-[528px] w-[416px]' : 'h-[528px] w-[416px]'
              return (
                <SwiperSlide key={index} className='!w-[416px] '>
                  <div className={`flex h-[624px] w-[416px] items-end`}>
                    <HomeItemService
                      item={item}
                      height={height}
                      imgheight={itemHeight}
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
