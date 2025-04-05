export default function ContactMap() {
  return (
    <div className='w-full px-10 md:px-44'>
      <iframe
        title='Google Map'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086167!2d144.9537353155044!3d-37.81627944202164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43fdf51b0f%3A0x5045675218cee17!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1642345678901'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        className='h-fit w-full rounded-lg md:h-[588px]'
      />
    </div>
  )
}
