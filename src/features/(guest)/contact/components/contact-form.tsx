import { useIntl } from 'react-intl'
import Button from '@/components/(guest)/layout/button'

export default function ContactForm() {
  const intl = useIntl()
  return (
    <div className='h-fit w-screen'>
      <p className='text-center font-philosopher text-7xl'>
        {intl.formatMessage({ id: 'guest.contact.contactUs' })}
      </p>
      <div className='grid h-fit w-screen grid-cols-1 grid-rows-2 px-10 py-16 md:grid-cols-3 md:grid-rows-1 md:px-44'>
        <div className='col-span-1 flex h-full w-full flex-col gap-9'>
          {textInfo(
            intl.formatMessage({ id: 'guest.contact.email' }),
            'HaiKC@dejavunailspa.net'
          )}
          {textInfo(
            intl.formatMessage({ id: 'guest.contact.phone' }),
            '+84 98 982 10 42'
          )}
          {textInfo(
            intl.formatMessage({ id: 'guest.contact.address' }),
            '839/3 Lê Hồng Phong Phường 12, Quận 10 TP. Hồ Chí Minh'
          )}
          {socialView()}
        </div>
        <div className='col-span-2 flex h-full w-full flex-col items-start gap-7 px-0 md:px-32'>
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderName' })
          )}
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderPhone' })
          )}
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderEmail' })
          )}
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderAddress' })
          )}
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderTopic' })
          )}
          {inputView(
            intl.formatMessage({ id: 'guest.contact.placeholderContent' })
          )}
          <div className='flex w-full items-end justify-end'>
            <Button
              title={intl.formatMessage({ id: 'guest.contact.submitRequest' })}
            />
          </div>
        </div>
      </div>
      {mapView()}
    </div>
  )

  function textInfo(label: string, value: string) {
    return (
      <div className='h-fit w-full flex-col'>
        <p className='roboto-bold mb-4 text-base font-bold'>{label}</p>
        <p className='roboto-light text-base font-bold'>{value}</p>
      </div>
    )
  }

  function socialView() {
    return (
      <div className='h-fit w-full flex-col'>
        <p className='roboto-bold mb-4 text-base font-bold'>
          {intl.formatMessage({ id: 'guest.contact.social' })}
        </p>
        <div className='flex gap-4'>
          <img srcSet='/images/svg/ic-fb.svg' />
          <img srcSet='/images/svg/ic-insta.svg' />
          <img srcSet='/images/svg/ic-ticktok.svg' />
        </div>
      </div>
    )
  }

  function inputView(placeholder: string) {
    return (
      <div className='flex w-full flex-col items-center'>
        <input
          value=''
          type='text'
          placeholder={placeholder}
          className='w-full border-b-2 border-gray-300 bg-transparent p-2 outline-none focus:border-orange-500'
        />
      </div>
    )
  }
  function mapView() {
    return (
      <div className='w-full px-10 md:px-44'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086167!2d144.9537353155044!3d-37.81627944202164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43fdf51b0f%3A0x5045675218cee17!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1642345678901'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='h-fit w-full rounded-lg md:h-[588px]'
        ></iframe>
      </div>
    )
  }
}
