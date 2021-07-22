import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet, Keyboard, TextInput, ScrollView} from 'react-native';
import {
  MediaListCard,
  ProgressBar,
  SearchInput,
  SearchIntro,
} from '../components';

import {View} from '../components/Themed';
import {colors} from '../constants/Colors';

const SearchScreen = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const onChangeText = useCallback(
    (text: string) => {
      console.log(text);
    },
    [], //[getQuery],
  );

  return (
    <View style={styles.container}>
      <SearchInput onChangeText={onChangeText} />
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
  scrollView: {
    backgroundColor: colors.black800,
  },
  scrollContent: {flexGrow: 1},
  loading: {
    ...StyleSheet.absoluteFillObject,
  },
});
