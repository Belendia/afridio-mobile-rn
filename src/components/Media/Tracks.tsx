import React, {useCallback} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';

import {Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import {
  startSetCurrentTrack,
  setPlaylistMedia,
  setCurrentTrackIndex,
} from '../../redux/slices';
import {getTrack} from '../../helpers/Utils';

const Tracks = () => {
  const dispatch = useDispatch();

  const {media, playlistMedia, currentTrackIndex} = useSelector(
    (state: RootStoreType) => ({
      media: state.mediaReducer.media,
      playlistMedia: state.playlistReducer.playlistMedia,
      currentTrackIndex: state.playlistReducer.currentTrackIndex,
    }),
  );

  const setTrack = useCallback(index => {
    if (media?.slug === playlistMedia?.slug) {
      // what is playing is the same as the what is displayed in media screen
      dispatch(startSetCurrentTrack(getTrack(playlistMedia!, index)));
      dispatch(setCurrentTrackIndex(index));
    } else {
      /**
       *  What is played is different from the media that is displayed
       *  in media screen. So set the media in the playlist.
       **/
      dispatch(setPlaylistMedia(media));
      dispatch(startSetCurrentTrack(getTrack(media!, index)));
      dispatch(setCurrentTrackIndex(index));
    }
  }, []);

  return (
    <>
      {media?.tracks.map((item, index) => (
        <ListItem key={index} onPress={() => setTrack(index)}>
          <Avatar
            size="small"
            rounded
            title={(index + 1).toString()}
            titleStyle={[
              {color: colors.red300},
              media.slug === playlistMedia?.slug &&
                index === currentTrackIndex && {color: colors.red400},
            ]}
            avatarStyle={[
              {
                borderWidth: 1,
                borderColor: colors.red300,

                ...Platform.select({
                  android: {
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                  },
                }),
              },
              media.slug === playlistMedia?.slug &&
                index === currentTrackIndex && {borderColor: colors.red400},
            ]}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Text
                style={[
                  styles.title,
                  media.slug === playlistMedia?.slug &&
                    index === currentTrackIndex && {color: colors.red400},
                ]}>
                {item.name}
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text
                style={[
                  styles.duration,
                  media.slug === playlistMedia?.slug &&
                    index === currentTrackIndex && {color: colors.red400},
                ]}>
                {item.duration}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <AntDesign name="clouddownloado" size={24} color={'gray'} />
        </ListItem>
      ))}
    </>
  );
};

export default Tracks;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  title: {
    color: colors.red300,
  },
  duration: {
    color: colors.black300,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
