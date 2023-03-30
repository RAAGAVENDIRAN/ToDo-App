import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AppText from "./AppText";

function Header({ handleClearTodos, username }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.DesignText}>Hello {username}👋</AppText>
      {/* <AntDesign
        name="profile"
        size={30}
        onPress={() => {
          navigation.navigate({
            name: "Profile",
            params: { username: username, comLen: comLen, penLen: penLen },
          });
        }}
      /> */}

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
    height: 80,
    padding: 10,
    backgroundColor: "#C6CFFF",
    // backgroundColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DesignText: {
    fontSize: 25,

    width: "90%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});
export default Header;
