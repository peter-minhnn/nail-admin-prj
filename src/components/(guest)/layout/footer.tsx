import { navigation } from '@/entities/(guest)'
import FacebookIcon from './facebook'
import InstagramIcon from './instagram'
import TiktokIcon from './tiktok'

export function Footer() {
  return (
    <div className='bg-footer relative flex w-full flex-col items-center px-6 pb-2'>
      <div className='mt-5 flex w-full max-w-screen-xl grid-cols-1 flex-col items-center sm:items-baseline justify-center sm:justify-start gap-10 pt-10 sm:grid lg:grid-cols-5'>
        <div className='mx-auto w-full lg:col-span-2'>
          <div className='flex justify-center sm:justify-start'>
            {' '}
            <a
              href='/'
              className='flex items-center space-x-2 text-2xl font-medium dark:text-gray-100'
            >
              <img
                src='/images/svg/logo.svg'
                alt='N'
                width={40}
                height={40}
                className='h-auto w-auto'
              />
              <span className='text-center text-2xl font-semibold uppercase text-black/80 sm:text-left sm:text-4xl'>
                DeJaVu Nail spa
              </span>
            </a>
          </div>

          <div className='mt-4 max-w-md text-center text-black dark:text-gray-400 sm:text-left'>
            DeJa Vu nail spa is a landing page
          </div>
        </div>

        <div className='col-span-2 flex w-full flex-1'>
          <div className='flex w-full flex-grow flex-row flex-wrap justify-center gap-4 sm:grid md:grid-cols-2'>
            {navigation.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className='dark:focus:bg-trueGray-700 w-fit max-w-max rounded-md py-2 text-black hover:text-orange-500 focus:bg-orange-50 focus:text-orange-500 focus:outline-none dark:text-gray-300 lg:px-4'
                >
                  {item.name}
                </a>
              )
            })}
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center sm:justify-start'>
          <div className='py-2'>Liên kết với chúng tôi</div>
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
