import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

import { DateTimePicker } from "@react-native-community/datetimepicker";

import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import { Calendar } from "react-native-feather";

export default function InputModel({ navigation, route }) {
  const [todoInput, setTodoInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "android");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const istyle = {
    backgroundColor: "#C6CFFF",
  };

  const mstyle = {
    backgroundColor: "#C6CFFF",
  };

  const getInput = (val) => {
    setTodoInput(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.top}>
          <Text style={styles.textDesign}>Todos</Text>
          <AntDesign name="addfolder" size={30} color={colors.dark}></AntDesign>
        </View>
        <View style={styles.Wrapper}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Add Todo"
            onChangeText={getInput}
            value={todoInput}
            autoFocus={true}
          />
          <AntDesign name="calendar" size={30} />
          <AntDesign name="clockcircle" size={30} />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.buttonDesign, istyle]}
            onPress={() => {
              navigation.goBack();
            }}
          >
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
  Wrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
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
    width: 250,
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
