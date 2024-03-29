import React, {useCallback} from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';

import {getTrack} from '../../helpers/Utils';
import {View} from '../Themed';
import {
  startSetCurrentTrack,
  setCurrentTrackIndex,
  startTogglePlay,
} from '../../redux/slices/playlistSlice';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import layout from '../../constants/Layout';

const WRAPPER_WIDTH = layout.window.width * 0.82;

export const PlaybackControl = () => {
  const dispatch = useDispatch();
  const {position, duration} = useTrackPlayerProgress();

  const {playlistMedia, currentTrackIndex, isPlaying} = useSelector(
    (state: RootStoreType) => ({
      playlistMedia: state.playlistReducer.playlistMedia,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      isPlaying: state.playlistReducer.isPlaying,
    }),
  );

  const skipForward = useCallback(() => {
    let nextTrack =
      currentTrackIndex === playlistMedia!.tracks.length - 1
        ? getTrack(playlistMedia!, 0)
        : getTrack(playlistMedia!, currentTrackIndex + 1);
    dispatch(startSetCurrentTrack(nextTrack));
    dispatch(
      setCurrentTrackIndex(
        currentTrackIndex === playlistMedia!.tracks.length - 1
          ? 0
          : currentTrackIndex + 1,
      ),
    );
  }, [currentTrackIndex, playlistMedia]);

  const skipBackward = useCallback(() => {
    let nextTrack =
      currentTrackIndex === 0
        ? getTrack(playlistMedia!, playlistMedia!.tracks.length - 1)
        : getTrack(playlistMedia!, currentTrackIndex - 1);
    dispatch(startSetCurrentTrack(nextTrack));
    dispatch(
      setCurrentTrackIndex(
        currentTrackIndex === 0
          ? playlistMedia!.tracks.length - 1
          : currentTrackIndex - 1,
      ),
    );
  }, [currentTrackIndex, playlistMedia]);

  const onSkip30SecondsForwardPressed = useCallback(() => {
    if (playlistMedia) {
      if (!isPlaying) {
        dispatch(startTogglePlay(true));
      }
      const skipPosition = position + 30 <= duration ? position + 30 : duration;
      TrackPlayer.seekTo(skipPosition);
    }
  }, [isPlaying, position, duration]);

  const onSkip30SecondsBackwardPressed = useCallback(() => {
    if (playlistMedia) {
      if (!isPlaying) {
        dispatch(startTogglePlay(true));
      }
      const skipPosition = position - 30 > 0 ? position - 30 : 0;
      TrackPlayer.seekTo(skipPosition);
    }
  }, [isPlaying, position, duration]);

  const onTogglePlay = useCallback(() => {
    if (playlistMedia) {
      dispatch(startTogglePlay(!isPlaying));
    }
  }, [playlistMedia, isPlaying]);

  return (
    <View style={{...styles.mainWrapper, width: WRAPPER_WIDTH + 10}}>
      <TouchableWithoutFeedback onPress={onSkip30SecondsBackwardPressed}>
        <MaterialIcons name="replay-30" size={30} style={styles.icon} />
      </TouchableWithoutFeedback>
      <MaterialIcons
        name="skip-previous"
        size={40}
        style={styles.icon}
        onPress={skipBackward}
      />
      <TouchableWithoutFeedback onPress={onTogglePlay}>
        <View style={styles.playWrapper}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={32}
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <MaterialIcons
          name="skip-next"
          size={40}
          style={styles.icon}
          onPress={skipForward}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onSkip30SecondsForwardPressed}>
        <MaterialIcons name="forward-30" size={30} style={styles.icon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    padding: 5,
    color: colors.red200,
  },
  playWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    width: 60,
    height: 60,
    borderColor: colors.red200,
    backgroundColor: 'transparent',
  },
});
