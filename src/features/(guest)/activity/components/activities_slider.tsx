import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ActivitesGrid from './activity-grid';


// import required modules
export default function ActivitiesSlider() {
    return (
        <div className='w-screen h-fit'>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className=" mb-11"
            >
                <SwiperSlide><ActivitesGrid /></SwiperSlide>
                <SwiperSlide><ActivitesGrid /></SwiperSlide>
                <SwiperSlide><ActivitesGrid /></SwiperSlide>
            </Swiper>
        </div>
    );
}