import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Chip} from './Chip';
import {Cover} from './Cover';
import {MediaButton} from './MediaButton';
import {MediaProgress} from './MediaProgress';
import {colors} from '../../constants/Colors';
import {View, Text} from '../Themed';
import Tracks from './Tracks';
import {Media} from '../../../types';
import {MediaSource, ProgressIndicator, Size} from '../../constants/Options';
import {downloadTracks} from '../../helpers/Utils';
import {RootStoreType} from '../../redux/rootReducer';
import {startToLikeMedia} from '../../redux/slices';
import {Rating} from './Rating';

type ContentProps = {
  media: Media | undefined;
  isPlaying: boolean | undefined;
  onPlayPress: () => void;
};

const Content = ({media, isPlaying, onPlayPress}: ContentProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    mediaSlugDownloading,
    mediaDownloadProgress,
    mediaSource,
    likingMedia,
  } = useSelector((state: RootStoreType) => ({
    mediaSlugDownloading: state.mediaReducer.mediaSlugDownloading,
    mediaDownloadProgress: state.mediaReducer.mediaDownloadProgress,
    mediaSource: state.mediaReducer.mediaSource,
    likingMedia: state.mediaReducer.likingMedia,
  }));

  const download = useCallback(() => {
    if (media) {
      if (mediaSlugDownloading) {
        Alert.alert(
          'Please wait until the current media finished downloading.',
        );
      } else {
        downloadTracks(media);
      }
    }
  }, [mediaSlugDownloading, media]);

  const onInfo = useCallback(() => {
    navigation.navigate('Info');
  }, []);

  const onShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `afridio://Media?id=${media?.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }, [media?.slug]);

  const likeMedia = useCallback(() => {
    dispatch(startToLikeMedia({slug: media?.slug, liked: !media?.liked}));
  }, [media?.liked]);

  return (
    <ScrollView
      style={styles.mainContainer}
      scrollEventThrottle={100}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}>
      <View style={styles.cardContainer}>
        <Cover images={media?.images} size={Size.Medium} />

        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{media?.title}</Text>
          <Text
            style={styles.cardTagline}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {media?.description}
          </Text>
          <Chip values={media?.genres} style={{marginTop: 5}} />

          <Rating rating={media?.rating} />
        </View>
        <View style={styles.playContainer}>
          <TouchableOpacity onPress={onPlayPress} style={styles.outerCircle}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color={colors.red200}
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {mediaSource === MediaSource.Server ? (
          <View style={styles.mediaButtons}>
            {likingMedia ? (
              <MediaProgress
                label="Like"
                type={ProgressIndicator.ActivityIndicator}
              />
            ) : (
              <MediaButton
                name="heart"
                label="Like"
                color={media?.liked ? colors.red800 : undefined}
                solid={media?.liked ? true : false}
                onPress={likeMedia}
              />
            )}

            <MediaButton name="info" label="Detail" onPress={onInfo} />

            <MediaButton name="share" label="Share" onPress={onShare} />

            {mediaSlugDownloading &&
            mediaSlugDownloading === media?.slug &&
            mediaDownloadProgress !== null ? (
              <MediaProgress
                label="Download"
                progress={mediaDownloadProgress}
                type={ProgressIndicator.Pie}
              />
            ) : (
              <MediaButton
                name="arrow-down-circle"
                label="Download"
                onPress={download}
              />
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.divider} />
      <Tracks />
    </ScrollView>
  );
};

export {Content};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.black800,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    backgroundColor: colors.black700,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 5,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 2,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    color: colors.red300,
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 10,
  },
  cardTagline: {
    color: colors.red300,
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 30,
  },
  playContainer: {
    flexDirection: 'column-reverse',
    backgroundColor: 'transparent',
    paddingRight: 10,
    paddingBottom: 4,
  },
  outerCircle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: colors.red800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 3,
  },
  divider: {
    paddingTop: 5,
    borderTopColor: colors.black700,
    borderTopWidth: 0.5,
  },
});
