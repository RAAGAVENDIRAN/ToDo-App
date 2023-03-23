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

export default function EditModel({ navigation, route }) {
  const [editTodo, setEditTodo] = useState("");

  const { id, completed } = route.params;

  const istyle = {
    backgroundColor: "#C6CFFF",
  };

  const mstyle = {
    backgroundColor: "#C6CFFF",
  };

  const Edit = (val) => {
    setEditTodo(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.top}>
          <Text style={styles.textDesign}>Edit Todo</Text>
          <AntDesign name="edit" size={30} color={colors.dark}></AntDesign>
        </View>

        <TextInput
          style={styles.inputStyle}
          placeholder="Edit Todo"
          onChangeText={Edit}
          value={editTodo}
        ></TextInput>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.buttonDesign, istyle]}
            onPress={() => {
              navigation.navigate({
                name: "TodoList",
              });
            }}
          >
            <Text style={styles.closeText}> X </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonDesign, mstyle]}
            onPress={() => {
              // route.params.setTodo(todoInput);
              // console.log(completed);
              navigation.navigate({
                name: "TodoList",
                params: {
                  EditInput: editTodo,
                  Editid: id,
                  completed: completed,
                },
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
    backgroundColor: "#F3F8FF",
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonDesign: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    width: "20%",
    marginVertical: 10,
    marginHorizontal: 40,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 35,
    shadowOpacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C6CFFF",
  },
  inputStyle: {
    width: 300,
    height: 50,
    backgroundColor: "#C6CFFF",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    letterSpacing: 1,
    borderWidth: 1,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 30,
    fontWeight: "bold",
  },

  textDesign: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },

  crctText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
});
