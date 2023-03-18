import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";

import axios from "axios";
import AddToDo from "../components/AddToDo";
import DisplayList from "../components/DisplayList";
import AppButton from "../components/AppButton";

import Header from "../components/Header";
import Bottom from "../components/Bottom";

function ToDoList() {
  const [toDos, setTodos] = useState([]);

  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  //using useEffect to fetch Data from jsonHolder Api.
  useEffect(() => {
    async function getToDo() {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");
      setTodos([...result.data].slice(10, 30));
    }

    getToDo();
  }, []);

  const pressHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { title: text, id: Math.random().toString(), completed: false },
          ...prevTodos,
        ];
      });
    } else {
      Alert.alert("OOPS!", "ToDos must be over 3 chars long", [
        { text: "Understood" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <AddToDo text={text} changeHandler={changeHandler} />
      <FlatList
        data={toDos}
        renderItem={({ item }) => (
          <View>
            <DisplayList item={item} pressHandler={pressHandler} />
          </View>
        )}
      />
      <View style={styles.bottomView}>
        <Bottom
          submitHandler={() => {
            submitHandler(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344fa1",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
});
export default ToDoList;
