import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

function SearchToDo({ onChangeText, placeholder, value }) {
  // const inputRef = useRef(); //auto focus using Ref

  // useEffect(() => {
  //   if (fontsLoaded) inputRef.current.focus();
  // }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.Inputdesign}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  Inputdesign: {
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 35,
    fontSize: 15,
    backgroundColor: "white",
    height: 50,
    fontFamily: "Poppins_300Light",
  },
});

export default SearchToDo;
