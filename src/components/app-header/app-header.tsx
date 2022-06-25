import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import NavBarLink from "../nav-bar-link/nav-bar-link";

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <div className={styles.leftHalf}>
                    <NavBarLink to={'/'} exact={true}>
                        <BurgerIcon type="primary"/>
                        Конструктор
                    </NavBarLink>
                    <NavBarLink to={'#'} exact={true}>
                        <ListIcon type="primary"/>
                        Лента заказов
                    </NavBarLink>
                </div>
                <Logo/>
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