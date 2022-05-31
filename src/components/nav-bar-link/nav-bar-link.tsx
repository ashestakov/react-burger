import styles from "../app-header/app-header.module.css";
import {ReactNode} from "react";
import PropTypes from "prop-types";

function NavBarLink({children, active}: { children: ReactNode[]; active?: Boolean }) {
    const classes = [
        styles.navLink,
        active ? styles.active : null,
        'text text_type_main-default pt-4 pb-4 pl-5 pr-5 mt-4 mb-4'
    ].join(' ')

    return (
        <a className={classes} href="#">
            {children}
        </a>
    )
}

NavBarLink.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool
}

export default NavBarLink;