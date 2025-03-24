'use client';
import { useGetPosts } from '@/features/(admin)/posts/hooks/use-guest-queries'
import { useEffect, useState, useRef } from 'react'
import { ListResponseType, PostsFilterParams } from '@/types'
import { PostDataType, postsListSchema } from '@/entities/(guest)/post'
import get from 'lodash/get'

import HomeItemService from './home_item_service';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/(guest)/layout/button';
import { useIntl } from 'react-intl'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  const [dataSource, setDataSource] = useState<ListResponseType<PostDataType>>(
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
    setDataSource({ data: postsListSchema.parse(list), meta })
  }, [data, status, isRefetching])


  return (dataSource.data ?? []).length == 0 ? (
    <div></div>
  ) : (
    <div className="h-screen w-full flex-col my-10">
      <div>
        <p className={`philosopher-regular mb-16 flex text-7xl pl-16`}>
          {intl.formatMessage({
            id: 'homeGuest.service',
          })}
        </p>
      </div>
      <div className="relative h-full w-full flex-1">
        <div className="absolute right-0 top-0 z-10 h-24 w-3/4 items-end justify-end px-16 ">
          <div className="ml-18 flex justify-between gap-3 pl-16">
            {((dataSource.data ?? []).length < 4) ? <div /> : <div className="flex w-full items-start gap-8">
              <img
                onClick={goPrev}
                srcSet="/images/svg/arrow_left.svg"
                className="h-[40px] w-[40px]"
              />
              <img
                onClick={goNext}
                srcSet="/images/svg/arrow_right.svg"
                className="h-[40px] w-[40px]"
              />
            </div>}
            <div className="roboto-regular flex w-full items-end justify-end">
              <Button title={intl.formatMessage({
                id: 'homeGuest.more',
              })} />
            </div>
          </div>
        </div>
        <div className="relative h-full w-screen overflow-hidden">
          <Swiper
            ref={swiperRef}
            direction={'horizontal'}
            slidesPerView={3.5}
            onSlideChange={(swiper) => {
              if ((dataSource.data ?? []).length < 3) return;
              if (swiper.activeIndex < (dataSource.data ?? []).length - 3) {
                setActiveIndex(swiper.activeIndex);
              }
            }}
            spaceBetween={32}
            modules={[Navigation, Pagination]}
            loop={false}
            className="relative flex h-[624px] w-full pl-16"
          >
            {(dataSource.data ?? []).map((item, index) => {
              const itemHeight: string =
                index == activeIndex ? 'h-[512px]' : 'h-[416px]';
              const height: string =
                index == activeIndex ? 'h-[624px]' : 'h-[528px]';
              return (
                <SwiperSlide key={index}>
                  <div className={`flex h-full w-full items-end `}>
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
