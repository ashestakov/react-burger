import styles from "../login-page/login-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import {finalizePasswordReset} from "../../../services/actions";
import {useDispatch} from "react-redux";

export function ResetPasswordPage() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onTokenChange = useCallback((e) => {
    setToken(e.target.value);
  }, []);

  const onResetPasswordClick = useCallback((e) => {
    e.preventDefault();
    dispatch(finalizePasswordReset(password, token));
  }, [dispatch, password, token]);

  return (
    <div className={styles.pageContainer}>
      <form className={styles.form + " mb-20 inputs-480"}>
        <p className={'text-center text text_type_main-medium'}>Восстановление пароля</p>
        <Input type={'password'} placeholder={'Введите новый пароль'} value={password} onChange={onPasswordChange}
               icon={'ShowIcon'}/>
        <Input type={'text'} placeholder={'Введите код из письма'} value={token} onChange={onTokenChange}/>
        <Button type={'primary'} onClick={onResetPasswordClick}>Сохранить</Button>
      </form>
    </div>
  );
}
