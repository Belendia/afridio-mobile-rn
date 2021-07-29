import React, {useEffect} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MediaSource} from '../../types';

import {MediaListCard} from '../components';
import {View} from '../components/Themed';
import {colors} from '../constants/Colors';
import {RootStoreType} from '../redux/rootReducer';
import {setMediaSource} from '../redux/slices';

const {height} = Dimensions.get('window');

const LibraryScreen = () => {
  const dispatch = useDispatch();

  const {library} = useSelector((state: RootStoreType) => ({
    library: state.mediaReducer.library,
  }));

  useEffect(() => {
    dispatch(setMediaSource(MediaSource.Local));
  }, []);

  return (
    <View style={{flex: 1, height: height}}>
      <FlatList
        style={styles.container}
        data={library}
        renderItem={({item}) => <MediaListCard key={item.slug} media={item} />}
        keyExtractor={item => item.slug}
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
});