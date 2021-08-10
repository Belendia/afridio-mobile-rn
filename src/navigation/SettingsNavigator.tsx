import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from '../screens/Settings/SettingsScreen';
import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen';
import {SettingsParamList} from '../../types';

const SettingsStack = createStackNavigator<SettingsParamList>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerTitle: 'Settings'}}
      />
      <SettingsStack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerTitle: 'Change Password'}}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
