import { useEffect, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { navigation } from '@/entities/(guest)'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavbarProps = {
  fixedHeader?: boolean
}

export const Navbar = ({ fixedHeader }: Readonly<NavbarProps>) => {
  const location = useLocation()
  const pathname = location.pathname
  const [showHeader, setShowHeader] = useState<boolean>(true)
  const [topNum, setTopNum] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY = window.scrollY
      setTopNum(lastScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={cn('sticky-header fixed top-0 z-[9999] w-full', {
        'show bg-transparent': showHeader,
        '!bg-[#F2F1ED] !bg-opacity-70 shadow-lg !backdrop-blur-md': fixedHeader,
        'bg-[#F2F1ED] !bg-opacity-70 shadow-lg !backdrop-blur-md':
          showHeader && topNum > 100,
      })}
    >
      <nav className='container relative mx-auto flex flex-wrap items-center justify-between p-4 lg:justify-between xl:px-1'>
        {/* Logo  */}
        <a href='/'>
          <span className='flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100'>
            <img src='/images/svg/logo.svg' width={48} height={48} alt='logo' />
          </span>
        </a>

        {/* Menu */}
        <div className='flex items-center space-x-1 md:order-2 md:hidden md:space-x-0 rtl:space-x-reverse'>
          <button
            data-collapse-toggle='mobile-menu'
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F1ED] p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='mobile-menu'
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            {isOpen ? (
              <X className='block h-6 w-6' aria-hidden='true' />
            ) : (
              <Menu className='block h-6 w-6' aria-hidden='true' />
            )}
          </button>
        </div>
        <div
          className='hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'
          id='navbar-language'
        >
          <ul className='mt-4 flex flex-col justify-end rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse'>
            {navigation.map((menu) => (
              <li key={menu.name}>
                <a
                  href={menu.href}
                  className={cn(
                    'hover:active-menu block rounded-sm bg-blue-700 px-3 py-2 md:bg-transparent md:p-0',
                    {
                      'active-menu': menu.href === pathname,
                      'text-white': showHeader && topNum <= 100,
                      'text-gray-900 dark:text-gray-100': fixedHeader,
                    }
                  )}
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn('md:hidden', isOpen ? 'block' : 'hidden')}>
        <div className='space-y-1 border-t border-gray-200 bg-[#F2F1ED] bg-opacity-70 px-2 pb-3 pt-2 shadow-lg !backdrop-blur-md sm:px-3'>
          {navigation.map((menu) => (
            <Link
              key={menu.href}
              to={menu.href}
              className={cn(
                'block rounded-md px-3 py-2 text-center text-base font-medium text-gray-900 transition-colors hover:bg-gray-100',
                {
                  'active-menu': menu.href === pathname,
                }
              )}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
