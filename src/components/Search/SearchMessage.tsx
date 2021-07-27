import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';

import {Text, View} from '../Themed';

type SearchMessageProps = {
  info: boolean;
};

const SearchMessage = ({info}: SearchMessageProps) => {
  return (
    <View style={styles.container}>
      {info ? (
        <>
          <Text style={styles.header}>Find the media you love</Text>
          <Text style={styles.subheader}>from lots of authors and artists</Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>No results found</Text>
          <Text style={styles.subheader}>
            please check you have the right spelling, or try different
            keyworkds.
          </Text>
        </>
      )}
    </View>
  );
};

SearchMessage.defaultProps = {
  info: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    color: colors.red300,
    marginTop: 10,
    textAlign: 'center',
  },
});

export {SearchMessage};
