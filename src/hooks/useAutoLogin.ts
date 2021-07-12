import * as React from "react";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { useDispatch } from "react-redux";

import { retrieveTokenSuccess, readToken } from "../redux/slices/authSlice";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    function readTokenFromLocalStore() {
      const checkLoggedIn$ = from(readToken()).pipe(
        map((data) => {
          const authenticated = data.token !== null && data.token !== undefined;

          return {
            token: data.token,
            authenticated: authenticated,
          };
        })
      );
      const subscription = checkLoggedIn$.subscribe((value) => {
        return dispatch(retrieveTokenSuccess(value));
      });
      return () => subscription.unsubscribe();
    }
    readTokenFromLocalStore();
  }, []);
};

export default useAutoLogin;
