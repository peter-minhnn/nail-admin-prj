interface ProductSectionHeaderProps {
  onNextClick: () => void
  onPreviousClick: () => void
  title: string
  description?: string
  leftSide?: boolean
}

export default function ProductSectionHeader(
  props: Readonly<ProductSectionHeaderProps>
) {
  const ControlButton = ({
    goPrev,
    goNext,
  }: {
    goPrev: () => void
    goNext: () => void
  }) => {
    return (
      <div className={`mx-4 flex w-fit items-end gap-8`}>
        <button onClick={goPrev} type='button' title='Previous'>
          <img
            alt=''
            srcSet='/images/svg/arrow_left.svg'
            className='h-[40px] w-[40px] transition-transform duration-300 hover:scale-110'
          />
        </button>
        <button onClick={goNext} type='button' title='Next'>
          <img
            alt=''
            srcSet='/images/svg/arrow_right.svg'
            className='h-[40px] w-[40px] transition-transform duration-300 hover:scale-110'
          />
        </button>
      </div>
    )
  }

  return (props.leftSide ?? true) ? (
    <div className='h-fit w-full flex-col px-4 md:pl-20 lg:pl-44'>
      <p className={`philosopher-regular text-7xl`}>{props.title}</p>
      <div className='flex w-full flex-1 flex-col justify-between gap-9 md:flex-row'>
        <p className={`roboto-regular w-full flex-1 *:text-base`}>
          {props.description}
        </p>
        <div className='w-fit'>
          <ControlButton
            goNext={props.onNextClick}
            goPrev={props.onPreviousClick}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex h-fit w-full flex-1 flex-col items-end justify-end px-4'>
      <p className={`philosopher-regular w-fit text-7xl`}>{props.title}</p>
      <div className='flex w-full flex-col justify-between gap-9 md:flex-row'>
        <div className='w-fit'>
          <ControlButton
            goNext={props.onNextClick}
            goPrev={props.onPreviousClick}
          />
        </div>
        <p className={`roboto-regular w-fit flex-1 text-end text-base`}>
          {props.description}
        </p>
      </div>
    </div>
  )
}
