import React from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

function Bottom({ navigated }) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={navigated}>
      <Text style={styles.floatingText}>+</Text>
    </TouchableOpacity>
  );
}

export default Bottom;

const styles = StyleSheet.create({
  floatingText: {
    fontWeight: "bold",
    fontSize: 60,
  },
  touchableOpacity: {
    backgroundColor: "#E8D3FF",
    position: "absolute",
    borderWidth: 0.5,
    width: 70,
    height: 70,
    right: 30,
    bottom: 30,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
