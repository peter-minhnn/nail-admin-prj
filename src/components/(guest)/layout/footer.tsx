import { navigation } from '@/entities/(guest)'
import { useIntl } from 'react-intl'
import FacebookIcon from './facebook'
import InstagramIcon from './instagram'
import TiktokIcon from './tiktok'

export function Footer() {
  const intl = useIntl()
  return (
    <div className='bg-footer relative flex w-full flex-col items-center px-6 pb-2'>
      <div className='mt-5 flex w-full max-w-screen-xl grid-cols-1 flex-col items-center justify-center gap-10 pt-10 sm:grid sm:items-baseline sm:justify-start lg:grid-cols-5'>
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
                DÉJÀ VU NAIL & SPA
              </span>
            </a>
          </div>

          <div className='mt-4 max-w-md text-start text-black dark:text-gray-400 sm:text-left'>
            {intl.formatMessage({ id: 'homeGuest.footer.storeDescription' })}
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
          <div className='mt-5 flex h-[60px] items-center space-x-5 text-black'>
            <a
              href='https://web.facebook.com/deja.vu.nail.spa.room'
              target='_blank'
              rel='noopener'
              aria-label='dejavu nail & spa facebook'
            >
              <span className='sr-only'>Facebook</span>
              <FacebookIcon width={40} height={40} />
            </a>
            <a
              href=' https://www.tiktok.com/@dejavunailspa?_t=ZS-8vsS7dMJtty&_r=1 '
              target='_blank'
              rel='noopener'
              aria-label='dejavu nail & spa tiktok'
            >
              <span className='sr-only'>Tiktok</span>
              <TiktokIcon width={40} height={40} />
            </a>
            <a
              href='https://www.instagram.com/deja_vu_nail_spa?igsh=YnFsajc0ODllbmJj '
              target='_blank'
              rel='noopener'
              aria-label='dejavu nail & spa instagram'
            >
              <span className='sr-only'>Instagram</span>
              <InstagramIcon width={40} height={40} />
            </a>
            <a
              href='https://www.google.com/search?sca_esv=71184720c2de0b63&rlz=1C1GCEA_enVN1017VN1017&sxsrf=AHTn8zreUvV7x-1_lCnvNSX4_O6lCO0vmg:1745740763522&q=D%C3%A9j%C3%A0+Vu+Nail+%26+Spa&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBtmuEdhfywyzhendkLDnhcplOw24T1Nea9214smElZgKMnNKMLpgnaL3bkvfuk-tTHKr0t9MCrwp6EZcBQZh91GDgw7AfFki66u7GMViBhyhXDek7YYaVqrFX9VDTa3sb5P-9aVaV8pE1We4VYZ1-QMAaAC31o2pDurRLMsfcFQeUYISpw&sa=X&ved=2ahUKEwjWqdGQ3_eMAxXTdfUHHTNxK4AQ0pQJegQIEBAB&biw=767&bih=730&dpr=1.25'
              target='_blank'
              rel='noopener'
              aria-label='dejavu nail & spa google map'
            >
              <img src='/images/googlemap.png' height={40} width={40} alt='' />
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
