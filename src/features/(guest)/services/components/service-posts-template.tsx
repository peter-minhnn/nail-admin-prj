import AlbumPublicItemView from "@/components/(guest)/layout/post-item";
import { PostPublicType } from "@/entities/(guest)/post";
import { useIntl } from "react-intl";

interface ServicePostsTemplate {
    hasLaber: boolean,
    items: PostPublicType[]
}

export default function ServicePostsTemplate(props: Readonly<ServicePostsTemplate>) {
    const intl = useIntl()
    return <div className='h-fit w-screen gap-8'>
        <div className='sm:mx-16 mx-6 flex-col'>
            <div className={`mb-8 grid min-h-screen grid-cols-1 row-span-7 gap-8 lg:min-h-[300px] ${(props.hasLaber ?? true) ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
                <p className={`${(props.hasLaber ?? true) ? "flex" : "hidden"} philosopher-regular  text-7xl row-span-1`}>
                    {intl.formatMessage({ id: 'guest.common.service' })}
                </p>
                <AlbumPublicItemView className={`h-full w-full row-span-3`} data={props.items[0]} />
                <AlbumPublicItemView className={`h-full w-full row-span-3`} data={props.items[1]} />
            </div>
            <div className={`grid min-h-screen w-full grid-cols-1 gap-8 lg:min-h-[416px] ${props.items.length < 5 ? "lg:grid-cols-1" : "lg:grid-cols-2"}`}>
                <div className='flex h-full w-full flex-1'>
                    {props.items.length < 3 ? (
                        <div />
                    ) : props.items.length > 2 && (props.items.length < 5) ? (<div className="lg:h-[416px] flex-col lg:flex-row w-full flex gap-6">
                        <AlbumPublicItemView className={`h-full w-full`} data={props.items[2]} />
                        <AlbumPublicItemView className={`h-full w-full`} data={props.items[3]} />
                    </div>) : (
                        <div className='flex h-full w-full flex-1 flex-col gap-6'>
                            <AlbumPublicItemView className={`h-full w-full`} data={props.items[2]} />
                            <AlbumPublicItemView className={`h-full w-full`} data={props.items[3]} />
                        </div>
                    )}
                </div>
                {props.items.length < 5 ? (
                    null
                ) : (
                    <div className='lg:flex-row flex-col flex h-full w-full flex-1 gap-8'>
                        <AlbumPublicItemView className={`h-full w-full`} data={props.items[4]} />
                        <AlbumPublicItemView className={`h-full w-full`} data={props.items[5]} />
                    </div>
                )}
            </div>
        </div>
    </div>;
}