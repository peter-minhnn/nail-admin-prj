import type React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

interface LightboxProps {
  images: string[]
  initialIndex?: number
  onClose: () => void
}

export default function Lightbox({
  images,
  initialIndex = 0,
  onClose,
}: Readonly<LightboxProps>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isOpen, setIsOpen] = useState(true)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showThumbnails, setShowThumbnails] = useState(true)

  const lightboxRef = useRef<HTMLButtonElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)

  const handlePrevious = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
      setScale(1) // Reset zoom when changing images
    },
    [images.length]
  )

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
      setScale(1) // Reset zoom when changing images
    },
    [images.length]
  )

  const handleZoomIn = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setScale((prevScale) => Math.min(prevScale + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5))
  }, [])

  const toggleFullscreen = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation()

    if (!document.fullscreenElement) {
      try {
        // Enter fullscreen
        if (lightboxRef.current) {
          await lightboxRef.current.requestFullscreen()
          setIsFullscreen(true)
        }
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err)
      }
    } else {
      try {
        // Exit fullscreen
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err)
      }
    }

    // Temporarily hide controls for a cleaner transition
    setShowControls(false)
    setTimeout(() => setShowControls(true), 1000)
  }, [])

  const toggleThumbnails = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setShowThumbnails((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    // Exit fullscreen if active when closing
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error('Error exiting fullscreen:', err)
      })
    }

    setIsOpen(false)
    setTimeout(onClose, 300) // Delay to allow animation to complete
  }, [onClose])

  const selectImage = useCallback((index: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex(index)
    setScale(1) // Reset zoom when changing images
  }, [])

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Scroll the thumbnail into view when currentIndex changes
  useEffect(() => {
    if (thumbnailsRef.current && thumbnailsContainerRef.current) {
      const container = thumbnailsContainerRef.current
      const thumbnail = thumbnailsRef.current.children[
        currentIndex
      ] as HTMLElement

      if (thumbnail) {
        const containerWidth = container.offsetWidth
        const thumbnailLeft = thumbnail.offsetLeft
        const thumbnailWidth = thumbnail.offsetWidth

        // Calculate the center position for the current thumbnail
        const scrollPosition =
          thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })
      }
    }
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          if (!document.fullscreenElement) {
            handleClose()
          }
          break
        case '+':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case 'f':
          toggleFullscreen().finally()
          break
        case 't':
          toggleThumbnails()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    handleClose,
    handleNext,
    handlePrevious,
    handleZoomIn,
    handleZoomOut,
    toggleFullscreen,
    toggleThumbnails,
  ])

  if (!images.length) return null

  return (
    <button
      type='button'
      ref={lightboxRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Main content container */}
      <button
        type='button'
        className='relative flex h-full w-full flex-col items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top toolbar */}
        <div
          className={`absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3 transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          } bg-gradient-to-b from-black/80 to-transparent`}
        >
          <div className='flex items-center gap-2'>
            <div className='text-sm font-medium text-white'>
              <span className='text-lg'>{currentIndex + 1}</span>
              <span className='mx-1 opacity-60'>/</span>
              <span className='opacity-60'>{images.length}</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={toggleThumbnails}
              className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
              aria-label={
                showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'
              }
            >
              {showThumbnails ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button
              onClick={handleClose}
              className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
              aria-label='Close lightbox'
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Image container */}
        <button
          type='button'
          className='relative flex h-full w-full items-center justify-center px-16'
          onDoubleClick={toggleFullscreen}
        >
          <img
            src={images[currentIndex] || '/placeholder.svg'}
            alt={`${currentIndex + 1}`}
            className='max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-300 ease-out'
            style={{ transform: `scale(${scale})` }}
          />
        </button>

        {/* Side navigation buttons */}
        <button
          onClick={handlePrevious}
          className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label='Previous image'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label='Next image'
        >
          <ChevronRight size={24} />
        </button>

        {/* Bottom toolbar */}
        <div
          className={`absolute left-1/2 top-6 z-[100] -translate-x-1/2 rounded-full bg-black/30 px-6 py-3 backdrop-blur-md transition-all duration-300 ${
            showControls
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <div className='flex items-center gap-6'>
            <button
              onClick={handleZoomOut}
              className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
              aria-label='Zoom out'
            >
              <ZoomOut size={20} onClick={handleZoomOut} />
            </button>

            <div className='flex items-center gap-1'>
              <div className='h-1 w-16 overflow-hidden rounded-full bg-white/30'>
                <div
                  className='h-full bg-white transition-all'
                  style={{ width: `${((scale - 0.5) / 2.5) * 100}%` }}
                ></div>
              </div>
              <span className='ml-2 text-sm text-white'>
                {Math.round(scale * 100)}%
              </span>
            </div>

            <button
              onClick={handleZoomIn}
              className='rounded-full p-2 text-white transition-colors hover:bg-white/20'
              aria-label='Zoom in'
            >
              <ZoomIn size={20} onClick={handleZoomIn} />
            </button>
          </div>
        </div>

        {/* Thumbnails slider */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-500 ease-in-out ${
            showThumbnails ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className='relative'>
            {/* Gradient overlay for thumbnails */}
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 to-transparent'></div>

            {/* Thumbnails container */}
            <div
              ref={thumbnailsContainerRef}
              className='scrollbar-hide flex overflow-x-auto px-8 py-4'
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                justifyContent: images.length <= 5 ? 'center' : 'flex-start',
              }}
            >
              <div
                ref={thumbnailsRef}
                className={`flex gap-2 pb-2 ${images.length <= 5 ? 'mx-auto' : ''}`}
              >
                {images.map((image, index) => (
                  <button
                    type='button'
                    key={image}
                    onClick={(e) => selectImage(index, e)}
                    className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${
                      currentIndex === index
                        ? 'z-10 scale-110'
                        : 'scale-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`h-16 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                        currentIndex === index
                          ? 'border-white shadow-lg shadow-white/20'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`Thumbnail ${index + 1}`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    {currentIndex === index && (
                      <div className='absolute -bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-white'></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    </button>
  )
}
