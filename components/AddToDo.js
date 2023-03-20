import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AppButton from "./AppButton";

function AddToDo({ todoInputValue, changeHandler }) {
  const inputRef = useRef(); //auto focus using Ref

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        onChangeText={changeHandler}
        style={styles.Inputdesign}
        placeholder={"Why Each To-Do on Your List Is Important. ..."}
        value={todoInputValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  Inputdesign: {
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    fontSize: 20,
    backgroundColor: "#579BB1",
    height: 40,
  },
});

export default AddToDo;
