import React from 'react';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {View, Text} from '../Themed';
import {colors} from '../../constants/Colors';

type RatingProps = {
  rating?: string | null;
};

const Rating = ({rating}: RatingProps) => {
  return (
    <View style={styles.container}>
      <AntDesign name="heart" size={16} color={colors.red800} />
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

export {Rating};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.red300,
  },
});
