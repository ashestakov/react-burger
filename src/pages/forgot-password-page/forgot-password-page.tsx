import styles from "./forgot-password-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {SyntheticEvent, useCallback, useState} from "react";
import {initiatePasswordReset} from "../../services/actions/auth";
import {useAppDispatch, useAppSelector} from "../../hooks";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const passwordResetRequestSuccess = useAppSelector(store => store.auth.passwordResetRequestSuccess);

  const onEmailChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setEmail(e.target.value);
    }
  }, []);

  const onRestore = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(initiatePasswordReset(email));
  }, [email]);

  if (passwordResetRequestSuccess) {
    return (
      <Redirect to={'/reset-password'} />
    )
  }

  return (<div className={styles.pageContainer + ' mt-30'}>
    <form className={styles.form + " mb-20 inputs-480"} onSubmit={onRestore}>
      <p className={'text-center text text_type_main-medium'}>Восстановление пароля</p>
      <Input type={'email'} placeholder={'Укажите e-mail'} value={email} onChange={onEmailChange}/>
      <Button type={'primary'}>Восстановить</Button>
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