import { Container } from '@/components/(guest)/layout/container.tsx'
import PageContainer from '@/components/(guest)/layout/page-container.tsx'
import { Navbar } from '@/components/(guest)/layout/nav-bar'
import { useIntl } from 'react-intl'
import { useEffect, useState } from 'react'
import { GuestPostDataType } from '@/entities/(guest)/post'
import { useGetPostDetail } from '../hook/use-guest-queries'
import get from 'lodash/get'

export default function PostDetailComponent() {
    const intl = useIntl();
    const [postDetail, setPostDetail] = useState<GuestPostDataType>()
    const { data, status, isRefetching } = useGetPostDetail(3)///hard post id

    useEffect(() => {
        if (status === 'pending' || isRefetching) return
        const result = get(data, ['data'])
        setPostDetail(result);
    }, [data, status, isRefetching])

    return (
        <PageContainer
            title={intl.formatMessage({ id: 'guest.common.service' })}
            description={intl.formatMessage({ id: 'guest.common.service' })}
            canonical="/"
            image={''}>
            <Container fixedHeader>
                <div className='relative z-[9999] h-[100px] w-full bg-cover bg-center  bg-[#EFE5D2]'>
                    <Navbar />
                </div>
                <div className='grid min-h-[100px]items-center justify-items-center bg-[#F2F1ED]'>
                    <div className='min-h-screen w-screen ' dangerouslySetInnerHTML={{ __html: postDetail?.content ?? "" }} />
                </div>
            </Container>
        </PageContainer>
    )
}
