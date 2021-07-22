import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet, Keyboard, TextInput, ScrollView} from 'react-native';
import {MediaListCard, ProgressBar, SearchIntro} from '../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {View} from '../components/Themed';
import {colors} from '../constants/Colors';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const searchInput = useRef<TextInput>(null);

  const handleQuery = useCallback(
    (text: string) => {
      setQuery(text);
      // getQuery(text);
    },
    [], //[getQuery],
  );

  const handleClear = useCallback(() => {
    // getQuery('');
    setQuery('');

    Keyboard.dismiss();
  }, []); //[getQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <MaterialIcons
          // onPress={onPress}
          style={[{bottom: 6}, styles.searchIcon]}
          name="search"
          size={26}
          color={colors.red300}
        />

        <TextInput
          ref={searchInput}
          autoFocus
          numberOfLines={1}
          value={query}
          onChangeText={handleQuery}
          // onFocus={handleInputFocus}
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        {(showIntro && <SearchIntro />) || (showLoading && <ProgressBar />)}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
  },
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
  scrollView: {
    backgroundColor: colors.black800,
  },
  scrollContent: {flexGrow: 1},
  loading: {
    ...StyleSheet.absoluteFillObject,
  },
});
