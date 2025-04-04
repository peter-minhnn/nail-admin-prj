interface ContactTextProps {
    label: string;
    value: string;
}

export default function ContactTextInfo(props: Readonly<ContactTextProps>) {
    return (
        <div className='h-fit w-full flex-col'>
            <p className='roboto-bold mb-4 text-base font-bold'>{props.label}</p>
            <p className='roboto-light text-base font-bold'>{props.value}</p>
        </div>
    );
}