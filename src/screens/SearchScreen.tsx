import React, { useState } from "react";
import { StyleSheet, Platform, TextInput, FlatList } from "react-native";
import { MediaListCard } from "../components";

import categories from "../../assets/data/categories";
import { View } from "../components/Themed";
import { colors } from "../constants/Colors";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextInput = (text: string) => {
    setQuery(text);

    setTimeout(() => {
      if (query.length) {
        // this.props.actions.retrieveMoviesSearchResults(this.state.query, 1)
        // .then(() => {
        // 	const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
        // 	const dataSource = ds.cloneWithRows(this.props.searchResults.results);
        // 	this.setState({
        // 		dataSource,
        // 		isLoading: false
        // 	});
        // });
      }
    }, 500);
  };

  const retriveNextPage = () => {};

  const renderFlatList = () => {
    let flatList;
    if (query) {
      flatList = (
        <FlatList
          data={categories.items[0].movies}
          renderItem={({ item }) => <MediaListCard movie={item} />}
          onEndReached={(type) => retriveNextPage()}
          onEndReachedThreshold={1200}
        />
      );
    } else {
      flatList = <View />;
    }

    return flatList;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <View style={styles.searchboxBorder}>
          <TextInput
            style={styles.textInput}
            autoFocus
            returnKeyType={"search"}
            value={query}
            onChangeText={(text) => handleTextInput(text)}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {!isLoading && renderFlatList()}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
  },
  textInput: {
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        height: 35,
      },
      android: {
        height: 48,
      },
    }),
  },
  searchboxBorder: {
    borderRadius: 3,
    backgroundColor: "white",
    paddingHorizontal: 3,
  },
  searchbox: {
    backgroundColor: colors.black600,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
});
