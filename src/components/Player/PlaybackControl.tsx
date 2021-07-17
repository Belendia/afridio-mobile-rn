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
  setLoop,
  startTogglePlay,
} from '../../redux/slices/playlistSlice';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import layout from '../../constants/Layout';

const WRAPPER_WIDTH = layout.window.width * 0.82;

export const PlaybackControl = () => {
  const dispatch = useDispatch();
  const {position, duration} = useTrackPlayerProgress();

  const {playlistMedia, currentTrackIndex, isPlaying, loop} = useSelector(
    (state: RootStoreType) => ({
      playlistMedia: state.playlistReducer.playlistMedia,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      isPlaying: state.playlistReducer.isPlaying,
      loop: state.playlistReducer.loop,
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

  const onSkip10SecondsForwardPressed = useCallback(() => {
    const skipPosition = position + 10 <= duration ? position + 10 : duration;
    TrackPlayer.seekTo(skipPosition);
  }, [position, duration]);

  const onSkip10SecondsBackwardPressed = useCallback(() => {
    const skipPosition = position - 10 > 0 ? position - 10 : 0;
    TrackPlayer.seekTo(skipPosition);
  }, [position, duration]);

  const onLoopPress = () => {
    // RenderToast(`Loop ${loop ? 'all tracks' : 'this track'}`);
    dispatch(setLoop(!loop));
  };

  const onTogglePlay = useCallback(() => {
    if (playlistMedia) {
      dispatch(startTogglePlay(!isPlaying));
    }
  }, [playlistMedia, isPlaying]);

  return (
    <View style={{...styles.mainWrapper, width: WRAPPER_WIDTH + 10}}>
      <TouchableWithoutFeedback onPress={onSkip10SecondsBackwardPressed}>
        <MaterialIcons name="replay-10" size={30} style={styles.icon} />
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
      <TouchableWithoutFeedback onPress={onSkip10SecondsForwardPressed}>
        <MaterialIcons name="forward-10" size={30} style={styles.icon} />
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
