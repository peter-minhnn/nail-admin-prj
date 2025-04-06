import { useEffect, useState } from 'react'
import { menuRoutes } from '@/entities/(guest)/routes.ts'
import get from 'lodash/get'
import { useIntl } from 'react-intl'
import Banner from '@/components/(guest)/layout/banner'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { useGetAlbums } from '@/features/(guest)/hook/use-guest-queries'
import { AlbumPublicType } from '@/entities/(guest)/album'
import { AlbumDetailDialog } from './components/album-detail-dialog'
export default function AlbumComponent() {
    const intl = useIntl()

    const [albums, setAlbums] = useState<AlbumPublicType[]>([]);
    const { data, status, isRefetching } = useGetAlbums()
    const [open, setOpen] = useState<boolean>(false)

    const [currentAlbum, setCurrentAlbum] = useState<AlbumPublicType | undefined>(undefined)

    useEffect(() => {
        if (status === 'pending' || isRefetching) return
        const list = get(data, ['data'], [])
        setAlbums(list)
    }, [data, status, isRefetching])


    return (
        <div>
            <div className={`w-screen  overflow-hidden ${open ? "fixed" : ""}`}>
                <PageContainer
                    title={intl.formatMessage({ id: 'guest.common.product' })}
                    description={intl.formatMessage({ id: 'guest.common.product' })}
                    canonical={menuRoutes.album}
                    image={'/images/bg-home.png'}>
                    <Banner path={""}>
                        <Navbar />
                        <div className='pt-20 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EFE5D2]'>
                            <p className='philosopher-regular text-7xl'>BỘ SƯU TẬP</p>
                            <p className='philosopher-regular text-7xl text-[#E48E43]'>DEJÀ VU</p>
                            <img
                                className='my-7 flex-1 object-contain'
                                srcSet='/images/hompage_footer_2.png'
                                alt=''
                            />
                        </div>
                    </Banner>
                    <div className='grid grid-cols-1 md:grid-cols-4 w-full h-fit gap-7  mx-6 md:mx-12 my-32'>
                        {albums.map((item, index) => {
                            const remainingItems = albums.length % 4;
                            const isLastRow = index >= albums.length - remainingItems;
                            return <div key={item.id} onClick={() => {
                                setCurrentAlbum(item);
                                setOpen(true);
                            }} className={`relative h-[300px] rounded shadow-md overflow-hidden flex items-center justify-center ${index >= albums.length - 2 ? "col-span-2" : ""} ${isLastRow ? `col-span-${4 / remainingItems}` : ""}`}>
                                <img className='h-full w-full object-cover ' src={item.thumbnail} />
                                <p className="absolute text-white text-xl font-bold transition-transform duration-300 transform hover:scale-150 hover:translate-y-0">{item.name}</p>
                            </div>
                        })}
                    </div>
                </PageContainer >

            </div>
            {open && <AlbumDetailDialog data={currentAlbum!} setOpen={setOpen} open={open} />}
        </div>
    )
}

{/*  */ }