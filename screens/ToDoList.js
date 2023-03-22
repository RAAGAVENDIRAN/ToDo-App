import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
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
  useEffect(() => {
    async function getToDo() {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");

      let newtodos = result.data.filter((item) => {
        item.date = new Date(Date.now() * Math.random() * 0.99)
          .toString()
          .slice(0, 24);
        return item;
      });

      setTodos(newtodos.slice(0, 39));
      setFilteredData(newtodos.slice(0, 39));
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
  };

  //to set the input
  useEffect(() => {
    console.log("check time");
    if (route.params?.input) submitHandler(route.params?.input);
    if (route.params?.EditInput && route.params?.Editid)
      EditHandler(route.params?.EditInput, route.params?.Editid);
  }, [route.params?.input, route.params?.EditInput, route.params?.Editid]);

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
          date: new Date(Date.now()).toString().slice(0, 24),
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

  // Editing
  const EditHandler = (text, id) => {
    const editedData = filteredData.map((item) => {
      if (item.id == id) {
        item.title = text;
        return item;
      }
      return item;
    });
    setFilteredData(editedData);
    setTodos(editedData);
  };

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

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DisplayList
            data={filteredData}
            item={item}
            navigationTo={() => {
              navigation.navigate({
                name: "EditModel",
                params: { id: item.id },
                merge: true,
              });
            }}
            pressHandler={pressHandler}
          />
        )}
      />
      <Bottom navigated={navigated} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C6CFFF",
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
