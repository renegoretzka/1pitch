import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { color } from "../../styles/colors";
import {
  FONT_WEIGHT_BOLD,
  SPACING_BETWEEN,
  SPACING_BETWEEN_SMALL,
} from "../../styles/variables";

const SubCategory = ({ text, style }) => (
  <View style={([styles.container], style)}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    marginTop: 25,
    marginBottom: SPACING_BETWEEN_SMALL,
    fontSize: 15,
    fontWeight: FONT_WEIGHT_BOLD,
    color: color.white,
  },
});

export default SubCategory;
