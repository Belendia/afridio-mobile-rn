import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import AfridioAsyncStoreService from "../../services/asyncstorage/AfridioAsyncStoreService";
import AfridioApiService from "../../services/network/AfridioApiService";
import { Action } from "../rootReducer";
import { User } from "../../../types";

type AuthReducerType = {
  user: User | null;
  authenticating: boolean;
  authenticated: boolean;
  authError: object | null;
  token: string | null;
  readingToken: boolean;
  regError: object | null;
  registering: boolean;
  registered: boolean;
  verifying: boolean;
  password: string | null;
  otp_resend_time: number;
  resendingOTP: boolean;
};

const initialState: AuthReducerType = {
  user: null,
  authenticating: false,
  authenticated: false,
  authError: null,
  token: null,
  readingToken: true,
  regError: null,
  registering: false,
  registered: false,
  verifying: false,
  password: null,
  otp_resend_time: 0,
  resendingOTP: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveTokenSuccess: (state, action) => ({
      ...state,
      authenticated: action.payload.authenticated,
      token: action.payload.token,
      readingToken: false,
    }),
    authStart: (state, action) => ({
      ...state,
      authError: null,
      authenticating: true,
      user: {
        ...state.user,
        phone_number: action.payload.phone_number,
        password: action.payload.password,
      },
    }),
    authSuccess: (state, action) => ({
      ...state,
      authenticated: true,
      token: action.payload.token,
      authError: null,
      authenticating: false,
      verifying: false,
      registered: false,
      registering: false,
      regError: null,
    }),
    authFail: (state, action) => ({
      ...state,
      authenticated: false,
      authenticating: false,
      authError: action.payload.message,
      otp_resend_time: action.payload.otp_resend_time,
      user: {
        ...state.user,
        session_token: action.payload.session_token,
      },
    }),
    authLogout: (state) => ({
      ...state,
      authenticated: false,
      user: null,
    }),
    authLogoutDone: (state) => ({
      ...state,
      token: null,
    }),
    startRegistration: (state, action) => ({
      ...state,
      registering: true,
      registered: false,
      password: action.payload.password,
    }),
    registrationSuccess: (state, action) => ({
      ...state,
      user: action.payload.user,
      otp_resend_time: action.payload.otp_resend_time,
      regError: null,
      registering: false,
      registered: true,
    }),
    registrationFailed: (state, action) => ({
      ...state,
      regError: action.payload,
      registering: false,
      registered: false,
    }),
    startVerification: (state, _) => ({
      ...state,
      verifying: true,
    }),
    verificationFailed: (state, action) => ({
      ...state,
      regError: action.payload,
      verifying: false,
    }),
    resetRegError: (state, _) => ({
      ...state,
      regError: null,
    }),
    resetAuthError: (state) => ({
      ...state,
      authError: null,
    }),
    startResendOTP: (state, action) => ({
      ...state,
      resendingOTP: true,
      password: action.payload.password,
    }),
    resendOTPSuccess: (state, action) => ({
      ...state,
      resendingOTP: false,
      otp_resend_time: action.payload.otp_resend_time,
      user: {
        ...state.user,
        session_token: action.payload.session_token,
      },
    }),
    resendOTPFailed: (state, action) => ({
      ...state,
      resendingOTP: false,
    }),
    resetRegistered: (state) => ({
      ...state,
      registered: false,
    }),
  },
});

export const loginEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(authStart.type),
    switchMap(({ payload }) => {
      const { phone_number, password } = payload;
      return AfridioApiService.login(phone_number, password).pipe(
        map((res) => {
          AfridioAsyncStoreService.putToken(res.token);
          return authSuccess(res);
        }),
        catchError((err) => {
          let message = "Something went wrong.";
          let session_token = null;
          let otp_resend_time = 0;
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 403) {
            message = err._message.detail;
            session_token = err._message.session_token;
            otp_resend_time = err._message.otp_resend_time;
          } else if (err && err._status === 400) {
            message = err._message.detail[0];
          }

          return of(
            authFail({
              message: message,
              session_token: session_token,
              otp_resend_time: otp_resend_time,
            })
          );
        })
      );
    })
  );

export const logoutEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(authLogout.type),
    switchMap(() => {
      return AfridioApiService.logout().pipe(
        map((res) => {
          AfridioAsyncStoreService.removeToken();

          return authLogoutDone(res);
        }),
        catchError((err) => {
          AfridioAsyncStoreService.removeToken();

          return of(authLogoutDone(err));
        })
      );
    })
  );

export const registerEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startRegistration.type),
    switchMap(({ payload }) => {
      return AfridioApiService.register(payload).pipe(
        map((res) => {
          const userData = {
            user: {
              phone_number: res.phone_number,
              password: payload.password,
              session_token: res.session_token,
              name: res.name,
              sex: res.sex,
              date_of_birth: res.date_of_birth,
            },
            otp_resend_time: res.otp_resend_time,
          };

          return registrationSuccess(userData);
        }),
        catchError((err) => {
          let message: any = "Something went wrong.";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            message = {};
            for (const e in err._message) {
              message[e] = err.message[e][0];
            }
          }

          return of(registrationFailed(message));
        })
      );
    })
  );

export const verifyEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startVerification.type),
    switchMap(({ payload }) => {
      return AfridioApiService.verify(payload).pipe(
        map((res) => {
          AfridioAsyncStoreService.putToken(res.token);
          return authSuccess(res);
        }),
        catchError((err) => {
          let message: any = "Something went wrong.";
          console.log(err);
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            console.log(err._message.detail[0]);
            message = err._message.detail[0];
          }

          return of(verificationFailed(message));
        })
      );
    })
  );

export const readToken = async () => {
  const token = await AfridioAsyncStoreService.getToken();

  return { token: token };
};

export const resendOTPEpic = (action$: Observable<Action<any>>) =>
  action$.pipe(
    ofType(startResendOTP.type),
    switchMap(({ payload }) => {
      return AfridioApiService.resendOTP(payload).pipe(
        map((res) => {
          console.log(res);
          return resendOTPSuccess(res);
        }),
        catchError((err) => {
          console.log(err);
          let message: any = "Something went wrong.";
          if (err && err._status === "Offline") {
            message = err._message;
          } else if (err && err._status === 400) {
            message = err._message.detail[0];
          }

          return of(resendOTPFailed(message));
        })
      );
    })
  );

export const authEpics = [
  loginEpic,
  logoutEpic,
  registerEpic,
  verifyEpic,
  resendOTPEpic,
];

export const {
  retrieveTokenSuccess,
  authStart,
  authSuccess,
  authFail,
  authLogout,
  authLogoutDone,
  startRegistration,
  registrationSuccess,
  registrationFailed,
  startVerification,
  verificationFailed,
  resetAuthError,
  resetRegError,
  startResendOTP,
  resendOTPSuccess,
  resendOTPFailed,
  resetRegistered,
} = authSlice.actions;

export default authSlice.reducer;
