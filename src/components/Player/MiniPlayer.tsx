import React, {memo, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {View, Text} from '../Themed';
import {RootStoreType} from '../../redux/rootReducer';
import {colors} from '../../constants/Colors';
import {
  setMediaSlug,
  setShowMiniPlayer,
  startToSetPlayback,
} from '../../redux/slices';
import {navigate} from '../../services/navigation/NavigationService';
import {Cover} from '../Media/Cover';
import {Size} from '../../constants/Options';

const MiniPlayer = memo(() => {
  const dispatch = useDispatch();

  // const videoRef = useRef<Video>();
  // const [sound, setSound] = useState<Sound | null>(null);

  const {media, currentTrackIndex, isPlaying, tabBarHeight, showMiniPlayer} =
    useSelector((state: RootStoreType) => ({
      media: state.mediaReducer.media,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      isPlaying: state.playlistReducer.isPlaying,
      showMiniPlayer: state.playlistReducer.showMiniPlayer,
      tabBarHeight: state.layoutReducer.tabBarHeight,
    }));

  // const getProgress = useCallback(() => {
  //   if (
  //     playerState?.durationMillis === null ||
  //     playerState?.positionMillis === null
  //   ) {
  //     return 0;
  //   }

  //   return (playerState?.positionMillis / playerState?.durationMillis) * 100;
  // }, [playerState]);

  // useEffect(() => {
  //   // playCurrentMedia();
  //   if (media && showMiniPlayer) {
  //     Player.load(media, selectedTrackIndex, false, onPlaybackStatusUpdate);
  //   }
  // }, [media, selectedTrackIndex, showMiniPlayer]);

  const onTogglePlay = useCallback(() => {
    if (media) {
      dispatch(startToSetPlayback(!isPlaying));
    }
  }, [media, isPlaying]);

  const onPressMiniPlayer = useCallback(() => {
    dispatch(setMediaSlug(media?.slug));
    navigate('MediaScreen', {
      slug: media?.slug,
    });
    dispatch(setShowMiniPlayer(false));
  }, [media?.slug]);

  if (!media || showMiniPlayer === false) {
    return <></>;
  }

  return (
    <TouchableWithoutFeedback onPress={onPressMiniPlayer}>
      <View style={[styles.container, {bottom: tabBarHeight}]}>
        {/* <View style={[styles.progress, { width: `${getProgress()}%` }]} /> */}
        <View style={[styles.progress, {width: `100%`}]} />
        <View style={styles.row}>
          <Cover images={media?.images} size={Size.Small} />
          <View style={styles.rightContainer}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {media?.title}
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
    justifyContent: 'space-around',
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
