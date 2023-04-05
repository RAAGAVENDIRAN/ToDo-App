//Default Import
import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

//thirdParty Import
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Component Import
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import IconsProfile from "../components/IconsProfile";
import IconsGreater from "../components/IconGreater";
import { currentUser, setUser } from "../features/actions";

const { width, height } = Dimensions.get("window");

const PhoneRegExp = /^[0-9]{10}$/;
const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(PhoneRegExp, "Phone Number is not Valid")
    .min(9, "Invalid PhoneNumber!")
    .max(11, "Invalid Phone Number")
    .required("Required"),
  place: Yup.string().min(1, "Too Short!").required("Required"),
});

function EditProfile({ navigation }) {
  // redux
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.user.currentUser);
  console.log(currentuser.userId);
  const user = useSelector((state) => state.user.users);
  const userId = user.userId;
  console.log(user);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <IconsGreater
            name="chevron-left"
            style={{ backgroundColor: "white", flex: 1 }}
            onPress={() => {
              navigation.navigate({
                name: "Profile",
              });
            }}
          />
          <View style={{ flex: 8 }}>
            <AppText style={styles.topText}>Edit Profile</AppText>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        <View style={styles.middle}>
          <View style={styles.circle}></View>
          <View style={styles.middleInput}>
            <Formik
              initialValues={{
                username: currentuser.username ? currentuser.username : "",
                email: currentuser.email ? currentuser.email : "",
                phoneNumber: currentuser.phoneNumber
                  ? currentuser.phoneNumber
                  : "",
                place: currentuser.place ? currentuser.place : "",
              }}
              validationSchema={EditProfileSchema}
              onSubmit={async (values) => {
                dispatch(
                  currentUser({
                    currentUser: {
                      ...currentuser,
                      //   userId: currentuser.id,
                      username: values.username,
                      email: values.email,
                      phoneNumber: values.phoneNumber,
                      place: values.place,
                    },
                  })
                );
                const editarr = user.filter((item) => {
                  if (currentuser.userId === item.userId) {
                    // item.userId = currentuser.id;
                    item.username = values.username;
                    item.email = values.email;
                    item.phoneNumber = values.phoneNumber;
                    item.place = values.place;
                  }
                  return item;
                });

                dispatch(
                  setUser({
                    user: editarr,
                  })
                );
                const jsonValue = JSON.stringify({ users: [...editarr] });
                await AsyncStorage.setItem(`@users`, jsonValue);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    label="Username"
                    style={styles.input}
                    mode="outlined"
                    value={values.username}
                    onChangeText={handleChange("username")}
                  />
                  {errors.username && touched.username ? (
                    <AppText>{errors.username}</AppText>
                  ) : null}
                  <TextInput
                    label="Email"
                    style={styles.input}
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange("email")}
                  />
                  {errors.email && touched.email ? (
                    <AppText>{errors.email}</AppText>
                  ) : null}
                  <TextInput
                    label="phoneNumber"
                    style={styles.input}
                    mode="outlined"
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <AppText>{errors.phoneNumber}</AppText>
                  ) : null}
                  <TextInput
                    label="Place"
                    style={styles.input}
                    theme={{ backgroundColor: "red" }}
                    mode="outlined"
                    value={values.place}
                    onChangeText={handleChange("place")}
                  />
                  {errors.email && touched.email ? (
                    <AppText>{errors.place}</AppText>
                  ) : null}
                  <AppButton
                    title="Edit Profile"
                    color="#B0DAFF"
                    size={15}
                    font="Poppins_600SemiBold"
                    textColor="black"
                    style={styles.button}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
        <View style={styles.last}>
          <AppText style={styles.bottomText}>Joined 31 October 2022</AppText>
          <AppButton
            title="Delete"
            color="#B0DAFF"
            size={15}
            font="Poppins_600SemiBold"
            textColor="#FF0000"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate({
                name: "EditProfile",
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: width,
  },
  topText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    alignSelf: "center",
  },
  middle: {
    margin: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 200,
    width: 200,
    backgroundColor: "#E4DCCF",
    borderRadius: 100,
  },
  middleInput: {
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    margin: 10,
  },

  button: {
    width: width - 100,
    marginTop: 20,
    backgroundColor: "#B0DAFF",
    borderRadius: 40,
    alignSelf: "center",
  },
  last: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomText: {
    fontFamily: "Poppins_600SemiBold",
  },
  bottomButton: {
    width: 100,
    marginTop: 20,
    backgroundColor: "#FF6464",
    borderRadius: 60,
    opacity: 0.8,
    alignSelf: "center",
  },
});

export default EditProfile;
