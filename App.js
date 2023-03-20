import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import ToDoList from "./screens/ToDoList";
import InputModel from "./components/InputModal";

export default function App() {
  return (
    <View style={styles.container}>
      <InputModel />
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
