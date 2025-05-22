import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            const shouldShow = window.scrollY > 300;
            if (shouldShow == show) return
            if (shouldShow) {
                setShow(true);
                setTimeout(() => setVisible(true), 100);
            } else {
                setVisible(false);
                setTimeout(() => setShow(false), 300);
            }
        };

        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, [show]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!show) return null;
    return (
        <button onClick={scrollToTop} className={`
          p-3 rounded-full bg-white text-orange-500 shadow-lg
        transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}>
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
    );
}