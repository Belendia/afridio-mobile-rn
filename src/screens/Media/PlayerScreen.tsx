import React, {useLayoutEffect, useCallback, useEffect} from 'react';
import {BackHandler, Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {
  ProgressSlider,
  PlaybackControl,
  Backdrop,
  Chip,
  SupportPlaybackControl,
} from '../../components';
import {RootStoreType} from '../../redux/rootReducer';
import {colors} from '../../constants/Colors';
import {Text, View} from '../../components/Themed';
import {setLoop} from '../../redux/slices';

const {height} = Dimensions.get('window');

export const PlayerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //redux
  const {playlistMedia, isPlaying, currentTrackIndex, loop, tabBarHeight} =
    useSelector((state: RootStoreType) => ({
      playlistMedia: state.playlistReducer.playlistMedia,
      isPlaying: state.playlistReducer.isPlaying,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      loop: state.playlistReducer.loop,
      tabBarHeight: state.layoutReducer.tabBarHeight,
    }));

  const onLoopPressed = useCallback(() => {
    dispatch(setLoop(!loop));
  }, [loop]);

  const goBack = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useLayoutEffect(() => {
    const didFocusSub = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', goBack);
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
      didFocusSub();
    };
  }, [goBack, navigation]);

  return (
    <LinearGradient
      colors={['rgba(255,255,255, 0.3)', 'rgba(0, 0, 0, 0.3)']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <Backdrop images={playlistMedia?.images} />

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{playlistMedia?.title}</Text>
          <Text style={styles.trackTitle}>
            {playlistMedia?.tracks[currentTrackIndex].name}
          </Text>
          <View style={styles.authorsWrapper}>
            <Chip values={playlistMedia?.authors.map(a => a.name)} />
          </View>
        </View>
        <View style={styles.progressSliderWrapper}>
          <ProgressSlider style={styles.progressSlider} />
          <SupportPlaybackControl loop={loop} onLoopPressed={onLoopPressed} />
        </View>
        <View style={[styles.controlsContainer, {marginBottom: tabBarHeight}]}>
          <PlaybackControl />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    height: height - 100,
    marginTop: 30,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.red300,
    backgroundColor: 'transparent',
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '200',
    color: colors.red200,
    marginTop: 5,
    backgroundColor: 'transparent',
  },
  authorsWrapper: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  progressSliderWrapper: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  progressSlider: {
    backgroundColor: 'transparent',
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
});
