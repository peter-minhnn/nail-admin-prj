import { useEffect, useRef, useState } from 'react'
import { pagePublicRouters } from '@/entities/(guest)'
import {
  GuestProductDetailType,
  GuestProductTypeType,
  ProductFilterParams,
} from '@/entities/(guest)/product'
import get from 'lodash/get'
import { Navigation, Pagination } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetProducts } from '../../hook/use-guest-queries'
import ProductSectionHeader from './product-section-header'

interface ProductsSliderProps {
  item: GuestProductTypeType
  leftSide?: boolean
}

export default function ProductSlider(props: Readonly<ProductsSliderProps>) {
  const swiperRef = useRef<SwiperRef | null>(null)
  const goNext = () => swiperRef.current?.swiper.slideNext()
  const goPrev = () => swiperRef.current?.swiper.slidePrev()
  const [filterParams] = useState<ProductFilterParams>({
    productType: props.item.id ?? 0,
    page: 1,
    take: 20,
  })

  const [products, setProducts] = useState<GuestProductDetailType[]>([])

  const { data, status, isRefetching } = useGetProducts(filterParams)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const items: GuestProductDetailType[] = get(data, ['list'], [])
    setProducts(items)
  }, [data, status, isRefetching])

  if (products.length == 0) return <div />

  return (
    <div className='my-16 h-fit w-screen flex-col gap-16'>
      <ProductSectionHeader
        onNextClick={goNext}
        onPreviousClick={goPrev}
        title={props.item.name}
        description={props.item.desc}
      />
      <div className='mt-16 h-[575px] w-full flex-1 items-end justify-end pl-4 sm:pl-16'>
        <Swiper
          ref={swiperRef}
          direction={'horizontal'}
          spaceBetween={32}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 'auto' },
          }}
          modules={[Navigation, Pagination]}
          loop={false}
          className='flex h-[575px] w-full flex-col items-center justify-end object-contain'
        >
          {products.map((item) => (
            <SwiperSlide key={item.id} className='w-[416px]'>
              <a
                href={`${pagePublicRouters.productDetail}/${item.id}`}
                className='w-full'
              >
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
