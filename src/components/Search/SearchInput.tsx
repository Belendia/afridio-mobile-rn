import React, {useRef, useState, useCallback} from 'react';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../../constants/Colors';
import {View} from '../Themed';

type SearchInputProps = {
  showBackButton: boolean;
  onSubmitEditing: (value: string) => void;
  onFocus: (focus: boolean) => void;
  onBackButtonPressed: () => void;
};

const SearchInput = ({
  showBackButton,
  onSubmitEditing,
  onFocus,
  onBackButtonPressed,
}: SearchInputProps) => {
  const [showBack, setShowBack] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    setQuery('');
    searchInput.current?.blur();
    Keyboard.dismiss();
    setShowBack(false);
    onFocus(false);
  }, []);

  const onInputBoxFocus = useCallback(() => {
    if (query.length === 0) {
      setShowBack(true);
      onFocus(true);
    }
  }, [showBack, query]);

  const handleQuery = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const onBackPress = useCallback(() => {
    handleClear();
    onBackButtonPressed();
  }, [showBack, query]);
  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons
        onPress={onBackPress}
        style={[{bottom: 6}, styles.searchIcon]}
        name={showBack || showBackButton ? 'arrow-back' : 'search'}
        size={26}
        color={colors.red300}
      />

      <TextInput
        ref={searchInput}
        autoFocus={false}
        numberOfLines={1}
        value={query}
        returnKeyType={'search'}
        onChangeText={handleQuery}
        onFocus={() => onInputBoxFocus()}
        onSubmitEditing={e => onSubmitEditing(e.nativeEvent.text)}
        placeholder="Search media"
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

SearchInput.defaultProps = {
  showBackButton: false,
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
