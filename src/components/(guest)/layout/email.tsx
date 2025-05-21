import type { SVGProps } from 'react'

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        height='1em'
        width='1em'
        {...props}
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 12l-4-4-4 4m0 0l4 4 4-4m-4-4v8"
        />
    </svg>
)

export default EmailIcon
