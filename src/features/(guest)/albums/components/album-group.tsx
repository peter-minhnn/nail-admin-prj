import { AlbumPublicType } from "@/entities/(guest)/album";
import { useRef, useState } from "react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface AlbumItemProps {
    item: AlbumPublicType,
    background: string
}

export default function AlbumGroup(props: Readonly<AlbumItemProps>) {

    const swiperRef = useRef<any>(null)

    const goNext = () => swiperRef.current?.swiper.slideNext()
    const goPrev = () => swiperRef.current?.swiper.slidePrev()
    if (props.item.details.length == 0) return null;
    return (<div className="md:h-screen h-fit w-screen flex md:flex-row flex-col items-center justify-center ">
        <div className={`flex w-full h-fit md:h-full ${props.background} flex-col md:items-center justify-center p-8 items-start`}>
            <p className="font-philosopher text-3xl font-bold text-center" >{props.item.name}</p>
            <div className="w-full items-end justify-center my-14 md:flex hidden">
                <img src={props.item.thumbnail} className="w-1/2  h-2/3  object-cover items-center " />
            </div>
            <p className="font-roboto text-base text-center " >{props.item.thumbnailTitle}</p>
        </div>
        <div className=" w-full h-full">
            <Swiper
                ref={swiperRef}
                direction={'horizontal'}
                spaceBetween={32}
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                loop={false}
                className='relative flex h-full w-full '
            >{props.item.details.map((item, index) => {
                return <SwiperSlide className='!w-full '>
                    <div className={`relative flex w-full h-full items-end`}                >
                        <img src={item.url} className="h-full w-full object-cover" />
                    </div>
                    <div className={`my-11 absolute inset-0 w-full items-end justify-center gap-8 flex ${props.item.details.length == 1 ? "hidden" : "flex"}`} >
                        <img
                            onClick={goPrev}
                            srcSet='/images/svg/arrow_left.svg'
                            className={`h-[70px] w-[70px] transition-transform duration-300 hover:scale-110 ${index == 0 ? "hidden" : "flex"}`}
                            alt=''
                        />
                        <img
                            onClick={goNext}
                            srcSet='/images/svg/arrow_right.svg'
                            className={`h-[70px] w-[70px] transition-transform duration-300 hover:scale-110 ${index == (props.item.details.length - 1) ? "hidden" : "flex"}`}
                            alt=''
                        />
                    </div>
                </SwiperSlide>
            })}
            </Swiper>
        </div>
    </div>)
}