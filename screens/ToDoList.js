import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, Alert } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import SearchToDo from "../components/SearchToDo";
import AppText from "../components/AppText";
import Bottom from "../components/Bottom";
import Listing from "../components/Listing";
import ListingPending from "../components/ListingPending";

const Tab = createMaterialTopTabNavigator();

let arr = [];

function ToDoList({ navigation, route }) {
  const [search, setSearch] = useState("");

  const [completedTodo, setCompletedTodo] = useState([]);
  const [pendingTodo, setPendingTodo] = useState([]);
  const [trashTodo, setTrashTodo] = useState([]);
  const [focus, setFocus] = useState(true);

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
        let tempTrashTodo = [];

        if (value.userId.completedTodo)
          tempCompletedTodo = value.userId.completedTodo;
        if (value.userId.pendingTodo)
          tempPendingTodo = value.userId.pendingTodo;
        if (value.userId.trashTodo) tempTrashTodo = value.userId.trashTodo;

        setCompletedTodo(tempCompletedTodo);
        arr = tempCompletedTodo;
        // setcntCom(tempCompletedTodo.length);
        setPendingTodo(tempPendingTodo);
        // setcntPen(tempPendingTodo.length);
        setTrashTodo(tempTrashTodo);
      } catch (e) {
        // error reading value
      }
    };
    if (focus) getData();
  }, [focus]);

  // Focus Listener
  useEffect(() => {
    navigation.addListener("focus", () => {
      setFocus(true);
    });
  }, [navigation]);

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

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

  //removeFromTrash

  const removeFromTrashAsync = (id) => {
    let moveFromTrash;
    let newtodo = trashTodo.filter((item) => {
      if (item.id === id) {
        moveFromTrash = item;
        return;
      }
      return item;
    });

    setCompletedTodo(newtodo);
    storeData({
      userId: {
        completedTodo: newtodo,
        pendingTodo: pendingTodo,
      },
    });
  };

  //move to trash

  const MoveToTrashAsync = async (id, completed) => {
    console.log("========");
    let moveToTrash;
    if (completed === "yes") {
      let newtodo = completedTodo.filter((item) => {
        if (item.id === id) {
          moveToTrash = item;
          return;
        }
        return item;
      });
      console.log("here");
      setCompletedTodo(newtodo);
      setTrashTodo([...trashTodo, moveToTrash]);
      storeData({
        userId: {
          completedTodo: newtodo,
          pendingTodo: pendingTodo,
          trashTodo: [...trashTodo, moveToTrash],
        },
      });
    } else {
      let newtodo = pendingTodo.filter((item) => {
        if (item.id === id) {
          moveToTrash = item;
          return;
        }
        return item;
      });
      setPendingTodo(newtodo);
      setTrashTodo([...trashTodo, moveToTrash]);
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: newtodo,
          trashTodo: [...trashTodo, moveToTrash],
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
    if (route.params?.EditInput || route.params?.endDate) {
      console.log("Here");
      EditHandlerAsync(
        route.params?.EditInput,
        route.params?.Editid,
        route.params?.completed,
        route.params?.endDate
      );
    }
  }, [
    route.params?.input,
    route.params?.EditInput,
    route.params?.Editid,
    route.params?.completed,
    route.params?.curDate,
    route.params?.times,
    route.params?.endDate,
  ]);

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
          trashTodo: trashTodo,
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

  const EditHandlerAsync = async (text, id, completed, endDate) => {
    if (completed === "yes") {
      let editing = completedTodo.filter((item) => {
        if (item.id === id) {
          item.title = text;
          item.date = endDate;
        }
        return item;
      });

      setCompletedTodo(editing);
      storeData({
        userId: {
          completedTodo: editing,
          pendingTodo: pendingTodo,
          trashTodo: trashTodo,
        },
      });
    } else {
      let editing = pendingTodo.filter((item) => {
        if (item.id === id) {
          item.title = text;
          item.date = endDate;
        }
        return item;
      });
      setPendingTodo(editing);
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: editing,
          trashTodo: trashTodo,
        },
      });
    }
  };

  //search Filter Function
  const searchFilterFunction = (array, newtext) => {
    let bool = array[0].completed;

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
  };

  //navigate to EditModel
  const navigationToModel = (id, completed, createDate, date, title) => {
    navigation.navigate({
      name: "EditModel",
      params: {
        id: id,
        completed: completed,
        curDate: createDate,
        finishDate: date,
        title: title,
      },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Headercontainer}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5
            name="user"
            size={30}
            onPress={() => {
              navigation.navigate({
                name: "Profile",
                params: {
                  user: username,
                  completed: completedTodo.length,
                  pending: pendingTodo.length,
                },
                merge: true,
              });
            }}
          />
          <AppText style={styles.DesignText}> {username}👋</AppText>
        </View>

        <MaterialIcons
          name="restore-from-trash"
          style={styles.Headericon}
          size={30}
          color="black"
          onPress={() => {
            setFocus(false);
            navigation.navigate({
              name: "Trash",
              params: {
                trashTodo: trashTodo,
                completedTodo: completedTodo,
                pendingTodo: pendingTodo,
                userId: userId,
              },
            });
          }}
        />
      </View>

      <SearchToDo
        value={search}
        placeholder={"Search Here"}
        onChangeText={Searching}
      />
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,

          tabBarStyle: {
            backgroundColor: "#F3F8FF",
            fonFamily: "Poppins_400Regular",
          },
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
          name="Completed"
          children={() => {
            return (
              <Listing
                ComToPenAsync={(id) => {
                  ComToPenAsync(id);
                }}
                filteredData={completedTodo}
                MoveToTrashAsync={(id, completed) =>
                  MoveToTrashAsync(id, completed)
                }
                navigationFunction={(id, completed, createDate, date, title) =>
                  navigationToModel(id, completed, createDate, date, title)
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
          name="Pending"
          children={() => {
            return (
              <ListingPending
                filteredData={pendingTodo}
                PenToComAsync={(id) => PenToComAsync(id)}
                MoveToTrashAsync={(id, completed) =>
                  MoveToTrashAsync(id, completed)
                }
                navigationFunction={(id, completed, createDate, date, title) =>
                  navigationToModel(id, completed, createDate, date, title)
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

  Headercontainer: {
    paddingTop: 20,
    height: 80,
    backgroundColor: "#C6CFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  DesignText: {
    fontSize: 25,
    width: "80%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});
export default ToDoList;
