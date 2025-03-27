import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { PostsFilterParams } from '@/types';
import { GuestPostDataType, GuestPostsListSchema } from '@/entities/(guest)/post';
import { useGetPosts } from '@/features/(guest)/hook/use-guest-queries';
import get from 'lodash/get';
import ActivitesGrid from './activity-grid';

export default function ActivitiesSlider() {

    const [filterParams] = useState<PostsFilterParams>({
        postType: "activity",
        page: 1,
        take: 40,
    })

    const [activitiesGroup, setActivitiesGroup] = useState<GuestPostDataType[][]>([]);
    const { data, status, isRefetching } = useGetPosts(filterParams)

    useEffect(() => {
        if (status === 'pending' || isRefetching) return
        const list = get(data, ['list'], [])
        setActivitiesGroup(splitList(GuestPostsListSchema.parse(list)));
    }, [data, status, isRefetching, activitiesGroup])

    function splitList<T>(list: T[]): T[][] {
        let result: T[][] = [];

        for (let i = 0; i < list.length; i += 6) {
            result.push(list.slice(i, i + 6));
        }

        return result;
    }


    return (
        <div className='w-screen h-fit'>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className=" mb-11 bg-transparent"
            >
                {activitiesGroup.map((item) => {
                    return <ActivitesGrid items={item} />
                })}
            </Swiper>
        </div>
    );
}