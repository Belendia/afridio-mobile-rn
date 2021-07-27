import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  MediaListCard,
  ProgressBar,
  SearchInput,
  SearchMessage,
  Languages,
  Genres,
  Formats,
} from '../components';

import {View} from '../components/Themed';
import {colors} from '../constants/Colors';
import {RootStoreType} from '../redux/rootReducer';
import {
  startToGetSearchBy,
  startSearchingMedia,
  clearSearchResult,
} from '../redux/slices';

const SearchScreen = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const dispatch = useDispatch();

  //redux
  const {loadingSearchBy, searchBy, searchResult, searching} = useSelector(
    (state: RootStoreType) => ({
      loadingSearchBy: state.searchReducer.loadingSearchBy,
      searchBy: state.searchReducer.searchBy,
      searchResult: state.searchReducer.searchResult,
      searching: state.searchReducer.searching,
    }),
  );

  useEffect(() => {
    dispatch(startToGetSearchBy());
  }, []);

  const fetchData = useCallback(
    (
      search: string | null,
      format: string | null,
      language: string | null,
      genre: string | null,
    ) => {
      dispatch(
        startSearchingMedia({
          search: search,
          format: format,
          language: language,
          genre: genre,
        }),
      );
    },
    [],
  );

  const onSubmitEditing = useCallback((text: string) => {
    fetchData(text, null, null, null);
  }, []);

  const onBackButtonPressed = useCallback(() => setShowBack(false), [showBack]);

  const onFormatPress = useCallback((format: string) => {
    fetchData(null, format, null, null);
    setShowBack(true);
  }, []);
  const onLanguagePress = useCallback((language: string) => {
    fetchData(null, null, language, null);
    setShowBack(true);
  }, []);
  const onGenrePress = useCallback((genre: string) => {
    fetchData(null, null, null, genre);
    setShowBack(true);
  }, []);

  const handleOnTextInputFocus = useCallback((focus: boolean) => {
    setShowMessage(focus);
    dispatch(clearSearchResult());
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
        onSubmitEditing={onSubmitEditing}
        onFocus={handleOnTextInputFocus}
        showBackButton={showBack}
        onBackButtonPressed={onBackButtonPressed}
      />
      {searchResult && searchResult.length > 0 ? (
        <FlatList
          style={styles.container}
          data={searchResult}
          renderItem={({item}) => (
            <MediaListCard key={item.slug} media={item} />
          )}
          keyExtractor={item => item.slug}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}>
          {searching ? (
            <ProgressBar />
          ) : showMessage || loadingSearchBy ? (
            <SearchMessage
              info={searchResult && searchResult.length === 0 ? false : true}
            />
          ) : (
            combinedComponents
          )}
        </ScrollView>
      )}
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
