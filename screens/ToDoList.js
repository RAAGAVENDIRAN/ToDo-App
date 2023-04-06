//default Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

//Third-Party Imports
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//components IMports
import SearchToDo from "../components/SearchToDo";
import BottomButton from "../components/BottomButton";
import Listing from "../components/Listing";
import ListingPending from "../components/ListingPending";
import { useDispatch, useSelector } from "react-redux";
import { removeDetails, serachTodo, setTodo } from "../features/actions";
import { useIsFocused } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import AppText from "../components/AppText";

const Tab = createMaterialTopTabNavigator();
let arr = [];

function ToDoList({ navigation }) {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const isFocused = useIsFocused();
  let profile = user.profile;

  //getting data from redux
  const todos = useSelector((state) => state.todo);
  const completedTodo = useSelector((state) => state.todo.completedTodo);
  const pendingTodo = useSelector((state) => state.todo.pendingTodo);
  const trashTodo = useSelector((state) => state.todo.trashTodo);
  const isFetched = useSelector((state) => state.todo.isFetched);

  //state
  const [search, setSearch] = useState("");
  const [retrieve, setRetrieve] = useState(false);

  //datas
  const userId = user.userId;
  const username = user.username;

  //
  useEffect(() => {
    const subscribe = navigation.addListener("beforeRemove", () => {
      dispatch(removeDetails());
    });
    return subscribe;
  }, [navigation]);

  //getdata from async storage
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(`@todo ${userId}`);
        const value = JSON.parse(jsonValue);

        let tempPendingTodo = [];
        let tempCompletedTodo = [];
        let tempTrashTodo = [];

        if (value && value.userId.completedTodo)
          tempCompletedTodo = value.userId.completedTodo;
        if (value && value.userId.pendingTodo)
          tempPendingTodo = value.userId.pendingTodo;
        if (value && value.userId.trashTodo)
          tempTrashTodo = value.userId.trashTodo;

        dispatch(
          setTodo({
            completedTodo: tempCompletedTodo,
            pendingTodo: tempPendingTodo,
            trashTodo: tempTrashTodo,
          })
        );
        arr = tempCompletedTodo;
        setRetrieve(true);
      } catch (e) {
        console.log(e);
      }
    };

    if (!isFetched) getData();
  }, [isFocused]);

  // setting async storage
  useEffect(() => {
    if (retrieve) {
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: pendingTodo,
          trashTodo: trashTodo,
        },
      });
    }
  }, [todos]);

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  //store data to async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      let value2 = await AsyncStorage.setItem(`@todo ${userId}`, jsonValue);
    } catch (e) {
      console.log("Error");
    }
  };

  // Search function
  const Searching = (newtext) => {
    setSearch(newtext);
    if (arr.length) {
      dispatch(
        serachTodo({
          array: [...arr],
          bool: arr[0].completed,
          newtext: newtext,
        })
      );
    }
  };

  // setting the current tab array
  const setTab = (tab) => {
    if (tab == 1) {
      arr = completedTodo;
    } else {
      arr = pendingTodo;
    }
  };

  if (isFocused) {
    return (
      <View style={styles.container}>
        <View style={styles.Top}>
          <View style={styles.Headercontainer}>
            <View style={{ flexDirection: "row" }}>
              <View>
                {profile ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate({
                        name: "Profile",
                      });
                    }}
                  >
                    <Image source={{ uri: profile }} style={styles.circle} />
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate({
                        name: "Profile",
                      });
                    }}
                  >
                    <Image
                      source={require("../assets/profile.png")}
                      style={styles.circle}
                    />
                  </TouchableWithoutFeedback>
                )}
              </View>
              <AppText style={styles.HeaderText}>Hi {user.username}</AppText>
            </View>
            <View>
              <MaterialIcons
                name="restore-from-trash"
                style={styles.Headericon}
                size={40}
                color="black"
                onPress={() => {
                  navigation.navigate({
                    name: "Trash",
                  });
                }}
              />
            </View>
          </View>

          <SearchToDo
            style={{ backgroundColor: "#fff" }}
            value={search}
            placeholder={"Search Here"}
            onChangeText={Searching}
          />
        </View>
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
            options={{
              tabBarStyle: {
                backgroundColor: "#fff",
                labelStyle: {
                  fontFamily: "Poppins_400Regular",
                  fontSize: 30,
                },
              },
            }}
            name="Completed"
            children={() => {
              return (
                <Listing filteredData={completedTodo} navigation={navigation} />
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
                  navigation={navigation}
                />
              );
            }}
          />
        </Tab.Navigator>

        {search === "" ? (
          <BottomButton
            navigated={() => {
              navigation.navigate({
                name: "InputModel",
              });
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Top: {
    backgroundColor: "#B0DAFF",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },

  itemStyle: {
    padding: 10,
  },

  HeaderText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },

  circle: {
    height: 50,
    width: 50,
    backgroundColor: "#E4DCCF",
    borderRadius: 25,
  },

  Headercontainer: {
    paddingTop: 20,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DesignText: {
    fontSize: 25,
    width: "80%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});

export default ToDoList;
