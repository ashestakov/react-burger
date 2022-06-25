import {Route, Redirect} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {loadUser} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";

export function ProtectedRoute({children, ...rest}) {
  const auth = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await dispatch(loadUser(auth.accessToken));
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  if (!auth.accessToken) {
    return <Redirect
      to='/login'
    />
  }

  return (
    <Route {...rest}>
      {
        children
      }
    </Route>
  )
}