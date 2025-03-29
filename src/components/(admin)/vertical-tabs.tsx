'use client'

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import { Button, Card, CardContent } from '@/components/(admin)/ui'

export default function VerticalTabs({
  tabs,
  setActiveTab,
}: Readonly<{
  tabs: string[]
  setActiveTab: Dispatch<SetStateAction<string>>
}>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center ${isDarkMode ? 'dark bg-[#0e0f11]' : ''}`}
    >
      <Card
        className={`relative flex h-[100px] w-full max-w-[1200px] items-center justify-center border-none shadow-none ${isDarkMode ? 'bg-transparent' : ''}`}
      >
        <Button
          variant='ghost'
          size='icon'
          className='absolute right-4 top-4'
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className='h-[1.2rem] w-[1.2rem]' />
          ) : (
            <Moon className='h-[1.2rem] w-[1.2rem]' />
          )}
        </Button>
        <CardContent className='p-0'>
          <div className='relative'>
            {/* Hover Highlight */}
            <div
              className='absolute flex h-[30px] items-center rounded-[6px] bg-[#0e0f1114] transition-all duration-300 ease-out dark:bg-[#ffffff1a]'
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className='absolute bottom-[-6px] h-[2px] bg-[#0e0f11] transition-all duration-300 ease-out dark:bg-white'
              style={activeStyle}
            />

            {/* Tabs */}
            <div className='relative flex items-center space-x-[6px]'>
              {tabs.map((tab, index) => (
                <button
                  type='button'
                  key={tab}
                  ref={(el: any) => (tabRefs.current[index] = el)}
                  className={cn(
                    'h-[30px] cursor-pointer px-3 py-2 transition-colors duration-300',
                    {
                      'text-[#0e0e10] dark:text-white': index === activeIndex,
                      'text-[#0e0f1199] dark:text-[#ffffff99]':
                        index !== activeIndex,
                    }
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setActiveIndex(index)
                    setActiveTab(tab)
                  }}
                >
                  <div className='flex h-full items-center justify-center whitespace-nowrap text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5'>
                    {tab}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
