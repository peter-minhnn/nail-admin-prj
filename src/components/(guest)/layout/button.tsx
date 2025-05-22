interface ButtonProps {
  title?: string
  width?: string
  height?: string
  size?: string
  onClick?: () => void
}

export default function Button(props: Readonly<ButtonProps>) {
  return (
    <button
      type='button'
      onClick={props.onClick}
      className='hover: w-fit rounded-sm bg-[#E48E43] px-10 py-3'
    >
      <p className={`text-base text-white`}>{props.title}</p>
    </button>
  )
}
