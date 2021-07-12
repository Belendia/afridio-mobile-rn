/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import App from './App';
import {name as appName} from './app.json';
import bgService from './src/services/player/RemoteControlListener';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => bgService);
