import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName, Dimensions, Linking} from 'react-native';

import AuthNavigator from './AuthNavigator';
import useAutoLogin from '../hooks/useAutoLogin';
import {useSelector} from 'react-redux';
import {RootStoreType} from '../redux/rootReducer';

import {MiniPlayer} from '../components';
import RootNavigator from './RootNavigator';
import {navigationRef} from '../services/navigation/NavigationService';
import {getQueryParam} from '../helpers/Utils';
import {Host, Portal} from 'react-native-portalize';
import {PlayerScreen} from '../screens/Media/PlayerScreen';
import {Modalize} from 'react-native-modalize';
import {colors} from '../constants/Colors';
import {modalRef} from '../services/navigation/ModalizeService';

const {height} = Dimensions.get('window');

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

  const onPressMiniPlayer = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, [modalRef]);

  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {token ? (
        <Host>
          <Portal>
            <RootNavigator />
            <MiniPlayer onPressMiniPlayer={onPressMiniPlayer} />
            <Modalize
              ref={modalRef}
              snapPoint={height}
              withHandle={true}
              withOverlay={false}
              handlePosition="inside"
              modalStyle={{backgroundColor: 'black'}}
              handleStyle={{
                top: 13,
                width: 60,
                height: 6,
                backgroundColor: colors.black700,
              }}>
              {<PlayerScreen />}
            </Modalize>
          </Portal>
        </Host>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
