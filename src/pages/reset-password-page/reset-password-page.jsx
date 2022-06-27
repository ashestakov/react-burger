import styles from "../login-page/login-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {finalizePasswordReset} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export function ResetPasswordPage() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const passwordResetRequestSuccess = useSelector(store => store.auth.passwordResetRequestSuccess);

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onTokenChange = useCallback((e) => {
    setToken(e.target.value);
  }, []);

  const onResetPassword = useCallback((e) => {
    e.preventDefault();
    dispatch(finalizePasswordReset(password, token));
  }, [dispatch, password, token]);

  if (!passwordResetRequestSuccess) {
    return (<Redirect to={'/'} />)
  }

  return (
    <div className={styles.pageContainer + ' mt-30'}>
      <form className={styles.form + " mb-20 inputs-480"} onSubmit={onResetPassword}>
        <p className={'text-center text text_type_main-medium'}>Восстановление пароля</p>
        <Input type={'password'} placeholder={'Введите новый пароль'} value={password} onChange={onPasswordChange}
               icon={'ShowIcon'}/>
        <Input type={'text'} placeholder={'Введите код из письма'} value={token} onChange={onTokenChange}/>
        <Button type={'primary'}>Сохранить</Button>
      </form>
    </div>
  );
}
