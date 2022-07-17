import styles from "./profile-aside-link.module.css";
import {Link, useLocation} from "react-router-dom";
import {SyntheticEvent, useCallback} from "react";

function ProfileAsideLink({text, to, onClick}: {text: string, to: string, onClick?: (e: SyntheticEvent) => void}) {
  const location = useLocation();

  const isLinkWithPathActive = useCallback((path: string) => {
    return path === location.pathname;
  }, [location]);

  return (
    <Link className={'text text_type_main-medium ' + styles.profileLink + ' ' + (isLinkWithPathActive(to) ? styles.active : '')}
          to={to} onClick={onClick}>
      {text}
    </Link>
  )
}

export default ProfileAsideLink;