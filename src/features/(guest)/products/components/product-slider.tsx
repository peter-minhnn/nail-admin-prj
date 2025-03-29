'use client';

import { GuestProductDetailListSchema, GuestProductDetailType, GuestProductTypeType, ProductFilterParams } from '@/entities/(guest)/product';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetProducts } from '../../hook/use-guest-queries';
import get from 'lodash/get';

interface ProductsSliderProps {
  item: GuestProductTypeType;
  leftSide?: boolean;
}

export default function ProductSlider(props: Readonly<ProductsSliderProps>) {
  const swiperRef = useRef<any>(null);
  const goNext = () => swiperRef.current?.swiper.slideNext();
  const goPrev = () => swiperRef.current?.swiper.slidePrev();

  const [filterParams] = useState<ProductFilterParams>({
    productType: props.item.id ?? 0,
    page: 1,
    take: 10
  });

  const [products, setProducts] = useState<GuestProductDetailType[]>([])

  const { data, status, isRefetching } = useGetProducts(filterParams);

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const items = GuestProductDetailListSchema.parse(list);

    setProducts(items);
  }, [data, status, isRefetching])

  if (products.length == 0) return (<div />);
  return (
    <div className="h-screen w-screen flex-col gap-16 my-16">
      {header()}
      <div className="mt-16 h-[575px] w-full flex-1 items-end justify-end px-16">
        <Swiper
          ref={swiperRef}
          direction={'horizontal'}
          spaceBetween={32}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination]}
          loop={false}
          className="flex h-[575px] w-full flex-col items-center justify-end object-contain"
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full flex-col items-center justify-end border-b-2 border-[#E48E43] bg-[#DFDAD4] px-16 pb-9 pt-16">
                <img
                  src={item.thumbnail}
                  alt=''
                  className="h-[294px] lg:w-1/2 w-2/3 object-cover pb-14 rounded transition-transform duration-300 hover:scale-110"
                />
                <p
                  className={`roboto-regular mb-3 text-center text-xl font-bold`}
                >
                  {item.productName}
                </p>
                <p
                  className={`roboro-light line-clamp-2 text-center text-xl font-extralight`}
                >
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div >
  );

  function header() {
    return (props.leftSide ?? true) ? (
      <div className="h-fit w-screen flex-col lg:px-44 md:px-20 px-4 ">
        <p className={`text-7xl philosopher-regular`}>{props.item.name}</p>
        <div className="flex flex-1 justify-end gap-3">
          <p className={`flex-1 *:text-base roboto-regular w-full`}>
            {props.item.desc}
          </p>
          {controllButton()}
        </div>
      </div>
    ) : (
      <div className="flex h-fit w-full flex-1 flex-col items-end justify-end  lg:px-44 md:px-20 px-4 ">
        <p className={`w-fit text-7xl philosopher-regular`}>
          {props.item.name}
        </p>
        <div className="flex w-full flex-1 justify-between gap-3">
          {controllButton()}
          <p className={`w-fit text-base roboto-regular text-end`}>
            {props.item.desc}
          </p>
        </div>
      </div>
    )
  };

  function controllButton() {
    return <div className={`w-fit items-end gap-8 mx-4 ${products.length > 3 ? "flex" : products.length > 1 ? "lg:hidden md:hidden flex" : "hidden"}`}>
      <img
        onClick={goPrev}
        alt=''
        srcSet="/images/svg/arrow_left.svg"
        className="h-[40px] w-[40px]"
      />
      <img
        alt=''
        onClick={goNext}
        srcSet="/images/svg/arrow_right.svg"
        className="h-[40px] w-[40px]"
      />
    </div>
  }
}
