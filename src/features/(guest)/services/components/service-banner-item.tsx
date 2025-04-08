import { BannerPublicDataType } from '@/types/(guest)'

interface ServiceBannerItemProps {
  className?: string
  item?: BannerPublicDataType
}

export default function ServiceBannerItem(
  props: Readonly<ServiceBannerItemProps>
) {
  if (props.item == null) return <div />
  return (
    <img
      src={props.item.url}
      alt=''
      className={`rounded object-cover ${props.className ?? 'h-full w-full'}`}
    />
  )
}
