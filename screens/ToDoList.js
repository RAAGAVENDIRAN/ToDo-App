import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import SearchToDo from "../components/SearchToDo";
import Listing from "../components/Listing";
import Header from "../components/Header";

import Bottom from "../components/Bottom";
import ListingPending from "../components/ListingPending";

const Tab = createMaterialTopTabNavigator();

let arr = [];

function ToDoList({ navigation, route }) {
  const [search, setSearch] = useState("");

  const [completedTodo, setCompletedTodo] = useState([]);
  const [pendingTodo, setPendingTodo] = useState([]);

  const { user } = route.params;
  const userId = user.userId;
  const username = user.username;

  //getdata from async storage

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(`@todo ${userId}`);
        const value = JSON.parse(jsonValue);

        let tempPendingTodo = [];
        let tempCompletedTodo = [];

        if (value.userId.completedTodo)
          tempCompletedTodo = value.userId.completedTodo;
        if (value.userId.pendingTodo)
          tempPendingTodo = value.userId.pendingTodo;

        setCompletedTodo(tempCompletedTodo);
        setPendingTodo(tempPendingTodo);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //store data to async storage

  const storeData = async (value, id) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@todo ${userId}`, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //CompletedToPending
  const compToPen = (id) => {
    const ComToPenAsync = async (id) => {
      let get = await AsyncStorage.getItem(`@todo ${userId}`);
      let takeData;
      let result = JSON.parse(get);
      console.log(result);
      let newData = result.userId.completedTodo.filter((item) => {
        if (item.id === id) {
          takeData = item;
          return;
        }
        return item;
      });
      takeData.completed = false;
      setCompletedTodo(newData);
      setPendingTodo([...pendingTodo, takeData]);
      storeData({
        userId: {
          completedTodo: newData,
          pendingTodo: [...pendingTodo, takeData],
        },
      });
    };
    ComToPenAsync(id);
  };

  //PendingToComplete
  const PentoCom = (id) => {
    const PenToComAsync = async (id) => {
      let get = await AsyncStorage.getItem(`@todo ${userId}`);
      let takeData;
      let result = JSON.parse(get);
      console.log(result);
      let newData = result.userId.pendingTodo.filter((item) => {
        if (item.id === id) {
          takeData = item;
          return;
        }
        return item;
      });
      takeData.completed = true;
      setPendingTodo(newData);
      setCompletedTodo([...completedTodo, takeData]);
      storeData({
        userId: {
          completedTodo: [...completedTodo, takeData],
          pendingTodo: newData,
        },
      });
    };
    PenToComAsync(id);
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

  const pressHandlerAsync = async (id, completed) => {
    if (completed === "yes") {
      let newtodo = completedTodo.filter((item) => {
        if (item.id !== id) return item;
      });
      setCompletedTodo(newtodo);
      storeData({
        userId: {
          completedTodo: newtodo,
          pendingTodo: pendingTodo,
        },
      });
    } else {
      let newtodo = pendingTodo.filter((item) => {
        if (item.id !== id) return item;
      });
      setPendingTodo(newtodo);
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: newtodo,
        },
      });
    }
  };

  //navigte to add function
  const navigated = () => {
    navigation.navigate("InputModel");
  };

  //to set the input
  useEffect(() => {
    if (route.params?.input) submitHandlerAsync(route.params?.input);
    if (route.params?.EditInput)
      EditHandlerAsync(
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
    const handleClearAsync = async () => {
      const result = await AsyncStorage.getItem(`@todo ${userId}`);
      let todo;
      if (result != null) {
        todo = JSON.parse(result);
      }
      if (arr.length > 0) {
        let bool = arr[0].completed;
        Alert.alert("OOPS!", "Your Todos will be deleted", [
          {
            text: "Confirm",
            onPress: () => {
              arr = [];
              if (bool === true) {
                setCompletedTodo([]);
                storeData({
                  userId: {
                    completedTodo: [],
                    pendingTodo: pendingTodo,
                  },
                });
              } else {
                setPendingTodo([]);
                storeData({
                  userId: {
                    completedTodo: completedTodo,
                    pendingTodo: [],
                  },
                });
              }
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
    handleClearAsync();
  };

  //submitting

  const submitHandlerAsync = async (todoInputValue) => {
    if (todoInputValue.trim() === "") return;
    if (todoInputValue.length > 3) {
      let newtodos = [
        {
          userid: userId,
          id: Math.random(),
          title: todoInputValue.trim(),
          completed: false,
          date: new Date(Date.now()).toString().slice(0, 24),
        },
        ...pendingTodo,
      ];

      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: newtodos,
        },
      });
      setPendingTodo(newtodos);
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood" },
      ]);
    }
  };

  //Editing

  const EditHandlerAsync = async (text, id, completed) => {
    if (completed === "yes") {
      let editing = completedTodo.filter((item) => {
        if (item.id === id) {
          item.title = text;
        }
        return item;
      });
      setCompletedTodo(editing);
      storeData({
        userId: {
          completedTodo: editing,
          pendingTodo: pendingTodo,
        },
      });
    } else {
      let editing = pendingTodo.filter((item) => {
        if (item.id === id) {
          item.title = text;
        }
        return item;
      });
      setPendingTodo(editing);
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: editing,
        },
      });
    }
  };

  //search Filter Function
  const searchFilterFunction = (array, newtext) => {
    console.log(newtext);
    let bool = array[0].completed;
    if (newtext) {
      let newData = array.filter((item) => {
        let itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        let textData = newtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (bool) {
        setCompletedTodo(newData);
      } else {
        setPendingTodo(newData);
      }
    } else {
      if (bool) {
        setCompletedTodo(array);
      } else {
        setPendingTodo(array);
      }
    }
  };

  //navigate to EditModel
  const navigationToModel = (id, completed) => {
    navigation.navigate({
      name: "EditModel",
      params: { id: id, completed: completed },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header handleClearTodos={handleClearTodos} username={username} />
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
              Searching("");
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
                pressHandlerAsync={(id, completed) =>
                  pressHandler(id, completed)
                }
                navigationFunction={(id, completed) =>
                  navigationToModel(id, completed)
                }
              />
            );
          }}
        />
        <Tab.Screen
          listeners={({ navigation, route }) => ({
            blur: (e) => {
              Searching("");
            },
          })}
          name="DisplayListPending"
          children={() => {
            return (
              <ListingPending
                filteredData={pendingTodo}
                PentoCom={(id) => PentoCom(id)}
                pressHandlerAsync={(id, completed) =>
                  pressHandler(id, completed)
                }
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
