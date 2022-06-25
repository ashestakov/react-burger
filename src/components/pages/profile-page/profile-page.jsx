import styles from './profile-page.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useMemo, useState} from "react";
import ProfileAsideLink from "../../profile-aside-link/profile-aside-link";
import {logout, patchUser} from "../../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from 'react-router-dom';

export function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const accessToken = useSelector(store => store.auth.accessToken);
  const refreshToken = useSelector(store => store.auth.refreshToken);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const onClickLogout = useCallback((e) => {
    e.preventDefault();
    dispatch(logout(refreshToken));
  }, [refreshToken]);

  const diff = useMemo(() => {
    if (!user) {
      return {};
    }
    let result = {};

    if (name !== user.name) {
      result.name = name;
    }
    if (email !== user.email) {
      result.email = email;
    }
    if (password) {
      result.password = password;
    }

    return result;
  }, [user, name, email, password]);

  const onSaveClick = useCallback((e) => {
    e.preventDefault();
    dispatch(patchUser(accessToken, diff));
  }, [dispatch, accessToken, diff]);

  const onCancelClick = useCallback((e) => {
    e.preventDefault();
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }, [user, setName, setEmail, setPassword]);

  return (<div className={'mt-30 ' + styles.profileContainer}>
    <aside className={'mr-15 ' + styles.profileNavAside}>
      <ul className={'mb-20'}>
        <li className={styles.profileLinkContainer} key={0}>
          <ProfileAsideLink text={'Профиль'} to={'/profile'}/>
        </li>
        <li className={styles.profileLinkContainer} key={1}>
          <ProfileAsideLink text={'История заказов'} to={'/profile/orders'}/>
        </li>
        <li className={styles.profileLinkContainer} key={2}>
          <ProfileAsideLink text={'Выход'} onClick={onClickLogout} to={'/'}/>
        </li>
      </ul>
      <p className={'text text_type_main-default'}>
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </aside>
    <main>
      <Switch>
        <Route path={"/profile"} exact={true}>
          <form className={styles.form + ' inputs-600'}>
            <Input type={'text'} placeholder={'Имя'} value={name} onChange={onNameChange} icon={'EditIcon'}/>
            <Input type={'email'} placeholder={'E-mail'} value={email} onChange={onEmailChange} icon={'EditIcon'}/>
            <Input type={'password'} placeholder={'Пароль'} value={password} onChange={onPasswordChange}
                   icon={'EditIcon'}/>
            {
              (Object.keys(diff).length > 0) &&
              <div>
                <Button type={'secondary'} onClick={onCancelClick}>Отмена</Button>
                <Button type={'primary'} onClick={onSaveClick}>Сохранить</Button>
              </div>
            }
          </form>
        </Route>
        <Route path={'/profile/orders'} exact={true}>

        </Route>
      </Switch>
    </main>
  </div>);
}
