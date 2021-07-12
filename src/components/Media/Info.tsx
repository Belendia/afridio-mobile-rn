import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { View, Text } from "../Themed";
import { colors } from "../../constants/Colors";
import { RootStoreType } from "../../redux/rootReducer";
import { Author } from "./Author";
import { Chip } from "./Chip";

const Info = () => {
  const { media } = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.label}>Overview</Text>
        <Text style={styles.overviewText}>{media?.description}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Release Date</Text>
        <Text style={styles.value}>{media?.release_date}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Narrated By</Text>
      </View>
      <View>
        <Chip values={media?.narrators} style={{ marginVertical: 5 }} />
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>Authors</Text>
      </View>
      <View style={styles.authorsContainer}>
        {media?.authors.map((item, index) => (
          <Author {...item} key={index} />
        ))}
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  overview: {
    marginBottom: 15,
  },
  overviewText: {
    color: colors.red300,
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 22,
  },
  label: {
    color: colors.red300,
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: colors.red300,
    fontSize: 14,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderBottomColor: colors.black600,
    borderBottomWidth: 1,
  },
  authorsContainer: {
    marginTop: 20,
  },
});
