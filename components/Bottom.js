import React from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

function Bottom({ submitHandler }) {
  return (
    <TouchableOpacity style={styles.buttonDesign} onPress={submitHandler}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

export default Bottom;

const styles = StyleSheet.create({
  buttonDesign: {
    backgroundColor: "#EA8FEA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    padding: 10,
    width: "15%",
    marginVertical: 10,
    marginBottom: 40,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.light,
  },
});
