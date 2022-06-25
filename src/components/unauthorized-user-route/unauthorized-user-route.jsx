import {Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {loadUser} from "../../services/actions";

export function UnauthorizedUserRoute({children, ...rest}) {
  const auth = useSelector(store => store.auth);

  const dispatch = useDispatch();
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
    return <Redirect to='/' />
  }

  return (
    <Route {...rest}>
      {
        children
      }
    </Route>
  )
}