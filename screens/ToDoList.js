import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
  Alert,
} from "react-native";

import axios from "axios";
import AddToDo from "../components/AddToDo";
import DisplayList from "../components/DisplayList";
import AppButton from "../components/AppButton";
import Header from "../components/Header";

import Bottom from "../components/Bottom";

function ToDoList({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  //const [todoInputValue, setTodoInputValue] = useState("");

  // const changeHandler = (val) => {
  //   setTodoInputValue(val);
  // };

  //using useEffect to fetch Data from jsonHolder Api.
  useEffect(() => {
    async function getToDo() {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");
      setTodos([...result.data].slice(0, 3));
    }

    getToDo();
  }, []);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  const pressHandler = (id) => {
    let newtodos = todos.filter((todos) => {
      if (todos.id != id) return todos;
    });

    setTodos(newtodos);
  };

  //navigte
  const navigated = () => {
    navigation.navigate("InputModel");
    console.log("ndjksnd");
  };

  useEffect(() => {
    console.log("check time");
    if (route.params?.input) submitHandler(route.params?.input);
  }, [route.params?.input]);

  //clearToDo
  const handleClearTodos = () => {
    Alert.alert("OOPS!", "Your Todos will be deleted", [
      {
        text: "Confirm",
        onPress: () => {
          setTodos([]);
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);

    // console.log(todos);
  };

  //submitting
  const submitHandler = (todoInputValue) => {
    if (todoInputValue.trim() === "") return;
    if (todoInputValue.length > 3) {
      // console.log(todos.length);
      let newtodos = [
        {
          id: Math.random().toString(),
          title: todoInputValue.trim(),
          completed: false,
        },
        ...todos,
      ];
      // console.log("new");
      setTodos([...newtodos]);
      // console.log(newtodos);
      // setTodoInputValue("");

      // setTodos((prevTodos) => {

      //   return [
      //     { title: text, id: Math.random().toString(), completed: false },
      //     ...prevTodos,
      //   ];
      // });
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood" },
      ]);
    }
  };

  //Editing
  const handleEdit = () => {
    alert("Edit Triggerd");
  };

  return (
    <View style={styles.container}>
      <Header handleClearTodos={handleClearTodos} />
      {/* <AddToDo todoInputValue={todoInputValue} changeHandler={changeHandler} /> */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <DisplayList
              todos={todos}
              item={item}
              pressHandler={pressHandler}
            />
          </View>
        )}
      />
      <View style={styles.bottomView}>
        {/* <Bottom
          submitHandler={() => {
            submitHandler(todoInputValue);
          }}
        /> */}

        <Bottom navigated={navigated} />
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
