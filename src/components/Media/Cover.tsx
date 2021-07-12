import React, { memo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import { Image as ImageType } from "../../../types";
import { colors } from "../../constants/Colors";
import { Size } from "../../constants/Options";
import { getCover } from "../../helpers/Utils";

type CoverProps = {
  images: ImageType[];
  size?: Size | undefined;
};

const Cover = memo<CoverProps>(
  ({ images, size }: CoverProps) => {
    return (
      <Image
        source={getCover(images)}
        style={[
          styles.cardImage,
          size === Size.Medium
            ? { width: 100, height: 136 }
            : size === Size.Small
            ? { width: 40, height: 54 }
            : {},
        ]}
        PlaceholderContent={<ActivityIndicator color={colors.red300} />}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.images?.length !== nextProps.images?.length) {
      return false;
    }
    return true;
  }
);

export { Cover };

const styles = StyleSheet.create({
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
});
