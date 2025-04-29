export default function LoadingPage() {
  return (
    <div
      className='flex min-h-screen items-center justify-center'
      style={{ backgroundColor: 'rgb(228 142 67 / var(--tw-bg-opacity, 1))' }}
    >
      <div className='flex flex-col items-center text-center'>
        <div className='relative mb-6 flex items-center justify-center'>
          <div className='spinner h-32 w-32'></div>
          <img
            src='/images/svg/logo.svg'
            alt='Nail Spa Logo'
            className='absolute h-20 w-20 animate-pulse'
          />
        </div>
      </div>
    </div>
  )
}
