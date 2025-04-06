import { Link } from '@tanstack/react-router'
import { menuRoutes } from '@/entities/(guest)'
import { FormattedMessage } from 'react-intl'

export default function HomeCollects() {
  return (
    <div className='mb-20 mt-10 grid w-full sm:h-screen md:grid-cols-2'>
      <div className='flex h-full w-full overflow-hidden bg-cover'>
        <img
          className='h-full w-full object-cover'
          srcSet='/images/homepage_footer_1.png'
          alt=''
        />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EFE5D2] py-10'>
        <p className='philosopher-regular text-5xl md:text-7xl'>BỘ SƯU TẬP</p>
        <p className='philosopher-regular text-5xl text-[#E48E43] md:text-7xl'>
          DEJÀ VU
        </p>
        <img
          className='my-7 object-contain md:h-1/2 md:w-1/2'
          srcSet='/images/hompage_footer_2.png'
          alt=''
        />
        <Link to={menuRoutes.album} className='home-btn'>
          <FormattedMessage id='guest.common.more' />
        </Link>
      </div>
    </div>
  )
}
