type ButtonType = 'zalo' | 'facebook' | 'phone'

interface ButtonWithIconProps {
    type: ButtonType
}

const ICONS: Record<ButtonType, string> = {
    zalo: '/images/svg/ic-zalo.svg',
    facebook: '/images/svg/ic-messenger.svg',
    phone: '/images/svg/ic-phone.svg',
}

const BACKGROUND: Record<ButtonType, string> = {
    zalo: 'bg-gray-200',
    facebook: 'bg-blue-200',
    phone: 'bg-orange-300',
}

const CONTACT_LINK: Record<ButtonType, string> = {
    zalo: 'https://zalo.me/0357369226',
    facebook: 'https://m.me/deja.vu.nail.spa.room',
    phone: 'tel:0357369226',
}
export default function ButtonWithIcon({ type }: ButtonWithIconProps) {
    const icon = ICONS[type]
    const backgroundColor = BACKGROUND[type]
    const contactLink = CONTACT_LINK[type]

    return (
        <a className="relative p-[3px] rounded-full transition-transform duration-200 hover:scale-105 hover:shadow-lg" href={contactLink} >
            <div className={`rounded-full animate-pulse w-12 h-12 ${backgroundColor}`} />
            <div className=" absolute inset-0 rounded-full p-2">
                <img src={icon} alt={type} className="w-10 h-10" />
            </div>
        </a >
    )
}