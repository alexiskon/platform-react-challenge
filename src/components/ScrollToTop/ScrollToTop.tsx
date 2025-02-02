import React, { useEffect, useState } from "react";
import styles from './ScrollToTop.module.scss'

const ScrollToTop: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);

    const scrollTrigger = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <>
            {isVisible && 
                <div
                    className={`${styles.ScrollToTop} mainFlex`}
                    onClick={() => scrollTrigger()}
                >
                    <i className="pi pi-angle-double-up" style={{ fontSize: '1.4rem' }}></i>
                </div>
            }
        </>
    );
};

export default ScrollToTop;