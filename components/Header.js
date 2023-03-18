import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.DesignText}>ToDo List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
  },
  DesignText: {
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
export default Header;
