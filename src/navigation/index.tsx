import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Animated, ColorSchemeName, Dimensions, Linking} from 'react-native';

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
import {View} from '../components/Themed';

const {height} = Dimensions.get('window');

const Navigation = ({colorScheme}: {colorScheme: ColorSchemeName}) => {
  // const linking = {
  //   prefixes: ['https://afridio.com', 'afridio://'],
  // };

  const animated = useRef(new Animated.Value(0)).current;
  const modalRef = useRef<Modalize>(null);
  const [handle, setHandle] = useState(false);

  const handlePosition = (position: string) => {
    setHandle(position === 'top');
  };

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
    console.log('Opening .........');
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, [modalRef.current]);

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
              // panGestureAnimatedValue={animated}
              snapPoint={height}
              withHandle={true}
              withOverlay={false}
              handlePosition="inside"
              modalStyle={{flex: 1, backgroundColor: 'black'}}
              handleStyle={{
                top: 13,
                width: 40,
                height: handle ? 6 : 0,
                backgroundColor: colors.red800,
              }}
              onPositionChange={handlePosition}>
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
