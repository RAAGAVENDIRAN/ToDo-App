import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import Calendar from "react-native-calendars/src/calendar";

import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";

export default function EditModel({ navigation, route }) {
  const { id, completed, curDate, finishDate, title } = route.params;
  const finish = new Date(finishDate.slice(0, 16));

  const [editTodo, setEditTodo] = useState("");
  const [betweenDates, setBetweenDates] = useState({});
  const [endDate, setEndDate] = useState(
    new Date(finish.setDate(finish.getDate() + 1)).toISOString().slice(0, 10)
  );

  const current = new Date(curDate.slice(0, 16));

  const start = new Date(current.setDate(current.getDate() + 1))
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    let newBetweenDates = {};
    newBetweenDates[start] = {
      startingDay: true,
      color: "dodgerblue",
    };
    let newEnd = new Date(endDate);
    while (current.getTime() < newEnd.getTime()) {
      let newDate = new Date(current.setDate(current.getDate() + 1))
        .toISOString()
        .slice(0, 10);
      newBetweenDates[newDate] = {
        color: "dodgerblue",
      };
    }
    newBetweenDates[endDate] = {
      endingDay: true,
      color: "dodgerblue",
    };

    setBetweenDates({ ...newBetweenDates });
  }, [endDate]);

  const changeDate = (day) => {
    setEndDate(day.dateString);
  };

  const istyle = {
    backgroundColor: "#C6CFFF",
  };

  const mstyle = {
    backgroundColor: "#C6CFFF",
  };

  const Edit = (val) => {
    setEditTodo(val);
  };

  //fonts

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <AppText style={{ fontFamily: "Poppins_300Light" }}>
          Created on: {curDate}
        </AppText>
        <View style={styles.top}>
          <AppText style={styles.textDesign}>Edit Todo</AppText>
          <AntDesign name="edit" size={30} color={colors.dark}></AntDesign>
        </View>

        <TextInput
          style={styles.inputStyle}
          placeholder="Edit Todo"
          onChangeText={Edit}
          value={editTodo}
        ></TextInput>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.buttonDesign, istyle]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AppText style={styles.closeText}> X </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonDesign, mstyle]}
            onPress={() => {
              navigation.navigate({
                name: "TodoList",
                params: {
                  EditInput: editTodo === "" ? title : editTodo,
                  Editid: id,
                  completed: completed,
                  endDate: new Date(endDate).toString().slice(0, 24),
                },

                merge: true,
              });
            }}
          >
            <AppText style={styles.crctText}>✓</AppText>
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        style={styles.calendar}
        minDate={curDate}
        onDayPress={changeDate}
        // maxDate={finishDate}
        markingType={"period"}
        markedDates={{
          // [start]: {
          //   startingDay: true,
          //   color: "dodgerblue",
          // },
          ...betweenDates,
          // [end]: {
          //   endingDay: true,
          //   color: "dodgerblue",
          // },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    height: 320,
    width: 350,
    backgroundColor: "#F3F8FF",
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonDesign: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    width: "20%",
    marginVertical: 10,
    marginHorizontal: 40,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 35,
    shadowOpacity: 0.3,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
    width: 300,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C6CFFF",
  },
  inputStyle: {
    width: 300,
    height: 50,
    backgroundColor: "#C6CFFF",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    letterSpacing: 1,
    borderWidth: 1,
    fontFamily: "Poppins_300Light",
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold_Italic",
  },

  textDesign: {
    color: "black",
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold_Italic",
  },

  crctText: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold_Italic",
    color: "black",
  },
});
