'use client';

import Service from '@/entities/(guest)/service';
import HomeItemService from './home_item_service';
import { useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/(guest)/layout/button';
import { useIntl } from 'react-intl'


interface ServiceSliderProps {
  items?: Array<Service>;
  leftSide?: boolean;
  title?: string;
  description?: string;
}

// const philosopher = Philosopher({
//   weight: '400',
//   subsets: ['latin'],
// });

export default function ServicesSlider(props: Readonly<ServiceSliderProps>) {
  const intl = useIntl()

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goNext = () => swiperRef.current?.swiper.slideNext();
  const goPrev = () => swiperRef.current?.swiper.slidePrev();

  return (props.items ?? []).length == 0 ? (
    <div></div>
  ) : (
    <div className="h-screen w-full flex-col bg-[#F2F1ED] pl-16">
      <div>
        <p className={`mb-16 flex text-7xl`}>
          {intl.formatMessage({
            id: 'homeGuest.service',
          })}
        </p>
      </div>
      <div className="relative h-full w-full flex-1">
        <div className="absolute right-0 top-0 z-10 h-24 w-3/4 items-end justify-end px-16">
          <div className="ml-18 flex justify-between gap-3">
            <div className="flex w-full items-start gap-8">
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
            </div>
            <div className="flex w-full items-end justify-end">
              <Button title={intl.formatMessage({
                id: 'homeGuest.more',
              })} />
            </div>
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <Swiper
            ref={swiperRef}
            direction={'horizontal'}
            slidesPerView={3.5}
            onSlideChange={(swiper) => {
              if ((props.items ?? []).length < 3) return;
              if (swiper.activeIndex < (props.items ?? []).length - 3) {
                setActiveIndex(swiper.activeIndex);
              }
            }}
            spaceBetween={32}
            modules={[Navigation, Pagination]}
            loop={false}
            className="relative flex h-[624px] w-full"
          >
            {(props.items ?? []).map((item, index) => {
              const itemHeight: string =
                index == activeIndex ? 'h-[512px]' : 'h-[416px]';
              const height: string =
                index == activeIndex ? 'h-[624px]' : 'h-[528px]';
              return (
                <SwiperSlide key={index}>
                  <div className="flex h-full w-full items-end">
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
