interface ContactTextProps {
  label: string
  value: string
  hint?: string
}

export default function ContactTextInfo(props: Readonly<ContactTextProps>) {
  return (
    <div className='h-fit w-full flex-col'>
      <div className='mb-4 flex items-center gap-2'>
        <p className='roboto-bold text-base font-bold'>{props.label}</p>
        {props.hint && (
          <span className='roboto-bold text-base font-bold'>({props.hint})</span>
        )}
      </div>
      <p className='roboto-light text-base font-bold'>{props.value}</p>
    </div>
  )
}
