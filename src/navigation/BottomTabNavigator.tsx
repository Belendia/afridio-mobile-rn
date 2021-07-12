import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';

import {BottomTabParamList} from '../../types';
import SettingsNavigator from './SettingsNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // tabBar={(props) => (
      //   <>
      //     <MediaPlayer />
      //     <BottomTabBar {...props} />
      //   </>
      // )}
      tabBarOptions={{
        activeTintColor: Colors['dark'].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Ionicons name="home" color={color} size={24} />
            ) : (
              <Ionicons name="home-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Ionicons name="search" color={color} size={24} />
            ) : (
              <Ionicons name="search-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Ionicons name="library" color={color} size={24} />
            ) : (
              <Ionicons name="library-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Ionicons name="settings" color={color} size={24} />
            ) : (
              <Ionicons name="settings-outline" color={color} size={24} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
