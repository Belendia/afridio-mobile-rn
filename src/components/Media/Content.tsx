import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {Chip} from './Chip';
import {Cover} from './Cover';
import {MediaButton} from './MediaButton';
import {MediaProgress} from './MediaProgress';
import {colors} from '../../constants/Colors';
import {View, Text} from '../Themed';
import Info from './Info';
import Tracks from './Tracks';
import {Media, MediaSource, ProgressType} from '../../../types';
import {Size} from '../../constants/Options';
import {downloadTracks} from '../../helpers/Utils';
import {RootStoreType} from '../../redux/rootReducer';
import {startToLikeMedia} from '../../redux/slices';
import {ProgressBar} from '../ProgressBar';
import {Rating} from './Rating';

const Tab = createMaterialTopTabNavigator();

type ContentProps = {
  media: Media | undefined;
  isPlaying: boolean | undefined;
  onPlayPress: () => void;
};

const Content = ({media, isPlaying, onPlayPress}: ContentProps) => {
  const dispatch = useDispatch();

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

  const likeMedia = useCallback(() => {
    dispatch(startToLikeMedia({slug: media?.slug, liked: !media?.liked}));
  }, [media?.liked]);

  return (
    <ScrollView
      style={styles.mainContainer}
      scrollEventThrottle={100}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
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
          {/* <View style={styles.outerCircle}></View> */}
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
                type={ProgressType.ActivityIndicator}
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

            <MediaButton name="share" label="Share" onPress={() => true} />
            {mediaSlugDownloading &&
            mediaSlugDownloading === media?.slug &&
            mediaDownloadProgress !== null ? (
              <MediaProgress
                label="Download"
                progress={mediaDownloadProgress}
                type={ProgressType.Pie}
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

        <Tab.Navigator
          initialRouteName="Chapter"
          tabBarOptions={{
            activeTintColor: 'white',
            labelStyle: {fontSize: 12},
            style: {backgroundColor: colors.black600},
            indicatorStyle: {
              backgroundColor: colors.red800,
            },
          }}>
          <Tab.Screen
            name="Chapter"
            component={Tracks}
            options={{tabBarLabel: 'Chapters'}}
          />
          <Tab.Screen
            name="Info"
            component={Info}
            options={{tabBarLabel: 'Info'}}
          />
        </Tab.Navigator>
      </View>
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
    marginHorizontal: 10,
    backgroundColor: colors.black600,
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
});
