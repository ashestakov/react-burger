import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {useCallback, useState} from "react";
import styles from './login-page.module.css';
import {Link} from "react-router-dom";
import {login} from "../../../services/actions";
import {useDispatch} from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onClickLogin = useCallback((e)=>{
    e.preventDefault();
    dispatch(login(email, password));
  }, [email, password]);

  return (<div className={styles.pageContainer}>
    <form className={styles.form + " mb-20 inputs-480"}>
      <p className={'text-center text text_type_main-medium'}>Вход</p>
      <Input type={'email'} placeholder={'E-mail'} value={email} onChange={onEmailChange}/>
      <Input type={'password'} placeholder={'Пароль'} value={password} onChange={onPasswordChange} icon={'ShowIcon'}/>
      <Button type={'primary'} onClick={onClickLogin}>Войти</Button>
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
