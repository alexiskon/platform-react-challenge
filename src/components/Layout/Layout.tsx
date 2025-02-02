import React, { ReactNode } from "react";
import styles from './Layout.module.scss'
import Header from "./Header/Header";

interface LayoutProps {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className={styles.mainContainer}>
            <div>
                <Header />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;