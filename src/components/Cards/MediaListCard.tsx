import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {View, Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {Chip} from '../Media/Chip';
import {Media, MediaSource} from '../../../types';
import {Cover} from '../Media/Cover';
import {useDispatch} from 'react-redux';
import {setMediaSlug, setMediaSource} from '../../redux/slices';
import {Rating} from '../Media/Rating';

type MediaListCardProps = {
  media: Media;
  mediaSource: MediaSource;
  showDelete?: boolean;
  onDeletePressed?: (media: Media) => void;
};

const MediaListCard = ({
  media,
  mediaSource,
  showDelete,
  onDeletePressed,
}: MediaListCardProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          dispatch(setMediaSlug(media.slug));
          dispatch(dispatch(setMediaSource(mediaSource)));
          navigation.navigate('MediaScreen', {
            slug: media.slug,
          });
        }}>
        <View style={styles.card}>
          <Cover images={media?.images} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle} numberOfLines={3}>
              {media.title}
            </Text>
            <Chip values={media.genres} />
            <Rating rating={media.rating} />
            <Text
              style={styles.cardDescription}
              numberOfLines={3}
              ellipsizeMode="tail">
              {media.description}
            </Text>
          </View>
          {showDelete && (
            <TouchableOpacity
              style={styles.remove}
              onPress={() => onDeletePressed && onDeletePressed(media)}>
              <MaterialIcons
                name={'delete-outline'}
                size={24}
                color={colors.red300}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {MediaListCard};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.black600,
    borderRadius: 3,
    minHeight: 148,
    flexDirection: 'row',
    paddingRight: 2,
    overflow: 'hidden',
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    color: colors.black300,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  cardDescription: {
    color: colors.black300,
    fontSize: 13,
    marginTop: 5,
  },
  remove: {
    marginTop: 5,
    // alignSelf: 'center',
  },
});
