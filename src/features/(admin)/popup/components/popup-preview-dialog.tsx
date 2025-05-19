import { FC } from 'react'
import { IconArrowRight, IconX } from '@tabler/icons-react'
import { FormattedMessage } from 'react-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from '@/lib/utils.ts'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
import { Button } from '@/components/(admin)/ui'
import { PopupDataType } from '@/features/(admin)/popup/data/schema.ts'

type PreviewType = 'new' | 'saved'

type PopupPreviewDialogProps = {
  currentRow: PopupDataType | null
  files: File[]
  previewType: PreviewType
  onClose: () => void
}

export const PopupPreviewDialog: FC<Readonly<PopupPreviewDialogProps>> = (
  props
) => {
  const { currentRow, files, previewType, onClose } = props

  return (
    <div
      id='progress-modal'
      tabIndex={-1}
      className='fixed inset-0 z-[999] flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden rounded-lg bg-black/80'
    >
      <div className='relative max-h-full w-full max-w-md p-4'>
        <div className='relative rounded-2xl bg-white shadow-sm'>
          <div className='flex h-full flex-col justify-between'>
            <div className='flex w-full'>
              {currentRow?.type === 'image' ? (
                <Swiper
                  allowTouchMove
                  grabCursor
                  spaceBetween={10}
                  slidesPerView={1}
                  className='h-auto w-full'
                >
                  {previewType === 'new' &&
                    files.map((src, idx: number) => (
                      <SwiperSlide key={`${src.name}${idx}`}>
                        <img
                          src={URL.createObjectURL(src)}
                          alt={`Slide ${idx + 1}`}
                          className='h-full w-full rounded-tl-2xl rounded-tr-2xl object-cover'
                        />
                      </SwiperSlide>
                    ))}

                  {previewType === 'saved' && currentRow?.image && (
                    <SwiperSlide key={currentRow?.image}>
                      <img
                        src={currentRow?.image}
                        alt={currentRow?.image}
                        className='h-full w-full rounded-tl-2xl rounded-tr-2xl object-cover'
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
              ) : null}
              {currentRow?.type === 'content' && (
                <div className='flex w-full flex-col gap-2 p-4'>
                  <img
                    alt=''
                    src='/images/logo.svg'
                    className='mb-4 h-14 w-full text-center'
                  />
                  <h2 className='text-center text-2xl font-bold tracking-tight'>
                    {currentRow?.title}
                  </h2>
                  <div className='popup'>
                    <QuillEditor
                      value={currentRow?.content as string}
                      readOnly
                      hideToolbar
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              className={cn('flex h-14 w-full justify-between', {
                hidden: currentRow?.type !== 'image',
              })}
            >
              <div className='flex items-center gap-4 p-4'>
                <input type='checkbox' id='dontShow' />
                <label htmlFor='dontShow' className='text-sm'>
                  <FormattedMessage id='popup.dontShowAgain' />
                </label>
              </div>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                className='h-14 rounded-none rounded-br-2xl bg-amber-700 text-white hover:bg-amber-600'
              >
                <IconX size={18} color='#FFF' />
              </Button>
            </div>
            <div
              className={cn('flex h-14 w-full justify-center pb-4', {
                hidden: currentRow?.type !== 'content',
              })}
            >
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                className='rounded-none bg-amber-700 text-white hover:bg-amber-600 hover:text-white'
              >
                <FormattedMessage id='popup.closePreview' />
                <IconArrowRight size={18} color='#FFF' className='-rotate-45' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
