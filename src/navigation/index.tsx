import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName, Linking} from 'react-native';

import AuthNavigator from './AuthNavigator';
import useAutoLogin from '../hooks/useAutoLogin';
import {useSelector} from 'react-redux';
import {RootStoreType} from '../redux/rootReducer';

import {MiniPlayer} from '../components';
import RootNavigator from './RootNavigator';
import {navigationRef} from '../services/navigation/NavigationService';
import {getQueryParam} from '../helpers/Utils';

const Navigation = ({colorScheme}: {colorScheme: ColorSchemeName}) => {
  // const linking = {
  //   prefixes: ['https://afridio.com', 'afridio://'],
  // };

  useAutoLogin();

  useEffect(() => {
    //Get the deep link used to open thevapp

    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl === null) {
        return;
      }

      if (initialUrl.includes('Media')) {
        const id = getQueryParam(initialUrl, 'id');

        navigationRef.current?.navigate('Media', {
          slug: id,
        });
      }
    };

    getUrl();
  }, []);

  const {token} = useSelector((state: RootStoreType) => ({
    token: state.authReducer.token,
  }));

  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
