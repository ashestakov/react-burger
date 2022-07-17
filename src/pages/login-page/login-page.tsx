import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {SyntheticEvent, useCallback, useState} from "react";
import styles from './login-page.module.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import {login} from "../../services/actions/auth";
import {useAppDispatch} from "../../hooks";

interface LocationState {
  from: {
    pathname: string;
  };
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const from = useLocation<LocationState>().state?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setEmail(e.target.value);
    }
  }, []);

  const onPasswordChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setPassword(e.target.value);
    }
  }, []);

  const onLogin = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(login(email, password))
    history.push(from || '/')
  }, [dispatch, email, history, password]);

  return (<div className={styles.pageContainer + ' mt-30'}>
    <form className={styles.form + " mb-20 inputs-480"} onSubmit={onLogin}>
      <p className={'text-center text text_type_main-medium'}>Вход</p>
      <Input type={'email'} placeholder={'E-mail'} value={email} onChange={onEmailChange}/>
      <Input type={'password'} placeholder={'Пароль'} value={password} onChange={onPasswordChange} icon={'ShowIcon'}/>
      <Button type={'primary'}>Войти</Button>
    </form>
    <p className={'mb-4 text text_type_main-default'}>
      Вы — новый пользователь?
      &nbsp;
      <Link className={'link'} to={'/register'}>
        Зарегистрироваться
      </Link>
    </p>
    <p className={'text text_type_main-default'}>
      Забыли пароль?
      &nbsp;
      <Link className={'link'} to={'/forgot-password'}>
        Восстановить пароль
      </Link>
    </p>
  </div>);
}
