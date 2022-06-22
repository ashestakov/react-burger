import styles from "./profile-aside-link.module.css";
import {Link, useLocation} from "react-router-dom";
import {useCallback} from "react";
import PropTypes from "prop-types";

function ProfileAsideLink({text, to}) {
  const location = useLocation();

  const isLinkWithPathActive = useCallback((path) => {
    return path === location.pathname;
  }, [location]);

  return (
    <Link className={'text text_type_main-medium ' + styles.profileLink + ' ' + (isLinkWithPathActive(to) ? styles.active : '')}
          to={to}>
      {text}
    </Link>
  )
}

ProfileAsideLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default ProfileAsideLink;