import React from "react";
import styles from './Header.module.scss'
import Logo from '@images/gwi-logo.svg';

import { routeConfig } from "../../../routes";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const routes = routeConfig();

    const navItemClick = (path: string) => {
        if (path !== location.pathname) navigate(path);
    }

    return (
        <>
            <header className={`${styles.header} mainFlex`}>
                <div className={styles.header__logoArea}>
                    <img
                        src={Logo}
                        alt="Logo"
                        loading="lazy"
                        width={60}
                        height={'auto'}
                    />
                </div>
                <div className={`${styles.header__navArea} mainFlex`}>
                    {routes.map(route => {
                        if (route.headerDisplay) {
                            return (
                                <span
                                    className={styles.navItem}
                                    key={route.label}
                                    onClick={() => navItemClick(route.path)}
                                >{route.label}</span>
                            )
                        }
                    })}
                </div>
            </header>
        </>
    );
};

export default Header;