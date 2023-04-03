import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../components/AppText";
import DisplayListTrash from "../components/DisplayListTrash";
import SearchToDo from "../components/SearchToDo";

export default function Trash({ navigation, route }) {
  const [search, setSearch] = useState("");
  const { trashTodo, completedTodo, pendingTodo, userId } = route.params;
  const trashTo = trashTodo;
  const [trash, setTrash] = useState(trashTo);

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

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  const removeFromTrashAsync = (id, completed) => {
    let takeData;
    if (completed) {
      let newTrash = trash.filter((item) => {
        if (item.id === id) {
          takeData = item;
          return;
        }
        return item;
      });

      storeData({
        userId: {
          completedTodo: [...completedTodo, takeData],
          pendingTodo: pendingTodo,
          trashTodo: newTrash,
        },
      });
    } else {
      let newTrash = trash.filter((item) => {
        if (item.id === id) {
          takeData = item;
          return;
        }
        return item;
      });

      storeData({
        userId: {
          completedTodo: completedTodo,
          pendingTodo: [...pendingTodo, takeData],
          trashTodo: newTrash,
        },
      });
    }
  };

  //delete the particular item in Trash

  const deleteFromTrashAsync = (id, completed) => {
    let newTrash = trash.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });

    storeData({
      userId: {
        completedTodo: completedTodo,
        pendingTodo: pendingTodo,
        trashTodo: newTrash,
      },
    });
  };

  //searching
  const Searching = (newtext) => {
    setSearch(newtext);

    if (trashTo.length) {
      searchFilterFunction(trashTo, newtext);
    }
  };

  //search Filter Function
  const searchFilterFunction = (array, newtext) => {
    console.log(array);
    let newData = array.filter((item) => {
      let itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      let textData = newtext.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setTrash(newData);
  };

  //clear trash
  const ClearTrash = async () => {
    if (trashTo.length > 0) {
      Alert.alert("Are you Sure?", "Your Trash  will be deleted", [
        {
          text: "Confirm",
          onPress: () => {
            setTrash([]);
            storeData({
              userId: {
                completedTodo: completedTodo,
                pendingTodo: pendingTodo,
                trashTodo: [],
              },
            });
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
            onPress={ClearTrash}
          />
        </View>

        <SearchToDo
          value={search}
          placeholder={"Search Here"}
          onChangeText={Searching}
        />
      </View>
      <FlatList
        data={trash}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayListTrash
            data={trashTodo}
            item={item}
            remove={(id, completed) => removeFromTrashAsync(id, completed)}
            deleteTrash={(id, completed) => deleteFromTrashAsync(id, completed)}
          />
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
