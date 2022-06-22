import styles from "./forgot-password-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {initiatePasswordReset} from "../../../services/actions";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onRestoreClick = useCallback((e) => {
    e.preventDefault();
    dispatch(initiatePasswordReset(email));
  }, [email]);

  return (<div className={styles.pageContainer}>
    <form className={styles.form + " mb-20 inputs-480"}>
      <p className={'text-center text text_type_main-medium'}>Восстановление пароля</p>
      <Input type={'email'} placeholder={'Укажите e-mail'} value={email} onChange={onEmailChange}/>
      <Button type={'primary'} onClick={onRestoreClick}>Восстановить</Button>
    </form>
    <p className={'mb-4 text text_type_main-default'}>
      Вспомнили пароль?
      &nbsp;
      <Link className={'link'} to={'/login'}>
        Войти
      </Link>
    </p>
  </div>);
}