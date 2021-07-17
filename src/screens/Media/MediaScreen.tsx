import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {View} from '../../components/Themed';
import {RootStoreType} from '../../redux/rootReducer';
import {
  setShowMiniPlayer,
  startToGetMedia,
  startSetCurrentTrack,
  setPlaylistMedia,
  startTogglePlay,
  setCurrentTrackIndex,
} from '../../redux/slices';
import {
  ProgressBar,
  Error,
  NoData,
  Content,
  PlayerContainer,
  Backdrop,
} from '../../components';
import {getTrack} from '../../helpers/Utils';

const MediaScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const {loading, media, playlistMedia, currentTrackIndex, isPlaying, error} =
    useSelector((state: RootStoreType) => ({
      loading: state.mediaReducer.loading,
      media: state.mediaReducer.media,
      playlistMedia: state.playlistReducer.playlistMedia,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      isPlaying: state.playlistReducer.isPlaying,

      error: state.mediaReducer.error,
    }));

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(startToGetMedia(route.params?.slug));
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(setShowMiniPlayer(false));
  }, []);

  useEffect(() => {
    dispatch(setShowMiniPlayer(false));
    return () => {
      /**
       * If the media screen is called from the main player, the app
       * should not show the mini player because when the main screen
       * is closing, it will return back to the main player again.
       */
      if (!route.params?.disableShowMiniPlayer) {
        dispatch(setShowMiniPlayer(isPlaying));
      }
    };
  }, [isPlaying]);

  const onTogglePlay = useCallback(() => {
    /**
     *  Check what is played is different from the media that is displayed
     *  in media screen. If so, set the media in the playlist.
     **/
    if (playlistMedia === null || media?.slug !== playlistMedia?.slug) {
      dispatch(setPlaylistMedia(media));
      dispatch(startSetCurrentTrack(getTrack(media!, 0)));
      dispatch(setCurrentTrackIndex(0));
    } else {
      dispatch(startTogglePlay(!isPlaying));
    }
  }, [media, playlistMedia, isPlaying]);

  if (error && typeof error === 'string') {
    return <Error title={'Error'} message={error} onRetry={fetchData} />;
  }

  return loading ? (
    <PlayerContainer iconName={'arrow-back'}>
      <ProgressBar />
    </PlayerContainer>
  ) : media ? (
    <PlayerContainer iconName={'arrow-back'}>
      <View style={styles.bannerContainer}>
        <Backdrop images={media.images} />
      </View>
      <Content
        media={media}
        isPlaying={media.slug === playlistMedia?.slug ? isPlaying : false}
        onPlayPress={onTogglePlay}
      />
    </PlayerContainer>
  ) : (
    <PlayerContainer iconName="arrow-back">
      <NoData />
    </PlayerContainer>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlay: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  iconPlay: {
    opacity: 0.8,
    backgroundColor: 'transparent',
  },
  player: {
    height: 248,
    width: '100%',
  },
});
