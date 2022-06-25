import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

export function UnauthorizedUserRoute({children, ...rest}) {
  const auth = useSelector(store => store.auth);

  if (auth.accessToken) {
    return <Redirect
      to='/'
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