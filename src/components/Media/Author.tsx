import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

import { Author as AuthorType } from "../../../types";
import { colors } from "../../constants/Colors";
import { View, Text } from "../Themed";

const Author = memo(
  ({ name, slug, photo }: AuthorType) => {
    let cover = null;
    if (photo && photo?.length > 0) {
      cover = photo[0].file;
    }

    return (
      <View key={slug} style={styles.castContainer}>
        {cover ? (
          <Avatar
            rounded
            source={{
              uri: `${cover}`,
            }}
            size="large"
          />
        ) : (
          <Avatar
            rounded
            source={require("../../../assets/images/male-avatar.png")}
            size="large"
          />
        )}
        <View style={styles.characterContainer}>
          <Text style={styles.characterName}>{name}</Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.photo?.length !== nextProps.photo?.length ||
      prevProps.name !== nextProps.name ||
      prevProps.slug !== nextProps.slug
    ) {
      return false;
    }
    return true;
  }
);

export { Author };

const styles = StyleSheet.create({
  castContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  characterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
  },
  characterName: {
    color: colors.red300,
    flexDirection: "column",
    fontSize: 16,
    fontWeight: "500",
  },
});
