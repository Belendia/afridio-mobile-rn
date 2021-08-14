import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useTrackPlayerProgress} from 'react-native-track-player';

import {View, Text} from '../Themed';
import {RootStoreType} from '../../redux/rootReducer';
import {colors} from '../../constants/Colors';
import {setShowMiniPlayer, startTogglePlay} from '../../redux/slices';
import {navigate} from '../../services/navigation/NavigationService';
import {Cover} from '../Media/Cover';
import {Size} from '../../constants/Options';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {PlayerScreen} from '../../screens/Media/PlayerScreen';

type MiniPlayerProps = {
  onPressMiniPlayer: () => void;
};
const MiniPlayer = memo(({onPressMiniPlayer}: MiniPlayerProps) => {
  const dispatch = useDispatch();
  const {position, duration} = useTrackPlayerProgress();

  const {playlistMedia, isPlaying, tabBarHeight, showMiniPlayer} = useSelector(
    (state: RootStoreType) => ({
      playlistMedia: state.playlistReducer.playlistMedia,
      isPlaying: state.playlistReducer.isPlaying,
      showMiniPlayer: state.playlistReducer.showMiniPlayer,
      tabBarHeight: state.layoutReducer.tabBarHeight,
    }),
  );

  const getProgress = useCallback(() => {
    if (duration === 0) {
      return 0;
    }

    return (position / duration) * 100;
  }, [position, duration]);

  const onTogglePlay = useCallback(() => {
    if (playlistMedia) {
      dispatch(startTogglePlay(!isPlaying));
    }
  }, [playlistMedia, isPlaying]);

  const onPressMiniPlayerHandler = useCallback(() => {
    // dispatch(setMediaSlug(playlistMedia?.slug));
    // navigate('PlayerScreen', {});
    // dispatch(setShowMiniPlayer(false));

    if (onPressMiniPlayer) onPressMiniPlayer();
  }, [playlistMedia?.slug]);

  if (!playlistMedia || showMiniPlayer === false) {
    return <></>;
  }

  return (
    <TouchableWithoutFeedback onPress={onPressMiniPlayerHandler}>
      <View style={[styles.container, {bottom: tabBarHeight}]}>
        <View style={[styles.progress, {width: `${getProgress()}%`}]} />

        <View style={styles.row}>
          <Cover images={playlistMedia?.images} size={Size.Small} />
          <View style={styles.rightContainer}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {playlistMedia?.title}
              </Text>
            </View>

            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={onTogglePlay}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={30}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export {MiniPlayer};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 79,
    backgroundColor: colors.black600,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.black600,
  },
  progress: {
    height: 2,
    backgroundColor: colors.red800,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.black500,
  },
  player: {
    width: 100,
    height: 65,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  nameContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'flex-end',
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'transparent',
  },
});
