import styles from './nav-bar-link.module.css'
import {Link, useLocation} from "react-router-dom";
import {ReactNode} from "react";

function NavBarLink({children, to, exact}: {children: ReactNode, to: string, exact: boolean}) {
    const location = useLocation();
    const active = exact ? location.pathname === to : location.pathname.startsWith(to);

    const classes = [
        styles.navLink,
        active ? styles.active : null,
        'text text_type_main-default pt-4 pb-4 pl-5 pr-5 mt-4 mb-4'
    ].join(' ')

    return (
        <Link className={classes} to={to}>
            {children}
        </Link>
    )
}

export default NavBarLink;