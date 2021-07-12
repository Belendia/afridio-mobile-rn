import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from '../screens/Settings/SettingsScreen';
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
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
