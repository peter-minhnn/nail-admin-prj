import ContactButton from "./contact-button";
import ScrollToTopButton from "./scroll-to-top-button";

export default function ContactButtonGroup() {
    return <div className={`flex flex-col fixed bottom-10 right-4 z-[50000] gap-3`}>
        <ContactButton type='facebook' />
        <ContactButton type='zalo' />
        <ContactButton type='phone' />
        <ScrollToTopButton />
    </div >
}