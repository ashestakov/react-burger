import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {useCallback, useState} from "react";
import styles from "../login-page/login-page.module.css";
import {Link} from "react-router-dom";

import {register} from "../../../services/actions";
import {useDispatch} from "react-redux";

export function RegistrationPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onRegister = useCallback((e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }, [dispatch, name, email, password]);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (<div className={styles.pageContainer}>
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
