import React, {useCallback} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Media, MediaSource} from '../../types';

import {MediaListCard} from '../components';
import {Text, View} from '../components/Themed';
import {colors} from '../constants/Colors';
import {deleteTracks} from '../helpers/Utils';
import {RootStoreType} from '../redux/rootReducer';
import {deleteMediaFromLibrary} from '../redux/slices';

const {height} = Dimensions.get('window');

const LibraryScreen = () => {
  const dispatch = useDispatch();

  const {library} = useSelector((state: RootStoreType) => ({
    library: state.mediaReducer.library,
  }));

  const onDeletePressed = useCallback((media: Media) => {
    dispatch(deleteMediaFromLibrary(media.slug));
    deleteTracks(media);
  }, []);

  return (
    <View style={{flex: 1, height: height}}>
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          minHeight: '100%',
        }}
        data={library}
        renderItem={({item}) => (
          <MediaListCard
            key={item.slug}
            media={item}
            mediaSource={MediaSource.Local}
            showDelete={true}
            onDeletePressed={onDeletePressed}
          />
        )}
        keyExtractor={item => item.slug}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <SimpleLineIcons
              name={'book-open'}
              size={70}
              color={colors.red300}
            />
            <Text style={styles.header}>No medias found</Text>
            <Text style={styles.subheader}>
              Search and download the media you like.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
    ...Platform.select({
      ios: {
        paddingTop: 30,
        paddingBottom: 300,
      },
    }),
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '600',
    fontSize: 22,
    color: colors.white,
    letterSpacing: 0.3,
    marginTop: 30,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: colors.red300,
    marginTop: 10,
  },
});
