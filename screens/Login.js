import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  ToastAndroid,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

import AppButton from "../components/AppButton";

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userarr, setUserarr] = useState([]);
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  useEffect(() => {
    if (route.params?.val) setUserarr([...userarr, route.params?.val]);
  }, [route.params?.val]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@users");
        let users = JSON.parse(jsonValue).users;
        console.log(users);
        if (users) {
          setUserarr([...users]);
        } else {
          setUserarr([]);
        }
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  const validateEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const Auth = () => {
    let isValid = false;
    userarr.filter((item) => {
      if (item.email === email) {
        if (item.password === password) {
          isValid = true;
          navigation.navigate({
            name: "TodoList",
            params: { user: item },
          });
        }
      }
    });
    if (!isValid)
      ToastAndroid.show("Incorrect Credentials!", ToastAndroid.SHORT);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.Input}>
          <Text style={styles.text}>SIGN IN</Text>
        </View>

        <View style={styles.textField}>
          <View>
            <TextInput
              style={styles.inputText}
              value={email}
              placeholder="Email"
              onChangeText={validateEmail}
            />
            <View style={styles.wrongText}>
              {checkValidEmail ? (
                <Text style={styles.textFailed}>Wrong Format Email</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>

          <View style={styles.pass}>
            <TextInput
              style={[styles.inputText, (flex = 1)]}
              value={password}
              placeholder="Password"
              secureTextEntry={seePassword}
              onChangeText={(text) => setPassword(text)}
            />
            <AntDesign
              name="eye"
              size={30}
              onPress={() => setSeePassword(!seePassword)}
              style={{ position: "absolute", right: 60 }}
            />
          </View>
        </View>

        <AppButton color="#95BDFF" title="SIGN IN" onPress={Auth} />
        <Text>Dont't have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate({
              name: "SignUp",
              params: { userarr: userarr },
            });
          }}
        >
          <Text style={{ color: "blue" }}>Sign Up</Text>
        </Pressable>
      </View>
      <Button title="clear" onPress={clearAll} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8D3FF",
  },

  pass: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
    paddingTop: 10,
  },
  wrongText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
  },
  textField: {
    width: width - 50,
  },
  inputText: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    height: 50,
    fontFamily: "Roboto",
    fontWeight: "bold",
    borderRadius: 25,
    margin: 20,
  },
  textFailed: {
    color: "red",
  },
  boxContainer: {
    width: width - 50,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEECFF",
    borderRadius: 20,
  },
});
