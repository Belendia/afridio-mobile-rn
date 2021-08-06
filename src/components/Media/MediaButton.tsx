import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../constants/Colors';

type MediaButtonProps = {
  name: string;
  label: string;
  color?: string | undefined;
  solid?: boolean | undefined;
  onPress: () => void;
};

class MediaButton extends PureComponent<MediaButtonProps> {
  render() {
    const {name, label, color, solid, onPress} = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
          {solid ? (
            <AntDesign
              style={styles.icon}
              color={color ? color : colors.red300}
              name={name}
            />
          ) : (
            <SimpleLineIcons
              style={styles.icon}
              color={color ? color : colors.red300}
              name={name}
            />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableHighlight>
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
    fontSize: 22,
  },
  label: {
    color: colors.red300,
    textAlign: 'center',
    marginTop: 8,
  },
});
