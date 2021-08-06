import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';
import {ProgressType} from '../../../types';
import {colors} from '../../constants/Colors';

type MediaProgressProps = {
  label: string;
  progress?: number | undefined;
  type: ProgressType;
};

class MediaProgress extends PureComponent<MediaProgressProps> {
  render() {
    const {label, progress, type} = this.props;
    return (
      <View style={styles.container}>
        {type == ProgressType.ActivityIndicator ? (
          <ActivityIndicator size={22} color={colors.red900} />
        ) : (
          <Progress.Pie progress={progress} size={22} color={colors.red900} />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

export {MediaProgress};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    color: colors.red300,
    textAlign: 'center',
    marginTop: 8,
  },
});
