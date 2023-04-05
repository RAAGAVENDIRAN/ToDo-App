//Default Import
import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

//Component Import
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import IconsProfile from "../components/IconsProfile";
import IconsGreater from "../components/IconGreater";

const { width, height } = Dimensions.get("window");
function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <IconsGreater
          name="chevron-left"
          style={{ backgroundColor: "white" }}
        />
        <AppText style={styles.topText}>Profile</AppText>
      </View>

      <View style={styles.middle}>
        <View style={styles.circle}></View>
        <AppText style={styles.nameText}>Raagavendiran M</AppText>
        <AppText style={styles.mailText}>raagavendiran@gmail.com</AppText>
        <AppButton
          title="Edit Profile"
          color="#B0DAFF"
          size={15}
          font="Poppins_600SemiBold"
          textColor="black"
          style={styles.button}
          onPress={() => {
            navigation.navigate({
              name: "EditProfile",
            });
          }}
        />
      </View>
      <View style={styles.last}>
        <TouchableOpacity style={styles.lastComponent}>
          <IconsProfile style={styles.leftIcon} />
          <AppText style={styles.bottomText}>Settings</AppText>
          <IconsGreater style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lastComponent}>
          <IconsProfile name="wallet-outline" style={styles.leftIcon} />
          <AppText style={styles.bottomText}>Billing Details</AppText>
          <IconsGreater style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.lastBottom}>
        <TouchableOpacity style={styles.lastComponent}>
          <IconsProfile name="information" style={styles.leftIcon} />
          <AppText style={styles.bottomText}>Information</AppText>
          <IconsGreater style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lastComponent}>
          <IconsProfile
            name="logout"
            iconType="AntDesign"
            size={25}
            style={styles.leftIcon}
          />
          <AppText
            style={styles.bottomText}
            onPress={() => {
              navigation.navigate({
                name: "Login",
              });
            }}
          >
            LogOut
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flexDirection: "row",
  },
  topText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    marginLeft: width / 3,
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
  nameText: {
    marginTop: 10,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
  mailText: {
    fontFamily: "Poppins_200ExtraLight",
  },

  button: {
    width: "50%",
    marginTop: 20,
    backgroundColor: "#B0DAFF",
    borderRadius: 40,
  },
  last: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: width,
  },
  lastComponent: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    marginVertical: 8,
    width: width,
  },
  bottomText: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
  },
  leftIcon: {
    marginLeft: 20,
    backgroundColor: "#B4E4FF",
  },
  rightIcon: {
    right: 40,
    position: "absolute",
    backgroundColor: "#F0EBE3",
  },
  lastBottom: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: width,
    marginTop: 40,
  },
});

export default Profile;
