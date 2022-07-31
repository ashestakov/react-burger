import {Route, Redirect} from 'react-router-dom';
import {ReactNode, useCallback, useEffect, useState} from 'react';
import {loadUser} from "../../services/actions/auth";
import {useAppDispatch, useAppSelector} from "../../hooks";

export function ProtectedRoute(
  {children, path, component, exact, ...rest}:
    { children?: ReactNode, path: string, component?: React.ComponentType, exact?: boolean }
) {
  const auth = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(async () => {
    await dispatch(loadUser());
    setUserLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (!auth.user) {
    return <Redirect to={{pathname: '/login', state: {from: path}}}/>
  }

  return (
    <Route path={path} component={component} exact={exact} {...rest}>
      {
        children
      }
    </Route>
  )
}