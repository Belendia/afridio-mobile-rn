import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox, Overlay} from 'react-native-elements';

import {colors} from '../../constants/Colors';
import {View} from '../Themed';

export type CheckboxOption = {
  key: number;
  title: string;
};

type CheckboxListProps = {
  options: CheckboxOption[];
  value: CheckboxOption;
  show: boolean;
  onSelect: (option: CheckboxOption) => void;
  onClose: () => void;
};

const CheckboxList = ({
  options,
  value,
  show,
  onSelect,
  onClose,
}: CheckboxListProps) => {
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        {options.map((option: CheckboxOption) => (
          <CheckBox
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={option.title}
            key={option.key}
            checkedColor={colors.red800}
            checked={value.key === option.key}
            onPress={() => onSelect(option)}
          />
        ))}
      </View>
    </Overlay>
  );
};

export {CheckboxList};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.black600,
    borderWidth: 1,
    borderColor: colors.red300,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.black600,
  },
  checkbox: {
    backgroundColor: colors.black600,
    borderWidth: 0,
    padding: 3,
  },
  checkboxText: {
    fontSize: 14,
  },
});
