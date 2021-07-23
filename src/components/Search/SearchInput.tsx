import React, {useRef, useState, useCallback} from 'react';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../../constants/Colors';
import {View} from '../Themed';

type SearchInputProps = {
  onChangeText: (value: string) => void;
  onFocus: (focus: boolean) => void;
};

const SearchInput = ({onChangeText, onFocus}: SearchInputProps) => {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    setQuery('');
    searchInput.current?.blur();
    Keyboard.dismiss();
  }, []);

  const onInputBoxFocus = useCallback(
    (val: boolean) => {
      setFocus(val);
      onFocus(val);
    },
    [focus],
  );

  const handleQuery = useCallback((text: string) => {
    setQuery(text);
    onChangeText(text);
  }, []);

  const onBackPress = useCallback(() => {
    if (focus) handleClear();
  }, [focus]);
  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons
        onPress={onBackPress}
        style={[{bottom: 6}, styles.searchIcon]}
        name={focus ? 'arrow-back' : 'search'}
        size={26}
        color={colors.red300}
      />

      <TextInput
        ref={searchInput}
        autoFocus={false}
        numberOfLines={1}
        value={query}
        onChangeText={handleQuery}
        onFocus={() => onInputBoxFocus(true)}
        onBlur={() => onInputBoxFocus(false)}
        placeholder="Search media, authors and artists"
        placeholderTextColor={colors.red300}
        selectionColor={colors.white}
        style={styles.searchInput}
      />
      {query.length > 0 && (
        <MaterialIcons
          onPress={handleClear}
          style={styles.clearIcon}
          name="close"
          size={28}
          color={colors.red300}
        />
      )}
    </View>
  );
};

export {SearchInput};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: colors.black700,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchIcon: {
    bottom: 0,
    padding: 14,
    height: '100%',
    textAlignVertical: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: colors.red200,
    height: '100%',
    marginLeft: 4,
    width: '70%',
    letterSpacing: 0.4,
    marginTop: 2,
  },
  clearIcon: {
    position: 'absolute',
    padding: 11.5,
    height: '100%',
    textAlignVertical: 'center',
    right: 0,
    paddingRight: 16,
  },
});
