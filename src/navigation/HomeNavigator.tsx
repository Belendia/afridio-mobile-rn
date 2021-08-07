import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MediaListScreen from '../screens/MediaListScreen';
import {HomeParamList} from '../../types';

const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen} //HomeScreen
        options={{title: 'Home'}}
      />
      <HomeStack.Screen
        name="MediaListScreen"
        component={MediaListScreen}
        options={{title: 'Media List'}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
