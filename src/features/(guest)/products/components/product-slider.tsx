'use client'

import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import {
  GuestProductDetailType,
  GuestProductTypeType,
  ProductFilterParams,
} from '@/entities/(guest)/product'
import get from 'lodash/get'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass, SwiperRef } from 'swiper/react'
import { useGetProducts } from '../../hook/use-guest-queries'
import { pagePublicRouters } from '@/entities/(guest)'

interface ProductsSliderProps {
  item: GuestProductTypeType
  leftSide?: boolean
}

const ControllButton = ({
  products,
  goPrev,
  goNext,
}: {
  products: GuestProductDetailType[]
  goPrev: () => void
  goNext: () => void
}) => {
  return (
    <div
      className={`mx-4 w-fit items-end gap-8 ${products.length > 3 ? 'flex' : products.length > 1 ? 'flex md:hidden lg:hidden' : 'hidden'}`}
    >
      <img
        onClick={goPrev}
        alt=''
        srcSet='/images/svg/arrow_left.svg'
        className='h-[40px] w-[40px]'
      />
      <img
        alt=''
        onClick={goNext}
        srcSet='/images/svg/arrow_right.svg'
        className='h-[40px] w-[40px]'
      />
    </div>
  )
}

export default function ProductSlider(props: Readonly<ProductsSliderProps>) {
  const swiperRef = useRef<SwiperRef | null>(null)
  const goNext = () =>
    (swiperRef.current as unknown as SwiperClass)?.slideNext()
  const goPrev = () =>
    (swiperRef.current as unknown as SwiperClass)?.slidePrev()

  const [filterParams] = useState<ProductFilterParams>({
    productType: props.item.id ?? 0,
    page: 1,
    take: 20,
  })

  const [products, setProducts] = useState<GuestProductDetailType[]>([])

  const { data, status, isRefetching } = useGetProducts(filterParams)

  const memoizedHeader: ReactElement = useMemo(() => {
    return (props.leftSide ?? true) ? (
      <div className='h-fit w-screen flex-col px-4 md:px-20 lg:px-44'>
        <p className={`philosopher-regular text-7xl`}>{props.item.name}</p>
        <div className='flex flex-1 justify-end gap-3'>
          <p className={`roboto-regular w-full flex-1 *:text-base`}>
            {props.item.desc}
          </p>
          <ControllButton products={products} goNext={goNext} goPrev={goPrev} />
        </div>
      </div>
    ) : (
      <div className='flex h-fit w-full flex-1 flex-col items-end justify-end px-4 md:px-20 lg:px-44'>
        <p className={`philosopher-regular w-fit text-7xl`}>
          {props.item.name}
        </p>
        <div className='flex w-full flex-1 justify-between gap-3'>
          <ControllButton products={products} goNext={goNext} goPrev={goPrev} />
          <p className={`roboto-regular w-fit text-end text-base`}>
            {props.item.desc}
          </p>
        </div>
      </div>
    )
  }, [products, props.item, props.leftSide])

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['list'], [])
    const items: GuestProductDetailType[] = list;

    setProducts(items)
  }, [data, status, isRefetching])

  if (products.length == 0) return <div />

  return (
    <div className='my-16 h-screen w-screen flex-col gap-16'>
      {memoizedHeader}
      <div className='mt-16 h-[575px] w-full flex-1 items-end justify-end sm:pl-16 pl-4'>
        <Swiper
          ref={swiperRef}
          direction={'horizontal'}
          spaceBetween={32}
          slidesPerView={"auto"}
          modules={[Navigation, Pagination]}
          loop={false}
          className='flex h-[575px] w-full flex-col items-center justify-end object-contain'
        >
          {products.map((item) => (
            <SwiperSlide key={item.id} className='w-[416px]'>
              <a href={`${pagePublicRouters.productDetail}/${item.id}`} className='w-full' >
                <div className='flex h-full w-full flex-col items-center justify-end border-b-2 border-[#E48E43] bg-[#DFDAD4] px-16 pb-9 pt-16'>
                  <img
                    src={item.thumbnail}
                    alt=''
                    className='h-[294px] w-2/3 rounded object-cover pb-14 transition-transform duration-300 hover:scale-110 lg:w-1/2'
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
              </a>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
