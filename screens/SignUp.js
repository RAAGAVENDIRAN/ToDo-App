import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

import { AntDesign } from "@expo/vector-icons";

import AppButton from "../components/AppButton";

export default function SignUp({ navigation, route }) {
  const { userarr } = route.params;
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem("@users", jsonValue);
    } catch (e) {
      // saving error
    }
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

  const checkPasswordValidity = (value) => {
    if (username.trim() === "") {
      return "Username is compulsory";
    }

    if (username.length < 8) {
      return "Username must be atleast 8 characters.";
    }

    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces";
    }

    const isContainsUpperCase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUpperCase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowerCase = /^(?=.*[a-z]).*$/;
    if (!isContainsUpperCase.test(value)) {
      return "Password must have at least one LowerCase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8 - 16 Characters Long";
    }
    return null;
  };

  const handleLogin = () => {
    userarr.filter((item) => {
      if (item.username === username || item.email === email) {
        ToastAndroid.show(
          "Username or email already exists",
          ToastAndroid.SHORT
        );
      }
    });

    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      storeData({
        users: [
          ...userarr,
          {
            username: username,
            email: email,
            password: password,
            userId: Math.random() * Math.random(),
          },
        ],
      });

      navigation.navigate({
        name: "Login",
        params: {
          val: {
            username: username,
            email: email,
            password: password,
            userId: Math.random() * Math.random(),
          },
        },
      });
    } else {
      alert(checkPassword);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.text}>SIGN UP</Text>

        <View style={styles.textField}>
          <View>
            <TextInput
              style={styles.inputText}
              value={username}
              placeholder="UserName"
              onChangeText={(text) => setUserName(text)}
            />
          </View>

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
        {email == "" || password == "" || checkValidEmail == true ? (
          <TouchableOpacity
            disabled
            style={styles.buttonDisable}
            onPress={handleLogin}
          >
            <Text style={styles.text}>REGISTER</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>REGISTER</Text>
          </TouchableOpacity>
        )}
      </View>
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
  textField: {
    width: width - 50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
    paddingTop: 10,
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

  boxContainer: {
    width: width - 50,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEECFF",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#95BDFF",
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonDisable: {
    backgroundColor: "grey",
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  textFailed: {
    color: "red",
  },
  text: {
    fontSize: 30,
  },
  pass: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrongText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
  },
});
