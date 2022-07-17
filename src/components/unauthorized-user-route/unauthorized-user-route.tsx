import {Route, Redirect} from 'react-router-dom';
import {ReactNode, useEffect, useState} from "react";
import {loadUser} from "../../services/actions/auth";
import {useAppDispatch, useAppSelector} from "../../hooks";

export function UnauthorizedUserRoute(
  {children, path, exact, component, ...rest}:
    { children?: ReactNode, path: string, exact: boolean, component: React.ComponentType }
) {
  const auth = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await dispatch(loadUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (auth.user) {
    return <Redirect to='/'/>
  }

  return (
    <Route path={path} exact={exact} component={component} {...rest}>
      {
        children
      }
    </Route>
  )
}