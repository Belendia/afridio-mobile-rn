import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerifyScreen from "../screens/Auth/VerifyScreen";

import { AuthParamList } from "../../types";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignInScreen">
      <AuthStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerTransparent: true, title: "" }}
      />
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerTransparent: true, title: "" }}
      />
      <AuthStack.Screen
        name="VerifyScreen"
        component={VerifyScreen}
        options={{ headerTransparent: true, title: "" }}
      />
      {/* <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name="PasswordChangedScreen"
        component={PasswordChangedScreen}
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
