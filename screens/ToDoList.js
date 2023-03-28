import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import SearchToDo from "../components/SearchToDo";

import Bottom from "../components/Bottom";
import Listing from "../components/Listing";
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
        arr = tempCompletedTodo;
        // setcntCom(tempCompletedTodo.length);
        setPendingTodo(tempPendingTodo);
        // setcntPen(tempPendingTodo.length);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //store data to async storage

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      let value2 = await AsyncStorage.setItem(`@todo ${userId}`, jsonValue);
    } catch (e) {
      // saving error
      console.log("Error");
    }
  };

  //CompletedToPending

  const ComToPenAsync = async (id) => {
    let newData = completedTodo.filter((item) => {
      if (item.id === id) {
        takeData = item;
        return;
      }
      return item;
    });

    takeData.completed = false;
    setCompletedTodo([...newData]);
    setPendingTodo([...pendingTodo, takeData]);
    storeData({
      userId: {
        completedTodo: newData,
        pendingTodo: [...pendingTodo, takeData],
      },
    });
  };

  //PendingToComplete

  const PenToComAsync = async (id) => {
    let newData = pendingTodo.filter((item) => {
      if (item.id === id) {
        takeData = item;
        return;
      }
      return item;
    });

    takeData.completed = true;
    setPendingTodo([...newData]);
    setCompletedTodo([...completedTodo, takeData]);
    storeData({
      userId: {
        completedTodo: [...completedTodo, takeData],
        pendingTodo: newData,
      },
    });
  };

  // Searching function

  const Searching = (newtext) => {
    setSearch(newtext);
    if (arr.length) searchFilterFunction(arr, newtext);
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
    if (route.params?.input && route.params?.times && route.params?.curDate) {
      submitHandlerAsync(
        route.params?.input,
        route.params?.times,
        route.params?.curDate
      );
    }
    if (route.params?.EditInput) {
      EditHandlerAsync(
        route.params?.EditInput,
        route.params?.Editid,
        route.params?.completed
      );
    }
  }, [
    route.params?.input,
    route.params?.EditInput,
    route.params?.Editid,
    route.params?.completed,
    route.params?.curDate,
    route.params?.times,
  ]);

  //clearToDo

  const handleClearAsync = async () => {
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

  //submitting

  const submitHandlerAsync = async (todoInputValue, times, curDate) => {
    if (todoInputValue.trim() === "") return;
    if (todoInputValue.length > 3) {
      let newtodos = [
        {
          userid: userId,
          id: Math.random(),
          title: todoInputValue.trim(),
          completed: false,
          date: times,
          createDate: curDate,
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
    let bool = array[0].completed;
    // if (newtext) {
    let newData = array.filter((item) => {
      let itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      let textData = newtext.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    if (bool) {
      setCompletedTodo(newData);
      // setTab(0);
    } else {
      setPendingTodo(newData);
      // setTab(1);
    }
    // } else {
    //   if (bool) {
    //     setCompletedTodo(array);
    //   } else {
    //     setPendingTodo(array);
    //   }
    // }
  };

  //navigate to EditModel
  const navigationToModel = (id, completed, createDate) => {
    navigation.navigate({
      name: "EditModel",
      params: { id: id, completed: completed, curDate: createDate },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        // navigation={navigation}
        handleClearTodos={handleClearAsync}
        username={username}
        // comLen={completedTodo.length}
        // penLen={pendingTodo.length}
      />
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
              // setTab(0);
              if (search !== "") Searching("");
            },
          })}
          name="DisplayList"
          children={() => {
            return (
              <Listing
                ComToPenAsync={(id) => {
                  ComToPenAsync(id);
                }}
                filteredData={completedTodo}
                pressHandlerAsync={(id, completed) =>
                  pressHandlerAsync(id, completed)
                }
                navigationFunction={(id, completed, createDate) =>
                  navigationToModel(id, completed, createDate)
                }
              />
            );
          }}
        />
        <Tab.Screen
          listeners={({ navigation, route }) => ({
            focus: (e) => {
              setTab(0);
            },
            blur: (e) => {
              if (search !== "") Searching("");
            },
          })}
          name="DisplayListPending"
          children={() => {
            return (
              <ListingPending
                filteredData={pendingTodo}
                PenToComAsync={(id) => PenToComAsync(id)}
                pressHandlerAsync={(id, completed) =>
                  pressHandlerAsync(id, completed)
                }
                navigationFunction={(id, completed, createDate) =>
                  navigationToModel(id, completed, createDate)
                }
              />
            );
          }}
        />
      </Tab.Navigator>

      {search === "" ? <Bottom navigated={navigated} /> : null}
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
