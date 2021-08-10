import React, {useState} from 'react';
import {StyleSheet, KeyboardType} from 'react-native';
import {Divider, Input} from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {Text, View} from '../Themed';
import {colors} from '../../constants/Colors';

type EditableTextProps = {
  title: string;
  value?: string | undefined;
  bottomDivider?: boolean | undefined;
  iconName: string;
  keyboardType?: KeyboardType | undefined;
  editable?: boolean | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};

const EditableText = ({
  title,
  value,
  bottomDivider,
  iconName,
  keyboardType,
  editable,
  onChangeText,
}: EditableTextProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const renderEdit = () => {
    if (editing) {
      return (
        <Input
          keyboardType={keyboardType}
          defaultValue={value}
          style={styles.input}
          inputContainerStyle={styles.inputContainer}
          onChangeText={text => onChangeText && onChangeText(text)}
        />
      );
    } else {
      return <Text style={styles.boldText}>{value}</Text>;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <SimpleLineIcons name={iconName} size={22} color={colors.red300} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {renderEdit()}
          </View>
        </View>
        {editable && (
          <Text style={styles.buttonText} onPress={() => setEditing(!editing)}>
            {editing ? 'Save' : 'Edit'}
          </Text>
        )}
      </View>
      {bottomDivider && (
        <Divider style={{backgroundColor: colors.black700, borderWidth: 0.3}} />
      )}
    </>
  );
};

EditableText.defaultProps = {
  bottomDivider: true,
  editable: true,
  keyboardType: 'default',
};

export {EditableText};

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
  buttonText: {
    fontWeight: '500',
    color: colors.red800,
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.red600,
  },
  input: {
    color: colors.red300,
  },
  inputContainer: {
    borderBottomColor: colors.red800,
    borderBottomWidth: 0.3,
  },
});
