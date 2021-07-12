import React, {useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {FeaturedMediaCard} from '../components/Cards/FeaturedMediaCard';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {View} from '../components/Themed';
import HomeCategory from '../components/HomeCategory';
import {colors} from '../constants/Colors';
import {startToGetHomeScreenData} from '../redux/slices/homeSlice';
import {RootStoreType} from '../redux/rootReducer';
import {ProgressBar, Error} from '../components';
import {setTabBarHeight} from '../redux/slices';
import layout from '../constants/Layout';

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
    return <Error title={'Error'} message={error} onRetry={fetchData} />;
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
              data={featuredMedias[0].medias}
              renderItem={({item, index}) => (
                <FeaturedMediaCard key={item.slug} {...item} />
              )}
              style={{height: 248}}
              sliderWidth={layout.window.width}
              itemWidth={layout.window.width}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={5000}
            />
          ) : featuredMedias &&
            featuredMedias.length > 0 &&
            featuredMedias[0].medias &&
            featuredMedias[0].medias.length === 1 ? (
            <FeaturedMediaCard
              key={featuredMedias[0].medias[0].slug}
              {...featuredMedias[0].medias[0]}
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
