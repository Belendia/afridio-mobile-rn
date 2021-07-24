import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../constants/Colors';

import {Text} from '../Themed';

type GradientCardOption = {
  name: string;
  index: number;
};

const GradientCard = memo(({name, index}: GradientCardOption) => {
  const colors = gradient[index % (gradient.length - 1)];
  return (
    <LinearGradient
      colors={[colors[0], colors[1]]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Text>{name}</Text>
    </LinearGradient>
  );
});

export {GradientCard};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 2,
    padding: 10,
  },
});
