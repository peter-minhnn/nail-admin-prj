import { navigation } from '@/entities/(guest)'
import FacebookIcon from './facebook'
import InstagramIcon from './instagram'
import TiktokIcon from './tiktok'

export function Footer() {
  return (
    <div className='bg-footer relative flex w-full flex-col items-center px-6 pb-2'>
      <div className='mx-auto mt-5 grid max-w-screen-xl grid-cols-1 gap-10 pt-10 lg:grid-cols-5'>
        <div className='lg:col-span-2'>
          <div>
            {' '}
            <a
              href='/'
              className='flex items-center space-x-2 text-2xl font-medium text-blue-500 dark:text-gray-100'
            >
              <img
                src='/images/svg/logo.svg'
                alt='N'
                width={40}
                height={40}
                className='h-auto w-auto'
              />
              <span className='text-4xl font-semibold uppercase'>DeJa Vu</span>
            </a>
          </div>

          <div className='mt-4 max-w-md text-black dark:text-gray-400'>
            DeJa Vu nail spa is a landing page
          </div>
        </div>

        <div className='col-span-2 flex w-full flex-1'>
          <div className='grid w-full grid-cols-1 md:grid-cols-2'>
            {navigation.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className='dark:focus:bg-trueGray-700 w-full rounded-md py-2 text-black hover:text-orange-500 focus:bg-orange-50 focus:text-orange-500 focus:outline-none dark:text-gray-300 lg:px-4'
                >
                  {item.name}
                </a>
              )
            })}
          </div>
        </div>
        <div className=''>
          <div className='py-2'>Follow us</div>
          <div className='mt-5 flex space-x-5 text-black'>
            <a href='https://facebook.com' target='_blank' rel='noopener'>
              <span className='sr-only'>Facebook</span>
              <FacebookIcon width={40} height={40} />
            </a>
            <a href='https://tiktok.com' target='_blank' rel='noopener'>
              <span className='sr-only'>Tiktok</span>
              <TiktokIcon width={40} height={40} />
            </a>
            <a href='https://instagram.com/' target='_blank' rel='noopener'>
              <span className='sr-only'>Instagram</span>
              <InstagramIcon width={40} height={40} />
            </a>
          </div>
        </div>
      </div>

      <div className='my-10 text-center text-sm text-gray-600 dark:text-gray-400'>
        Copyright © {new Date().getFullYear()}. Made with ♥ by{' '}
        <a
          href='https://genie-solution-prj.vercel.app'
          target='_blank'
          rel='noopener'
        >
          Genie Solution.
        </a>{' '}
      </div>
    </div>
  )
}
