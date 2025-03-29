'use client';
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries'
import { useEffect, useState, useRef } from 'react'
import { ListResponseType, PostsFilterParams } from '@/types'
import { GuestPostDataType, GuestPostsListSchema } from '@/entities/(guest)/post'
import get from 'lodash/get'

import HomeItemService from './home-item-service';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/(guest)/layout/button';
import { useIntl } from 'react-intl'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { menuRoutes } from '@/entities/(guest)';

export default function ServicesSlider() {
  const intl = useIntl()

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goNext = () => swiperRef.current?.swiper.slideNext();
  const goPrev = () => swiperRef.current?.swiper.slidePrev();



  const [filterParams] = useState<PostsFilterParams>({
    postType: "service",
    page: 1,
    take: 10,
  })

  const [dataSource, setDataSource] = useState<ListResponseType<GuestPostDataType>>(
    {
      data: [],
      meta: {
        page: 1,
        take: 50,
      },
    }
  )
  const { data, status, isRefetching } = useGetPosts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const meta = get(data, ['meta'], {
      page: 1,
      take: 10,
    })
    setDataSource({ data: GuestPostsListSchema.parse(list), meta })
  }, [data, status, isRefetching])


  return (dataSource.data ?? []).length == 0 ? (
    <div></div>
  ) : (
    <div className="w-full flex-col my-10">
      <div>
        <p className={`philosopher-regular mb-16 flex text-7xl pl-16`}>
          {intl.formatMessage({
            id: 'homeGuest.service',
          })}
        </p>
      </div>
      <div className="relative h-full w-full flex-1">
        <div className="absolute right-0 top-0 z-10 h-24 lg:w-4/6 sm:w-1/2  lg:4/6 w-full items-end justify-end pl-16 sm:pl-0 ">
          <div className="flex justify-between gap-3 sm:ml-10 md:mx-8">
            <div className={` w-full items-start gap-8 ${(dataSource.data ?? []).length > 3 ? "flex" : (dataSource.data ?? []).length > 2 ? "lg:hidden flex" : ""}`}>
              <img
                onClick={goPrev}
                srcSet="/images/svg/arrow_left.svg"
                className="h-[40px] w-[40px]"
                alt=''
              />
              <img
                onClick={goNext}
                srcSet="/images/svg/arrow_right.svg"
                className="h-[40px] w-[40px]"
                alt=''
              />
            </div>
            <div className="roboto-regular flex w-full items-end justify-end">
              <a href={menuRoutes.services}>
                <Button title={intl.formatMessage({
                  id: 'guest.common.more',
                })} />
              </a>
            </div>
          </div>
        </div>
        <div className="relative  w-screen overflow-hidden">
          <Swiper
            ref={swiperRef}
            direction={'horizontal'}
            onSlideChange={(swiper) => {
              if (swiper.activeIndex < (dataSource.data ?? []).length - 3) {
                setActiveIndex(swiper.activeIndex);
              }
            }}
            spaceBetween={32}
            modules={[Navigation, Pagination]}
            breakpoints={{
              480: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3.2 },
            }}
            loop={false}
            className="relative flex h-[624px] w-full pl-16"
          >
            {(dataSource.data ?? []).map((item, index) => {
              const itemHeight: string =
                index == activeIndex ? 'sm:h-[512px] h-[416px]' : 'h-[416px] ';
              const height: string =
                index == activeIndex ? 'sm:h-[624px] h-[528px]' : 'h-[528px] ';
              return (
                <SwiperSlide key={index}>
                  <div className={`flex h-full items-end `}>
                    <HomeItemService
                      item={item}
                      height={height}
                      imgheight={itemHeight}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
