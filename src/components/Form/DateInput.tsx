import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Input} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateField from 'react-native-datefield';

import {Text, View} from '../Themed';
import {colors} from '../../constants/Colors';

type DateInputProps = {
  title: string;
  value?: Date | undefined;
  bottomDivider?: boolean | undefined;
  placeholderTextColor?: string | undefined;
  errorMessage?: string | undefined;
  iconName: string;
  onSubmit?: ((value: Date) => void) | undefined;
};

const DateInput = ({
  title,
  value,
  bottomDivider,
  iconName,
  errorMessage,
  placeholderTextColor,
  onSubmit,
}: DateInputProps) => {
  const date: Date = new Date();
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <SimpleLineIcons name={iconName} size={20} color={colors.red300} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <DateField
              editable={true}
              styleInput={styles.border}
              defaultValue={value}
              maximumDate={
                new Date(date.getFullYear(), date.getMonth(), date.getDate())
              }
              minimumDate={new Date(1900, 1, 1)}
              placeholderTextColor={placeholderTextColor}
              handleErrors={() => setError('Invalid date')}
              onSubmit={(value: Date) => {
                setError(undefined);
                if (onSubmit) onSubmit(value);
              }}
            />
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            {error && <Text style={styles.errorMessage}>{error}</Text>}
          </View>
        </View>
      </View>
      {bottomDivider && (
        <Divider style={{backgroundColor: colors.black700, borderWidth: 0.3}} />
      )}
    </>
  );
};

DateInput.defaultProps = {
  bottomDivider: true,
  placeholderTextColor: colors.black700,
};

export {DateInput};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 6,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    flex: 1,
  },
  titleWrapper: {
    backgroundColor: 'transparent',
    marginLeft: 12,
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    color: colors.red300,
    fontSize: 16,
    marginBottom: 10,
  },
  border: {
    width: '30%',
    borderRadius: 8,
    borderColor: colors.red800,
    borderWidth: 0.3,
    marginBottom: 5,
    color: colors.red300,
    height: 30,
  },
  errorMessage: {
    fontSize: 12,
    color: colors.red800,
    alignItems: 'flex-end',
  },
});
