import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../../types';
import BottomTabNavigator from './BottomTabNavigator';
import MediaScreen from '../screens/Media/MediaScreen';
import {PlayerScreen} from '../screens/Media/PlayerScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // mode="modal"
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="MediaScreen" component={MediaScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
