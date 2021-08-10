import React from 'react';
import {ViewStyle} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Text, View} from '../Themed';
import {colors} from '../../constants/Colors';

export type SexOption = {
  key: string;
  value: string;
};

type OptionsInputProps = {
  title: string;
  values: SexOption[];
  defaultValue?: SexOption | undefined;
  bottomDivider?: boolean | undefined;
  iconName: string;
  errorMessage?: string | undefined;
  style?: ViewStyle | undefined;
  onPress?: ((option: SexOption) => void) | undefined;
};

const OptionsInput = ({
  title,
  values,
  defaultValue,
  bottomDivider,
  iconName,
  errorMessage,
  style,
  onPress,
}: OptionsInputProps) => {
  return (
    <View
      style={[
        styles.section,
        bottomDivider && {
          borderBottomColor: colors.black700,
          borderBottomWidth: 0.5,
        },
      ]}>
      <View style={styles.content}>
        <SimpleLineIcons name={iconName} size={20} color={colors.red300} />

        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.group, style]}>
        {values.map((v, i) => (
          <TouchableOpacity
            style={[
              styles.button,
              styles.first,
              defaultValue &&
                (v.key === defaultValue.key ? styles.active : null),
            ]}
            key={i}
            onPress={() => onPress && onPress(v)}>
            <Text
              style={[
                styles.buttonText,
                defaultValue &&
                  (v.key === defaultValue.key ? styles.activeText : null),
              ]}>
              {v.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

OptionsInput.defaultProps = {
  bottomDivider: true,
  keyboardType: 'default',
};

export {OptionsInput};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  title: {
    color: colors.red300,
    fontSize: 16,
    marginLeft: 10,
  },
  group: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 0.3,
    borderColor: colors.red800,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    padding: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.red300,
  },
  active: {
    backgroundColor: colors.red800,
    borderRadius: 14,
  },
  activeText: {
    color: colors.white,
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 12,
    color: colors.red800,
    marginTop: 5,
  },
});
