import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {View, Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {Media, MediaSource} from '../../../types';
import {
  setMediaLoadingTrue,
  setMediaSlug,
  setMediaSource,
} from '../../redux/slices';
import {Cover} from '../Media/Cover';

type SimpleMediaCardProps = {
  media: Media;
  mediaSource: MediaSource;
};

const SimpleMediaCard = memo(({media, mediaSource}: SimpleMediaCardProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        /**
         * When you open a media a second or more time, reload is false but there is a
         * media data in the redux from the previous call. So the app will try to render
         * that before it gets the latest data.
         **/
        dispatch(setMediaSource(mediaSource));
        dispatch(setMediaLoadingTrue());
        dispatch(setMediaSlug(media.slug));
        navigation.navigate('Media', {
          slug: media.slug,
        });
      }}>
      <View style={styles.cardContainer}>
        <Cover images={media.images} />

        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {media.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export {SimpleMediaCard};

const styles = StyleSheet.create({
  cardContainer: {
    height: 231,
    width: 135,
    backgroundColor: colors.black600,
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 5,
  },
  cardTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black600,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardTitle: {
    color: colors.red300,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 3,
  },
});
