import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  MediaListCard,
  ProgressBar,
  SearchInput,
  SearchIntro,
  Languages,
  Genres,
  Formats,
} from '../components';

import {View} from '../components/Themed';
import {colors} from '../constants/Colors';
import {RootStoreType} from '../redux/rootReducer';
import {startToGetSearchBy} from '../redux/slices';

const SearchScreen = () => {
  const [showIntro, setShowIntro] = useState(false);

  const dispatch = useDispatch();

  //redux
  const {loadingSearchBy, searchBy} = useSelector((state: RootStoreType) => ({
    loadingSearchBy: state.searchReducer.loadingSearchBy,
    searchBy: state.searchReducer.searchBy,
  }));

  useEffect(() => {
    dispatch(startToGetSearchBy());
  }, []);

  const onChangeText = useCallback(
    (text: string) => {
      console.log(text);
    },
    [], //[getQuery],
  );

  const onFormatPress = useCallback((name: string) => {
    console.log(name);
  }, []);
  const onLanguagePress = useCallback((name: string) => {
    console.log(name);
  }, []);
  const onGenrePress = useCallback((name: string) => {
    console.log(name);
  }, []);

  const handleOnTextInputFocus = useCallback((focus: boolean) => {
    setShowIntro(focus);
  }, []);

  let format = <></>;
  if (searchBy && searchBy?.formats) {
    format = (
      <Formats formats={searchBy?.formats} onFormatPress={onFormatPress} />
    );
  }

  let language = <></>;
  if (searchBy && searchBy?.languages) {
    language = (
      <Languages
        languages={searchBy?.languages}
        onLanguagePress={onLanguagePress}
      />
    );
  }

  let genre = <></>;
  if (searchBy && searchBy?.genres) {
    genre = <Genres genres={searchBy?.genres} onGenrePress={onGenrePress} />;
  }

  const combinedComponents = (
    <>
      {format}
      {language}
      {genre}
    </>
  );

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={onChangeText}
        onFocus={handleOnTextInputFocus}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        {showIntro || loadingSearchBy ? <SearchIntro /> : combinedComponents}
        {/* { <ProgressBar />} */}
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
