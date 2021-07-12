import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../constants/Colors';

type MediaButtonProps = {
  name: string;
  label: string;
  onPress: () => void;
};

class MediaButton extends PureComponent<MediaButtonProps> {
  render() {
    const {name, label, onPress} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <SimpleLineIcons style={styles.icon} name={name} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export {MediaButton};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.red300,
  },
  label: {
    color: colors.red300,
    textAlign: 'center',
    marginTop: 8,
  },
});
