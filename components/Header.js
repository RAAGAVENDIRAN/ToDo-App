import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native";

function Header({ handleClearTodos }) {
  return (
    <View style={styles.container}>
      <Text style={styles.DesignText}>Todos</Text>

      <MaterialIcons
        name="delete"
        style={styles.icon}
        size={30}
        color="black"
        onPress={handleClearTodos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: 60,
    padding: 10,
    backgroundColor: "#C6CFFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DesignText: {
    fontSize: 30,
    fontWeight: "bold",
    width: "40%",
    color: "black",
  },
});
export default Header;
