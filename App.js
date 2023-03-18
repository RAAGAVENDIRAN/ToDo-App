import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import ToDoList from "./screens/ToDoList";

export default function App() {
  return (
    <View style={styles.container}>
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
