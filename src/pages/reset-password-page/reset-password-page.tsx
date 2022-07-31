import styles from "../login-page/login-page.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {SyntheticEvent, useCallback, useState} from "react";
import {finalizePasswordReset} from "../../services/actions/auth";
import {Redirect} from "react-router-dom";
import {RootState} from "../../services/reducers/root-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks";

// Нужно, чтобы typescript не ругался, когда компонентам
// из @ya.praktikum/react-developer-burger-ui-components передаются children

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

export function ResetPasswordPage() {
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const passwordResetRequestSuccess = useAppSelector((store: RootState) => store.auth.passwordResetRequestSuccess);

  const onPasswordChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setPassword(e.target.value);
    }
  }, []);

  const onTokenChange = useCallback((e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setToken(e.target.value);
    }
  }, []);

  const onResetPassword = useCallback((e: SyntheticEvent) => {
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
