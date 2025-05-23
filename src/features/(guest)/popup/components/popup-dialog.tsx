import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { usePopupStore } from '@/stores/popup-store'
import { PopupDataType } from '@/features/(admin)/popup/data/schema'
import { useGetPopupsPublished } from '@/features/(admin)/popup/hooks/use-queries'
import PopupContent from './popup-content'
import PopupImage from './popup-image'

export default function PopupDialog() {
  const [popupsData, setPopupsData] = useState<PopupDataType>()

  const { data, status, isRefetching } = useGetPopupsPublished()

  const [doNotShowToday, setDoNotShowToday] = useState(false)

  const skipToDay = usePopupStore((s) => s.skipToDay)
  const closePopup = usePopupStore((s) => s.closePopup)
  const intl = useIntl()
  const handleClose = () => {
    closePopup()
  }

  const handleSkipShowToday = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setDoNotShowToday(e.target.checked)
    const isSkip: boolean = e.target.checked as boolean
    skipToDay(isSkip)
  }

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    if (data?.data) {
      setPopupsData(data?.data)
    }
  }, [data, status, isRefetching])

  if (popupsData == null) return null
  return (
    <div className='fixed inset-0 z-[99999] flex items-center justify-center bg-black/10'>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className='flex h-full w-full items-center justify-center'
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
          }}
          className='flex max-h-[90%] w-[90%] max-w-[600px] items-center justify-center overflow-hidden rounded-3xl'
        >
          <div className='flex h-fit w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-3xl bg-white p-[2px]'>
            <div className='h-f w-full overflow-hidden rounded-3xl'>
              <div className='flex flex-1'>
                {popupsData.type === 'image' ? (
                  <PopupImage popup={popupsData} />
                ) : (
                  <PopupContent popup={popupsData} />
                )}
              </div>
              <div className='flex h-[60px] w-full flex-row'>
                <div className='flex flex-1 items-center gap-2 bg-gray-50 px-3'>
                  <label className='flex cursor-pointer items-center gap-2'>
                    <input
                      id='doNotShow'
                      type='checkbox'
                      checked={doNotShowToday}
                      onChange={handleSkipShowToday}
                      className='peer hidden'
                    />
                    <div className='border-grey-500 flex h-5 w-5 items-center justify-center rounded-sm border-2 peer-checked:border-orange-500 peer-checked:bg-orange-500'>
                      <svg
                        className='h-5 w-5 text-white peer-checked:block'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                    </div>
                    <span className='font-roboto text-xs md:text-xs lg:text-base'>
                      {intl.formatMessage({ id: 'popup.publish.skipToDay' })}
                    </span>
                  </label>
                </div>

                <button
                  className='flex w-[60px] items-center justify-center bg-orange-500 hover:bg-orange-700'
                  onClick={handleClose}
                >
                  <img
                    src='/images/svg/ic-close.svg'
                    alt='btnClose'
                    className='h-fit w-fit'
                  />
                </button>
              </div>
            </div>
          </div>
        </button>
      </button>
    </div>
  )
}
