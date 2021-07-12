import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

import { View } from "../components/Themed";
import { ProgressBar, MediaListCard, Error } from "../components";
import { colors } from "../constants/Colors";
import { RootStoreType } from "../redux/rootReducer";
import {
  startToGetMediaListByFormat,
  clearMedia,
} from "../redux/slices/mediaSlice";

const { height } = Dimensions.get("window");

const MediaListScreen = () => {
  const dispatch = useDispatch();
  const [isRefreshingNextPage, setIsRefresingNextPage] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const { mediaListByFormat, mediaListByFormatError, next, loadingList } =
    useSelector((state: RootStoreType) => ({
      mediaListByFormat: state.mediaReducer.mediaListByFormat,
      mediaListByFormatError: state.mediaReducer.mediaListByFormatError,
      next: state.mediaReducer.next,
      loadingList: state.mediaReducer.loadingList,
    }));

  const fetchNextPage = useCallback(() => {
    setIsRefresingNextPage(true);
    if (next !== null) {
      dispatch(
        startToGetMediaListByFormat({ slug: route.params?.slug, page: next })
      );
    } else {
      setIsRefresingNextPage(false);
    }
  }, [dispatch, startToGetMediaListByFormat, next]);

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(
        startToGetMediaListByFormat({ slug: route.params?.slug, page: null })
      );
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug, dispatch, startToGetMediaListByFormat]);

  useEffect(() => {
    fetchData();
    // return () => {};
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        dispatch(clearMedia());
      }),
    [navigation]
  );

  if (mediaListByFormatError && typeof mediaListByFormatError === "string") {
    return (
      <Error
        title={"Error"}
        message={mediaListByFormatError}
        onRetry={fetchData}
      />
    );
  }

  return (
    <View style={{ flex: 1, height: height }}>
      <FlatList
        style={styles.container}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        data={mediaListByFormat}
        renderItem={({ item }) => (
          <MediaListCard key={item.slug} media={item} />
        )}
        keyExtractor={(item) => item.slug}
        ListFooterComponent={() =>
          isRefreshingNextPage ? (
            <View style={{ height: 50 }}>
              <ProgressBar />
            </View>
          ) : (
            <></>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={loadingList}
            // onRefresh={fetchData}
            colors={[colors.white]}
            tintColor={colors.red400}
            title="loading..."
            titleColor={colors.red400}
            progressBackgroundColor={colors.red400}
          />
        }
      />
    </View>
  );
};

export default MediaListScreen;

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
  progressBar: {
    backgroundColor: colors.black800,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
