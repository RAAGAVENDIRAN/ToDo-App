import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Alert } from "react-native";

import axios from "axios";
import SearchToDo from "../components/SearchToDo";
import Listing from "../components/Listing";
import Header from "../components/Header";

import Bottom from "../components/Bottom";
import ListingPending from "../components/ListingPending";

const Tab = createMaterialTopTabNavigator();

let arr = [];
function ToDoList({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [pendingTodo, setPendingTodo] = useState([]);

  //using useEffect to fetch Data from jsonHolder Api.
  useEffect(() => {
    async function getToDo() {
      const result = await axios("https://jsonplaceholder.typicode.com/todos");

      result.data.slice(0, 29).filter((item) => {
        item.date = new Date(Date.now() * Math.random() * 0.99)
          .toString()
          .slice(0, 24);
        if (item.completed) completedTodo.push(item);
        else pendingTodo.push(item);
      });

      setCompletedTodo([...completedTodo]);
      setPendingTodo([...pendingTodo]);
    }

    getToDo();
  }, []);

  //CompletedToPending
  const compToPen = (id) => {
    let takeData;
    let newcom = completedTodo.filter((item) => {
      if (item.id === id) {
        takeData = item;
        return;
      }
      return item;
    });
    setCompletedTodo(newcom);
    takeData.completed = false;
    setPendingTodo([takeData, ...pendingTodo]);
  };

  //PendingToComplete
  const PentoCom = (id) => {
    let takeData;
    let newcom = pendingTodo.filter((item) => {
      if (item.id === id) {
        takeData = item;
        return;
      }
      return item;
    });
    setPendingTodo(newcom);
    takeData.completed = true;
    setCompletedTodo([takeData, ...completedTodo]);
  };

  // Searching function

  const Searching = (newtext) => {
    setSearch(newtext);
    searchFilterFunction(arr, newtext);
  };

  // setting the current tab array
  const setTab = (tab) => {
    if (tab == 1) {
      arr = completedTodo;
    } else {
      arr = pendingTodo;
    }
  };

  //delete todo
  const pressHandler = (id, completed) => {
    if (completed === "yes") {
      let newtodos = completedTodo.filter((todos) => {
        if (todos.id != id) return todos;
      });
      setCompletedTodo(newtodos);
    } else {
      let newtodos = pendingTodo.filter((todos) => {
        if (todos.id != id) return todos;
      });
      setPendingTodo(newtodos);
    }
  };

  //navigte to add function
  const navigated = () => {
    navigation.navigate("InputModel");
  };

  //to set the input
  useEffect(() => {
    console.log("check time");
    if (route.params?.input) submitHandler(route.params?.input);
    if (route.params?.EditInput)
      EditHandler(
        route.params?.EditInput,
        route.params?.Editid,
        route.params?.completed
      );
  }, [
    route.params?.input,
    route.params?.EditInput,
    route.params?.Editid,
    route.params?.completed,
  ]);

  //clearToDo
  const handleClearTodos = () => {
    if (arr.length > 0) {
      let bool = arr[0].completed;
      Alert.alert("OOPS!", "Your Todos will be deleted", [
        {
          text: "Confirm",
          onPress: () => {
            arr = [];
            if (bool === true) setCompletedTodo([]);
            else setPendingTodo([]);
          },
        },
        {
          text: "Cancel",

          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("OOPS!", "EMPTY", [
        {
          text: "Confirm",
        },
        {
          text: "Cancel",

          style: "cancel",
        },
      ]);
    }
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
        ...pendingTodo,
      ];

      setPendingTodo(newtodos);
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood" },
      ]);
    }
  };

  // Editing
  const EditHandler = (text, id, completed) => {
    if (completed === "yes") {
      // console.log("yes");
      const editedData = completedTodo.map((item) => {
        if (item.id == id) {
          item.title = text;
          return item;
        }
        return item;
      });

      setCompletedTodo(editedData);
    } else {
      const editedData = pendingTodo.map((item) => {
        // console.log("no");
        if (item.id == id) {
          item.title = text;
          return item;
        }
        return item;
      });

      setPendingTodo(editedData);
    }
  };

  //search Filter Function
  const searchFilterFunction = (array, newtext) => {
    let bool = array[0].completed;
    if (newtext) {
      const newData = array.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = newtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (bool) {
        setCompletedTodo(newData);
      } else {
        setPendingTodo(newData);
      }
    } else {
      if (bool) {
        setCompletedTodo(completedTodo);
      } else {
        setPendingTodo(pendingTodo);
      }
    }
  };

  //navigate to EditModel
  const navigationToModel = (id, completed) => {
    console.log(id, completed);
    navigation.navigate({
      name: "EditModel",
      params: { id: id, completed: completed },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header handleClearTodos={handleClearTodos} />
      <SearchToDo
        value={search}
        placeholder={"Search Here"}
        onChangeText={Searching}
      />
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,

          tabBarStyle: { backgroundColor: "#F3F8FF" },
        }}
      >
        <Tab.Screen
          listeners={({ navigation, route }) => ({
            focus: (e) => {
              setTab(1);
            },
            blur: (e) => {
              setTab(0);
            },
          })}
          name="DisplayList"
          children={() => {
            return (
              <Listing
                compToPen={(id) => {
                  compToPen(id);
                }}
                filteredData={completedTodo}
                pressHandler={(id, completed) => pressHandler(id, completed)}
                navigationFunction={(id, completed) =>
                  navigationToModel(id, completed)
                }
              />
            );
          }}
        />
        <Tab.Screen
          name="DisplayListPending"
          children={() => {
            return (
              <ListingPending
                filteredData={pendingTodo}
                PentoCom={(id) => PentoCom(id)}
                pressHandler={(id, completed) => pressHandler(id, completed)}
                navigationFunction={(id, completed) =>
                  navigationToModel(id, completed)
                }
              />
            );
          }}
        />
      </Tab.Navigator>

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
