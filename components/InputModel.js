import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

export default function InputModel({ navigation, route }) {
  const [todoInput, setTodoInput] = useState("");
  const istyle = {
    backgroundColor: "#344fa1",
  };

  const mstyle = {
    backgroundColor: "white",
  };

  const getInput = (val) => {
    setTodoInput(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.top}>
          <Text style={styles.textDesign}>Todos</Text>
          <AntDesign name="edit" size={30} color={colors.light}></AntDesign>
        </View>

        <TextInput
          style={styles.inputStyle}
          placeholder="Add Todo"
          onChangeText={getInput}
          value={todoInput}
        ></TextInput>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.buttonDesign, istyle]}>
            <Text style={styles.closeText}> X </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonDesign, mstyle]}
            onPress={() => {
              // route.params.setTodo(todoInput);
              navigation.navigate({
                name: "TodoList",
                params: { input: todoInput },
                merge: true,
              });
            }}
          >
            <Text style={styles.crctText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    height: 320,
    width: 350,
    backgroundColor: "#031956",
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonDesign: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    width: "15%",
    marginVertical: 10,
    marginBottom: 40,

    marginHorizontal: 40,
  },
  buttonGroup: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#344fa1",
  },
  inputStyle: {
    width: 300,
    height: 50,
    backgroundColor: colors.white,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    color: colors.black,
    letterSpacing: 1,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 30,

    color: colors.white,
  },

  textDesign: {
    color: "white",
    fontSize: 30,
  },

  crctText: {
    fontSize: 30,

    color: "#344fa1",
  },
});
