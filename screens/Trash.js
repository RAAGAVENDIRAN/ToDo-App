// default imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

//third part IMports
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components Imports
import AppText from "../components/AppText";
import DisplayListTrash from "../components/DisplayListTrash";
import SearchToDo from "../components/SearchToDo";
import { clearTrash, serachTodo } from "../features/actions";

import { GET_TODO } from "../features/actions";

let arr = [];

export default function Trash({ navigation, route }) {
  //redux
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // const completedTodo = useSelector((state) => state.todo.completedTodo);
  // const pendingTodo = useSelector((state) => state.todo.pendingTodo);
  const trashTodo = useSelector((state) => state.todo.trashTodo);
  let obj = useSelector((state) => state.todo.trashTodo);
  // let temp = trashTodo;
  // arr = temp;

  //datas
  const userId = user.userId;

  //

  // let completedTodoArr = [];
  // let pendingTodoArr = [];
  let trashTodoArr = [];

  // Object.keys(completedTodo).filter((key) => {
  //   completedTodoArr.push(completedTodo[key.toString()]);
  // });

  // Object.keys(pendingTodo).filter((key) => {
  //   pendingTodoArr.push(pendingTodo[key.toString()]);
  // });

  Object.keys(trashTodo).filter((key) => {
    trashTodoArr.push(trashTodo[key.toString()]);
  });

  console.log(trashTodoArr);

  //states
  const [search, setSearch] = useState("");
  // const [retrieve, setRetrieve] = useState(false);

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  // const callDB = () => {
  //   setRetrieve(true);
  // };

  //searching
  const Searching = (newtext) => {
    setSearch(newtext);

    if (Object.values(obj).length) {
      dispatch(
        serachTodo({
          obj: obj,
          bool: "trash",
          newtext: newtext,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View style={[styles.Headercontainer, { flexDirection: "row" }]}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AppText style={styles.DesignText}> TRASH</AppText>
          <MaterialIcons
            name="delete"
            style={styles.Headericon}
            size={30}
            color="black"
            onPress={() => {
              if (trashTodoArr.length > 0) {
                Alert.alert("Are you Sure?", "Your Trash  will be deleted", [
                  {
                    text: "Confirm",
                    onPress: () => {
                      dispatch(clearTrash());
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
            }}
          />
        </View>

        <SearchToDo
          value={search}
          placeholder={"Search Here"}
          onChangeText={Searching}
        />
      </View>
      <FlatList
        data={trashTodoArr}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayListTrash data={trashTodoArr} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Headercontainer: {
    paddingTop: 20,
    height: 80,
    width: "100%",
  },
  Top: {
    backgroundColor: "#B0DAFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#C6CFFF",
  },

  DesignText: {
    fontSize: 25,
    width: "80%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});
