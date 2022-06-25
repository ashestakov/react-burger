import styles from './nav-bar-link.module.css'
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

function NavBarLink({children, to, exact}) {
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

NavBarLink.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    exact: PropTypes.bool
}

export default NavBarLink;