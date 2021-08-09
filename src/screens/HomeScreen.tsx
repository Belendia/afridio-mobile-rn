import React, {useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {FeaturedMediaCard} from '../components/Cards/FeaturedMediaCard';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'pinar';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {View} from '../components/Themed';
import HomeCategory from '../components/HomeCategory';
import {colors} from '../constants/Colors';
import {startToGetHomeScreenData} from '../redux/slices/homeSlice';
import {RootStoreType} from '../redux/rootReducer';
import {ProgressBar, Error} from '../components';
import {setTabBarHeight} from '../redux/slices';
import layout from '../constants/Layout';
import {MediaSource} from '../constants/Options';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();

  //redux
  const {loading, featuredMedias, nonFeaturedMedias, error} = useSelector(
    (state: RootStoreType) => ({
      loading: state.homeReducer.loading,
      featuredMedias: state.homeReducer.featuredMedias,
      nonFeaturedMedias: state.homeReducer.nonFeaturedMedias,
      error: state.homeReducer.error,
    }),
  );

  const fetchData = useCallback(() => {
    dispatch(startToGetHomeScreenData());
  }, [dispatch, startToGetHomeScreenData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // tabBarHeight is required by the MiniPlayer component to set its bottom
    dispatch(setTabBarHeight(tabBarHeight));
  }, [tabBarHeight]);

  if (error && typeof error === 'string') {
    return (
      <Error
        title={'Unable to load content'}
        message={error}
        onRetry={fetchData}
      />
    );
  }
  return loading ? (
    <ProgressBar />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={nonFeaturedMedias}
        renderItem={({item}) => <HomeCategory key={item.id} {...item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={fetchData}
            colors={[colors.white]}
            tintColor={colors.red400}
            title="loading..."
            titleColor={colors.red400}
            progressBackgroundColor={colors.red400}
          />
        }
        ListHeaderComponent={
          featuredMedias &&
          featuredMedias.length > 0 &&
          featuredMedias[0].medias &&
          featuredMedias[0].medias.length > 1 ? (
            <Carousel
              height={248}
              width={layout.window.width}
              loop={true}
              showsControls={false}
              showsDots={false}
              autoplay={true}
              autoplayInterval={5000}>
              {featuredMedias[0].medias.map(item => (
                <FeaturedMediaCard
                  key={item.slug}
                  media={item}
                  mediaSource={MediaSource.Server}
                />
              ))}
            </Carousel>
          ) : featuredMedias &&
            featuredMedias.length > 0 &&
            featuredMedias[0].medias &&
            featuredMedias[0].medias.length === 1 ? (
            <FeaturedMediaCard
              key={featuredMedias[0].medias[0].slug}
              media={featuredMedias[0].medias[0]}
              mediaSource={MediaSource.Server}
            />
          ) : (
            <></>
          )
        }
        ListFooterComponent={<View style={{marginBottom: tabBarHeight}}></View>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
