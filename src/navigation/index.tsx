import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import * as React from "react";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import AuthNavigator from "./AuthNavigator";
import useAutoLogin from "../hooks/useAutoLogin";
import { useSelector } from "react-redux";
import { RootStoreType } from "../redux/rootReducer";

import { MiniPlayer } from "../components";
import RootNavigator from "./RootNavigator";
import { navigationRef } from "../services/navigation/NavigationService";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  useAutoLogin();

  const { token } = useSelector((state: RootStoreType) => ({
    token: state.authReducer.token,
  }));

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {token ? (
        <>
          <RootNavigator />
          <MiniPlayer />
        </>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
