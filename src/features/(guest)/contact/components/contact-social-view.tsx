import { useIntl } from 'react-intl'

export default function ContactSocialView() {
  const intl = useIntl()
  return (
    <div className='h-fit w-full flex-col'>
      <p className='roboto-bold mb-4 text-base font-bold'>
        {intl.formatMessage({ id: 'guest.contact.social' })}
      </p>
      <div className='flex gap-4'>
        <button
          onClick={() => {
            window.open(
              'https://web.facebook.com/deja.vu.nail.spa.room',
              '_blank'
            )
          }}
          type='button'
        >
          <img srcSet='/images/svg/ic-fb.svg' alt='facebook' />
        </button>
        <button
          onClick={() => {
            window.open(
              'https://www.instagram.com/deja_vu_nail_spa?igsh=YnFsajc0ODllbmJj',
              '_blank'
            )
          }}
          type='button'
        >
          <img srcSet='/images/svg/ic-insta.svg' alt='insta' />
        </button>
        <button
          onClick={() => {
            window.open(
              'https://www.tiktok.com/@dejavunailspa?_t=ZS-8vsS7dMJtty&_r=1',
              '_blank'
            )
          }}
          type='button'
        >
          <img srcSet='/images/svg/ic-tiktok.svg' alt='tiktok' />
        </button>
      </div>
    </div>
  )
}
