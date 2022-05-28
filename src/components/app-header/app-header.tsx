import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import NavBarLink from "../nav-bar-link/nav-bar-link";

export default function AppHeader() {
    return <nav className={styles.navBar}>
        <div style={{width: '50%', justifyContent: 'start'}} className={styles.navBarMenu}>
            <NavBarLink active={true}>
                <BurgerIcon type="primary" />
                Конструктор
            </NavBarLink>
            <NavBarLink>
                <ListIcon type="primary" />
                Лента заказов
            </NavBarLink>
        </div>
        <Logo />
        <div style={{width: '50%', justifyContent: 'end'}} className={styles.navBarMenu}>
            <NavBarLink>
                <ProfileIcon type="primary" />
                Личный кабинет
            </NavBarLink>
        </div>
    </nav>;
}