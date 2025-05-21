import { useEffect, useState } from "react";
import ContactButton from "./contact-button";

export default function ContactButtonGroup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return <div className={`flex flex-col fixed bottom-10 right-4 z-[50000] gap-3`}>
        <ContactButton type='facebook' />
        <ContactButton type='zalo' />
        <ContactButton type='phone' />
        <button onClick={scrollToTop} className={` ${visible ? 'opacity-100 ' : 'hidden opacity-0'} h-12 w-12 bg-white text-orange-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    </div >
}