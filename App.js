import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import ToDoList from "./screens/ToDoList";
import InputModel from "./components/InputModel";
import AddToDo from "./components/SearchToDo";
import Navigator from "./screens/Navigator";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
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
