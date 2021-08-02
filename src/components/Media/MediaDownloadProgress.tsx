import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {colors} from '../../constants/Colors';

type MediaDownloadProgressProps = {
  label: string;
  progress: number;
};

class MediaDownloadProgress extends PureComponent<MediaDownloadProgressProps> {
  render() {
    const {label, progress} = this.props;
    return (
      <View style={styles.container}>
        <Progress.Pie progress={progress} size={24} color={colors.red800} />
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

export {MediaDownloadProgress};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: colors.red300,
    textAlign: 'center',
    marginTop: 8,
  },
});
