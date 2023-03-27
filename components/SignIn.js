import React from "react";

import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TextInput style={styles.inputText} />
        <TextInput style={styles.inputText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputText: {
    borderWidth: 1,
    width: "80%",
    height: 50,
    borderRadius: 25,
    margin: 20,
  },

  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width - 50,
    height: 700,
    backgroundColor: "red",
  },
});
