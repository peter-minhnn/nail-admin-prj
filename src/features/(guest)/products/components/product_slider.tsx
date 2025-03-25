'use client';

import { GuestPostDataType } from '@/entities/(guest)/post';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProductsSliderProps {
  items?: Array<GuestPostDataType>;
  leftSide?: boolean;
  title?: string;
  description?: string;
}

export default function ProductSlider(props: Readonly<ProductsSliderProps>) {
  const swiperRef = useRef<any>(null);
  const goNext = () => swiperRef.current?.swiper.slideNext();
  const goPrev = () => swiperRef.current?.swiper.slidePrev();
  if ((props.items ?? []).length == 0) return <div />
  return (
    <div className="h-screen w-screen flex-col gap-16">
      {(props.leftSide ?? true) ? (
        <div className="h-fit w-screen flex-col px-44">
          <p className={`text-7xl philosopher-regular `}>{props.title}</p>
          <div className="flex flex-1 justify-end gap-3">
            <p className={`text-base roboto-regular w-full`}>
              {props.description}
            </p>
            <div className="flex w-fit items-end gap-8">
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
          </div>
        </div>
      ) : (
        <div className="flex h-fit w-full flex-1 flex-col items-end justify-end px-44">
          <p className={`w-fit text-7xl philosopher-regular`}>
            {props.title}
          </p>
          <div className="flex w-full flex-1 justify-between gap-3">
            <div className="flex w-fit items-end gap-8">
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
            <p className={`w-fit text-base roboto-regular `}>
              {props.description}
            </p>
          </div>
        </div>
      )}

      <div className="mt-16 h-[575px] w-full flex-1 items-end justify-end px-16">
        <Swiper
          ref={swiperRef}
          direction={'horizontal'}
          slidesPerView={3}
          spaceBetween={32}
          modules={[Navigation, Pagination]}
          loop={false}
          className="f flex h-[575px] w-full flex-col items-center justify-end object-contain"
        >
          {(props.items ?? []).map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full flex-col items-center justify-end border-b-2 border-[#E48E43] bg-[#DFDAD433] px-16 pb-9 pt-16">
                <img
                  src={item.thumbnail}
                  className="h-[294px] w-[190px] object-cover pb-14 rounded"
                />
                <p
                  className={`roboto-regular mb-3 text-center text-xl font-bold`}
                >
                  {item.title}
                </p>
                <p
                  className={`roboro-light line-clamp-2 text-center text-xl font-extralight`}
                >
                  {item.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
