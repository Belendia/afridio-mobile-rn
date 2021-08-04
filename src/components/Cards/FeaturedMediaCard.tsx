import React, {memo} from 'react';
import {StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {View, Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {Media, MediaSource} from '../../../types';
import {Chip} from '../Media/Chip';
import {
  setMediaLoadingTrue,
  setMediaSlug,
  setMediaSource,
} from '../../redux/slices';
import {Rating} from '../Media/Rating';

type FeaturedMediaCardProps = {
  media: Media;
  mediaSource: MediaSource;
};

const FeaturedMediaCard = memo(
  ({media, mediaSource}: FeaturedMediaCardProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let poster = null;
    if (media.images?.length > 0) {
      poster = media.images.find(img => img.width === 500);
    }

    let cover = null;
    if (media.images?.length > 0) {
      cover = media.images.find(img => img.width === 300);
    }
    return (
      <View>
        {poster ? (
          <Image source={{uri: poster?.image}} style={styles.imageBackdrop} />
        ) : (
          <Image
            source={require('../../../assets/images/backdrop.png')}
            style={styles.imageBackdrop}
          />
        )}

        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.3)',
            'rgba(0,0,0, 0.5)',
            'rgba(0,0,0, 0.7)',
          ]}
          style={styles.linearGradient}
        />
        <View style={styles.cardContainer}>
          {cover ? (
            <Image source={{uri: cover?.image}} style={styles.cardImage} />
          ) : (
            <Image
              source={require('../../../assets/images/no-cover.png')}
              style={styles.cardImage}
            />
          )}
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {media.title}
            </Text>
            {media.genres && media.genres.length > 0 && (
              <Chip values={[media.genres[0]]} />
            )}

            <View style={styles.cardNumbers}>
              <Rating rating={media?.rating} />
            </View>
            <Text
              style={styles.cardDescription}
              numberOfLines={2}
              ellipsizeMode="tail">
              {media.description}
            </Text>
            <Button
              title="View Detail"
              buttonStyle={{backgroundColor: colors.red800}}
              titleStyle={{fontSize: 16}}
              onPress={() => {
                /**
                 * When you open a media a second or more time, reload is false but there is a
                 * media data in the redux from the previous call. So the app will try to render
                 * that before it gets the latest data.
                 **/

                dispatch(setMediaSource(mediaSource));
                dispatch(setMediaLoadingTrue());
                dispatch(setMediaSlug(media.slug));
                navigation.navigate('MediaScreen', {
                  slug: media.slug,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  },
);

export {FeaturedMediaCard};

const styles = StyleSheet.create({
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: 'absolute',
  },
  imageBackdrop: {
    // flex: 1,
    height: 248,
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
  },
  cardContainer: {
    position: 'absolute',
    top: 32,
    right: 16,
    left: 16,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '500',
    paddingTop: 10,
  },
  cardDescription: {
    color: colors.red300,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  },
  cardNumbers: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: 'transparent',
  },
});
