//Default Imports
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

//Components IMports
import colors from "../config/colors";
import AppText from "./AppText";

function AppButton({ title, onPress, color }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    width: "40%",
    marginVertical: 10,
  },

  text: {
    color: colors.black,
    fontSize: 18,
    textTransform: "uppercase",
    fontFamily: "Poppins_700Bold",
  },
});

export default AppButton;
