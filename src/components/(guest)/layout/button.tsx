interface ButtonProps {
  title?: string
  width?: string
  height?: string
  size?: string
  onClick?: () => void
}

// const roboto = Roboto({
//   weight: '400',
//   variable: '--font-allura',
//   subsets: ['latin'],
// });
export default function Button(props: Readonly<ButtonProps>) {
  return (
    <div
      onClick={props.onClick}
      className='hover: w-fit rounded-sm bg-[#E48E43] px-10 py-3'
    >
      <p className={`text-base text-white`}>{props.title}</p>
    </div>
  )
}
