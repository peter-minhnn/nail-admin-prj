import { useEffect, useState } from 'react'
import ContactButton from './contact-button'

export default function ContactButtonGroup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`fixed bottom-10 right-4 z-[9999] flex flex-col gap-3`}>
      <ContactButton type='facebook' />
      <ContactButton type='zalo' />
      <ContactButton type='phone' />
      <button
        onClick={scrollToTop}
        className={` ${visible ? 'scale-105 opacity-100' : 'hidden scale-75 opacity-0'} h-12 w-12 rounded-full bg-white p-3 text-orange-500 shadow-lg transition-transform duration-300 hover:scale-110`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M5 15l7-7 7 7'
          />
        </svg>
      </button>
    </div>
  )
}
