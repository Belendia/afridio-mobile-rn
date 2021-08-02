import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {View, Text} from './Themed';
import {colors} from '../constants/Colors';

const NoData = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="database-remove"
        size={70}
        color={colors.red300}
      />
      <Text style={styles.title}>Unable to load content</Text>
      <Text style={styles.message}>No Data Found</Text>
    </View>
  );
};

export {NoData};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 30,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: colors.red300,
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});
