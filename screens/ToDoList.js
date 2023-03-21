import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
} from "react-native";

import axios from "axios";
import SearchToDo from "../components/SearchToDo";
import DisplayList from "../components/DisplayList";
import AppButton from "../components/AppButton";
import Header from "../components/Header";

import Bottom from "../components/Bottom";

function ToDoList({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //using useEffect to fetch Data from jsonHolder Api.

  // useEffect(() => {
  //   const url = "https://jsonplaceholder.typicode.com/todos";

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       setTodos(json);
  //       setFilteredData(json.results);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    async function getToDo() {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");
      let newtodos = result.data;
      setTodos([...newtodos].slice(0, 30));
      setFilteredData([...newtodos].slice(0, 30));
    }

    getToDo();
  }, []);

  //delete todo
  const pressHandler = (id) => {
    let newtodos = todos.filter((todos) => {
      if (todos.id != id) return todos;
    });

    setTodos(newtodos);
    setFilteredData(newtodos);
  };

  //navigte
  const navigated = () => {
    navigation.navigate("InputModel");
    console.log("ndjksnd");
  };

  //to set the input
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
          setFilteredData([]);
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };

  //submitting
  const submitHandler = (todoInputValue) => {
    if (todoInputValue.trim() === "") return;
    if (todoInputValue.length > 3) {
      let newtodos = [
        {
          id: Math.random().toString(),
          title: todoInputValue.trim(),
          completed: false,
        },
        ...todos,
      ];

      setTodos(newtodos);
      setFilteredData(newtodos);
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood" },
      ]);
    }
  };

  // //Editing
  // const handleEdit = () => {
  //   alert("Edit Triggerd");
  // };

  //search Filter Function
  const searchFilterFunction = (newtext) => {
    if (newtext) {
      const newData = todos.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = newtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(todos);
    }
  };

  const Searching = (newtext) => {
    setSearch(newtext);
    searchFilterFunction(newtext);
  };
  return (
    <View style={styles.container}>
      <Header handleClearTodos={handleClearTodos} />
      <SearchToDo
        value={search}
        placeholder={"Search Here"}
        onChangeText={Searching}
      />
      {/* <AddToDo todoInputValue={todoInputValue} changeHandler={changeHandler} /> */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <DisplayList
              data={filteredData}
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

  itemStyle: {
    padding: 10,
  },
});
export default ToDoList;
