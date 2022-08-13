import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import NavBarLink from "../nav-bar-link/nav-bar-link";
import {Link} from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.leftHalf}>
          <NavBarLink to={'/'} exact={true}>
            <BurgerIcon type="primary"/>
            Конструктор
          </NavBarLink>
          <NavBarLink to={'/feed'} exact={true}>
            <ListIcon type="primary"/>
            Лента заказов
          </NavBarLink>
        </div>
        <Link to={'/'}>
          <Logo/>
        </Link>
        <div className={styles.rightHalf}>
          <NavBarLink to={'/profile'} exact={false}>
            <ProfileIcon type="primary"/>
            Личный кабинет
          </NavBarLink>
        </div>
      </nav>
    </header>
  );
}