import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import AppText from "./AppText";

function Header({ handleClearTodos, username, comLen, penLen, navigation }) {
  return (
    <View style={styles.Headercontainer}>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5
          name="user"
          size={30}
          onPress={() => {
            navigation.navigate({
              name: "Profile",
              params: { user: username, completed: comLen, pending: penLen },
              merge: true,
            });
          }}
        />
        <AppText style={styles.DesignText}> {username}👋</AppText>
      </View>

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
  Headercontainer: {
    paddingTop: 20,
    height: 80,
    padding: 10,
    backgroundColor: "#C6CFFF",

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
