/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

/* global __DEV__ */

import React, {useEffect} from 'react';
import {Linking, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import reactotron from 'reactotron-react-native';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import Navigation from './src/navigation';
import {theme} from './src/components/Themed';
import {store} from './src/redux/store';

function setup() {
  if (__DEV__) {
    import('./reactotron.config').then(() => {
      // reactotron.clear!();
      console.log('Reactotron Configured');
    });
  }
}

setup();

const App = () => {
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

// const App = __DEV__ ? reactotron.overlay(AppWithStore) : AppWithStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
