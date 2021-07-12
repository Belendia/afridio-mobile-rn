import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {View} from '../../components/Themed';
import {RootStoreType} from '../../redux/rootReducer';
import {
  setShowMiniPlayer,
  startToGetMedia,
  startToSetPlayback,
} from '../../redux/slices';
import {
  ProgressBar,
  Error,
  NoData,
  Content,
  PlayerContainer,
  Backdrop,
} from '../../components';

const MediaScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const {loading, media, currentTrackIndex, isPlaying, error} = useSelector(
    (state: RootStoreType) => ({
      loading: state.mediaReducer.loading,
      media: state.mediaReducer.media,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
      isPlaying: state.playlistReducer.isPlaying,
      error: state.mediaReducer.error,
    }),
  );

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
      dispatch(setShowMiniPlayer(isPlaying));
    };
  }, [isPlaying]);

  const onTogglePlay = useCallback(() => {
    if (media) {
      dispatch(startToSetPlayback(!isPlaying));
    }
  }, [media, isPlaying]);

  if (error && typeof error === 'string') {
    return <Error title={'Error'} message={error} onRetry={fetchData} />;
  }

  return loading ? (
    <PlayerContainer>
      <ProgressBar />
    </PlayerContainer>
  ) : media ? (
    <PlayerContainer>
      <View style={styles.bannerContainer}>
        <Backdrop images={media.images} />
      </View>
      <Content media={media} isPlaying={isPlaying} onPlayPress={onTogglePlay} />
    </PlayerContainer>
  ) : (
    <PlayerContainer>
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
