import { useIntl } from 'react-intl'

export default function ContactSocialView() {
  const intl = useIntl()
  return (
    <div className='h-fit w-full flex-col'>
      <p className='roboto-bold mb-4 text-base font-bold'>
        {intl.formatMessage({ id: 'guest.contact.social' })}
      </p>
      <div className='flex gap-4'>
        <img srcSet='/images/svg/ic-fb.svg' alt='facebook' />
        <img srcSet='/images/svg/ic-insta.svg' alt='insta' />
        <img srcSet='/images/svg/ic-tiktok.svg' alt='tiktok' />
      </div>
    </div>
  )
}
