import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {View, Text} from './Themed';
import {colors} from '../constants/Colors';

type ErrorProps = {
  title: string;
  message: string;
  onRetry?: (() => void) | undefined;
};

const Error = ({title, message, onRetry}: ErrorProps) => {
  let iconName = 'warning';

  if (message === 'Check your internet connection and try again.') {
    iconName = 'wifi';
  }
  return (
    <View style={styles.container}>
      <AntDesign name={iconName} size={70} color={colors.red300} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <Button
        title="Try Again"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{fontSize: 16, fontWeight: '600'}}
        containerStyle={{marginTop: 10}}
        onPress={() => {
          if (onRetry) onRetry();
        }}
      />
    </View>
  );
};

export {Error};

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
