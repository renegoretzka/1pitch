import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { color } from "../../styles/colors";
import { FONT_SIZE_TEXT, FONT_WEIGHT_BOLD } from "../../styles/variables";

const Divider = ({ text, style }) => {
  return (
    <View style={[styles.dividerWithText, style]}>
      <View style={styles.dividerWithTextLine}></View>
      {text ? (
        <>
          <Text style={styles.dividerWithTextContent}>{text}</Text>
          <View style={styles.dividerWithTextLine}></View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dividerWithText: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerWithTextLine: {
    flex: 1,
    height: 1,
    backgroundColor: color.divider,
  },
  dividerWithTextContent: {
    marginLeft: 15,
    marginRight: 15,
    color: color.lightWhite,
    fontSize: FONT_SIZE_TEXT,
    fontWeight: FONT_WEIGHT_BOLD,
  },
});

export default Divider;
