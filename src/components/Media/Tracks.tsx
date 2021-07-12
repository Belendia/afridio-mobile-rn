import React, {useCallback} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';

import {Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import {startSetCurrentTrack} from '../../redux/slices';
import {getTrack} from '../../helpers/Utils';

const Tracks = () => {
  const dispatch = useDispatch();

  const {media, currentTrackIndex} = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
    currentTrackIndex: state.playlistReducer.currentTrackIndex,
  }));

  const setTrack = useCallback(
    index => dispatch(startSetCurrentTrack(getTrack(media!, index))),
    [],
  );

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
              index === currentTrackIndex && {borderColor: colors.red400},
            ]}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Text
                style={[
                  styles.title,
                  index === currentTrackIndex && {color: colors.red400},
                ]}>
                {item.name}
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text
                style={[
                  styles.duration,
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
