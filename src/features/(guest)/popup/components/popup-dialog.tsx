import { useEffect, useState } from 'react'
import { usePopupStore } from '@/stores/popup-store'
import { PopupDataType } from '@/features/(admin)/popup/data/schema'
import { useGetPopupsPublished } from '@/features/(admin)/popup/hooks/use-queries'

export default function PopupDialog() {
  const [popupsData, setPopupsData] = useState<PopupDataType>()

  const { data, status, isRefetching } = useGetPopupsPublished()

  const [doNotShowToday, setDoNotShowToday] = useState(false)

  const skipToDay = usePopupStore((s) => s.skipToDay)
  const closePopup = usePopupStore((s) => s.closePopup)

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
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-md'>
      <div
        className='overflow-hidden rounded-3xl bg-white p-[2px]'
        style={{ width: '30vw', height: '40vw' }}
      >
        <div className='flex h-full w-full flex-col gap-1 overflow-hidden rounded-3xl'>
          <div className='flex flex-1'>
            <img
              src={popupsData.image ?? ''}
              alt=''
              className='h-auto w-auto'
            />
          </div>
          <div className='flex h-[60px] flex-row'>
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
                  Không hiển thị lại trong hôm nay
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
    </div>
  )
}
