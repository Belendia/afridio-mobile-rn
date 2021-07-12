import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { View, Text } from "./Themed";
import { SimpleMediaCard } from "./Cards/SimpleMediaCard";
import { colors } from "../constants/Colors";
import { Media } from "../../types";

type HomeCategoryProps = {
  id: string;
  title: string;
  medias: Media[];
};

const HomeCategory = ({ id, title, medias }: HomeCategoryProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.listHeading}>
        <Text style={styles.listHeadingLeft}>{title}</Text>
        <TouchableOpacity>
          <Text
            style={styles.listHeadingRight}
            onPress={() => {
              navigation.navigate("Home", {
                screen: "MediaListScreen",
                params: { slug: id },
              });
            }}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={medias}
        renderItem={({ item }) => <SimpleMediaCard key={item.slug} {...item} />}
        keyExtractor={(item) => item.slug}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 170,
    resizeMode: "cover",
    borderRadius: 5,
    margin: 5,
  },
  listHeading: {
    paddingHorizontal: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  listHeadingLeft: {
    color: colors.red300,
    fontWeight: "bold",
    fontSize: 18,
  },
  listHeadingRight: {
    color: colors.red300,
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
});
