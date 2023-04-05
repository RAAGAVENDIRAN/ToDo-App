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

let arr = [];

export default function Trash({ navigation, route }) {
  //redux
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const completedTodo = useSelector((state) => state.todo.completedTodo);
  const pendingTodo = useSelector((state) => state.todo.pendingTodo);
  const trashTodo = useSelector((state) => state.todo.trashTodo);
  // let temp = trashTodo;
  // arr = temp;

  //datas
  const userId = user.userId;

  //states
  const [search, setSearch] = useState("");
  const [retrieve, setRetrieve] = useState(false);

  //   store data to async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      let value2 = await AsyncStorage.setItem(`@todo ${userId}`, jsonValue);
    } catch (e) {
      // saving error
      console.log("Error");
    }
  };

  //get Data of trash
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(`@todo ${userId}`);
        const value = JSON.parse(jsonValue);

        let tempTrashTodo = [];
        if (value && value.userId.trashTodo)
          tempTrashTodo = value.userId.trashTodo;

        arr = tempTrashTodo;
        setRetrieve(true);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  //setting in async storage
  useEffect(() => {
    console.log("In DB Setter");
    if (retrieve) {
      console.log("Storing Data");
      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: pendingTodo,
          trashTodo: trashTodo,
        },
      });
      setRetrieve(false);
    }
  }, [retrieve]);

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  const callDB = () => {
    setRetrieve(true);
  };

  //searching
  const Searching = (newtext) => {
    setSearch(newtext);

    if (arr.length) {
      dispatch(
        serachTodo({
          array: [...arr],
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
              if (trashTodo.length > 0) {
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
        data={trashTodo}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayListTrash data={trashTodo} item={item} callDB={callDB} />
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
