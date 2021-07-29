import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LibraryScreen from '../screens/LibraryScreen';
import {LibraryParamList} from '../../types';

const LibraryStack = createStackNavigator<LibraryParamList>();

const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{headerTitle: 'Library'}}
      />
    </LibraryStack.Navigator>
  );
};

export default LibraryNavigator;
