import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {View, Text} from '../Themed';
import {colors} from '../../constants/Colors';
import {RootStoreType} from '../../redux/rootReducer';
import {Author} from './Author';
import {Chip} from './Chip';
import {Cover, PlayerContainer} from '..';
import {Size} from '../../constants/Options';
import {Rating} from './Rating';

const Info = () => {
  const {media} = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
  }));
  return (
    <PlayerContainer iconName={'arrow-back'}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Cover images={media?.images} size={Size.Medium} />

          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{media?.title}</Text>
            <Chip values={media?.genres} style={{marginTop: 5}} />

            <Rating rating={media?.rating} />
          </View>
        </View>
        <View style={styles.overview}>
          <Text style={styles.label}>Overview</Text>
          <Text style={styles.overviewText}>{media?.description}</Text>
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Release Date</Text>
          <Text style={styles.value}>{media?.release_date}</Text>
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>{media?.language}</Text>
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Narrated By</Text>
        </View>
        <View>
          <Chip values={media?.narrators} style={{marginVertical: 5}} />
        </View>

        <View style={styles.labelRow}>
          <Text style={styles.label}>Authors</Text>
        </View>
        <View style={styles.authorsContainer}>
          {media?.authors.map((item, index) => (
            <Author {...item} size={'large'} key={index} />
          ))}
        </View>
      </View>
    </PlayerContainer>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingVertical: 5,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 10,
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
  overview: {
    marginBottom: 15,
    paddingTop: 10,
  },
  overviewText: {
    color: colors.red300,
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 22,
  },
  label: {
    color: colors.red300,
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    color: colors.red300,
    fontSize: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderBottomColor: colors.black600,
    borderBottomWidth: 1,
  },
  authorsContainer: {
    marginTop: 20,
  },
});
