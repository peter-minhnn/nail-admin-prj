import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AlbumPublicDetailType, AlbumPublicType } from '@/entities/(guest)/album'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { Button } from '@/components/(admin)/ui'
import { X } from 'lucide-react'

type AlbumDetailProps = {
    data: AlbumPublicType
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}

export const AlbumDetailDialog: FC<AlbumDetailProps> = (props) => {
    const [currentDetail, setCurrentDetail] = useState<AlbumPublicDetailType | undefined>(undefined)

    useEffect(() => {
        setCurrentDetail(props.data.details[0])
    }, [props.data.details])
    return (
        <Dialog
            open={props.open}
            onOpenChange={() => {
                props.setOpen(false)
            }}
        >

            <DialogContent className="fixed  flex items-center justify-center bg-black bg-opacity-90 overflow-hidden pt-3">

                <div className="flex flex-col h-screen w-screen">
                    <div className=" flex w-screen  h-8 items-end justify-end  ">
                        <Button onClick={() => props.setOpen(false)} >
                            <X className="w-10 h-10 " />
                        </Button>
                    </div>
                    <div className="flex-1 flex max-h-full max-w-full  overflow-hidden">
                        <img src={currentDetail?.url ?? ""} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <div className="h-[200px] flex justify-center items-center m-5">
                        <Swiper
                            slidesPerView={"auto"}
                            spaceBetween={10}
                            centeredSlides={true}
                            freeMode={true}
                            navigation={true}
                            modules={[FreeMode, Navigation]}
                            onSlideChange={(swiper) => {
                                setCurrentDetail(props.data?.details[swiper.activeIndex])
                            }}
                        >
                            {props.data?.details.map((item, index) => (
                                <SwiperSlide key={item.id} className="flex justify-center">
                                    <img
                                        src={item.url}
                                        alt={`Thumbnail ${index}`}
                                        className="h-[200px] w-[150px] cursor-pointer object-cover rounded-lg shadow-md border "
                                        onClick={() => setCurrentDetail(item)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
