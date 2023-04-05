//default Imports

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Text,
  useWindowDimensions,
} from "react-native";

//third-Party Imports
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Iconic from "../components/Iconic";
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { currentUser, setUser } from "../features/actions";

const data = [""];

function Login({ navigation, route }) {
  // redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@users");
        let users = JSON.parse(jsonValue).users;
        if (users) {
          dispatch(setUser({ user: users }));
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //cleaning the Async Storage
  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log("Done.");
  // };

  //Validate Email Function
  const validateEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text) || text == "") {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  //Authentication Function
  const Auth = () => {
    let isValid = false;
    users.filter((item) => {
      if (item.email === email) {
        if (item.password === password) {
          isValid = true;
          setPassword("");
          setEmail("");
          dispatch(currentUser({ currentUser: item }));
          navigation.navigate({
            name: "TodoList",
            // params: { user: item },
          });
        }
      }
    });
    if (!isValid)
      ToastAndroid.show("Incorrect Credentials!", ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={{ height: height }}>
        <View style={{ flex: 0.9 }}>
          <View style={{ zIndex: 1 }}>
            <View style={[styles.item, { zIndex: data.length }]}>
              <LinearGradient
                style={StyleSheet.absoluteFill}
                colors={["#B0DAFF", "#B0DAFF", "#B0DAFF"]}
              />
            </View>
          </View>
          <View style={styles.upperText}>
            <AppText
              style={{ fontFamily: "Poppins_600SemiBold", fontSize: 40 }}
            >
              Login
            </AppText>
            <AppText
              style={{ fontFamily: "Poppins_200ExtraLight", fontSize: 20 }}
            >
              Please sign in to continue.
            </AppText>
          </View>
          <View style={styles.middleText}>
            <Iconic
              name="email-outline"
              size={30}
              height={70}
              placeholder="EMAIL"
              value={email}
              onChangeText={validateEmail}
            />
            <View style={styles.wrongText}>
              {checkValidEmail ? (
                <Text style={styles.textFailed}>Wrong Format Email</Text>
              ) : null}
            </View>
            <Iconic
              name="lock-outline"
              size={30}
              height={70}
              placeholder="PASSWORD"
              secureTextEntry={seePassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
              onPress={() => setSeePassword(!seePassword)}
            />
          </View>

          <View style={styles.Last}>
            <AppButton
              style={styles.button}
              color="#B0DAFF"
              title="LOGIN"
              onPress={Auth}
            />
          </View>
        </View>
        <View style={styles.LastText}>
          <AppText style={{ fontFamily: "Poppins_400Regular" }}>
            Don't have an account?
            <AppText
              onPress={() => {
                navigation.navigate({
                  name: "SignUp",
                });
              }}
              style={{ color: "#B0DAFF", fontFamily: "Poppins_600SemiBold" }}
            >
              Sign up
            </AppText>
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    height: 250,
    borderBottomLeftRadius: 100, // logic goes here
    marginTop: -100, // move container
    paddingTop: 100, // move inner item down
    overflow: "hidden",
  },
  upperText: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  middleText: {
    marginTop: 40,
    marginHorizontal: 15,
  },
  inputText: {
    margin: 10,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 300,
    fontFamily: "Poppins_400Regular",
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  Last: {
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 30,
  },
  button: {
    borderRadius: 10,
  },
  LastText: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
  },
  wrongText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
  },
  textFailed: {
    color: "red",
  },
  Wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Login;
