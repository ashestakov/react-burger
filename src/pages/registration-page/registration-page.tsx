import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {SyntheticEvent, useCallback, useState} from "react";
import styles from "../login-page/login-page.module.css";
import {Link} from "react-router-dom";

import {register} from "../../services/actions/auth";
import {useAppDispatch} from "../../hooks";

export function RegistrationPage() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setEmail(e.target.value);
    }
  }, []);

  const onNameChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  }, []);

  const onRegister = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }, [dispatch, name, email, password]);

  const onPasswordChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setPassword(e.target.value);
    }
  }, []);

  return (<div className={styles.pageContainer + ' mt-30'}>
    <form className={styles.form + " mb-20 inputs-480"} onSubmit={onRegister}>
      <p className={'text-center text text_type_main-medium'}>Регистрация</p>
      <Input type={'text'} placeholder={'Имя'} value={name} onChange={onNameChange}/>
      <Input type={'email'} placeholder={'E-mail'} value={email} onChange={onEmailChange}/>
      <Input type={'password'} placeholder={'Пароль'} value={password} onChange={onPasswordChange} icon={'ShowIcon'}/>
      <Button type={'primary'}>Зарегистрироваться</Button>
    </form>
    <p className={'mb-4 text text_type_main-default'}>
      Уже зарегистрированы?
      &nbsp;
      <Link className={'link'}  to={'/login'}>
        Войти
      </Link>
    </p>
  </div>);
}
