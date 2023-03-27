import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  CheckBox,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { Button } from "@rneui/themed";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 90;

function DisplayList({
  item,
  pressHandler,
  navigationTo,
  compToPen,
  scrollLock,
}) {
  const [isChecked, setChecked] = useState(item.completed ? 1 : 0);
  const [modalVisible, setModalVisible] = useState(false);
  const checks = ["unchecked", "checked"];
  const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(90);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const Checked = () => {
    compToPen(item.id);
  };

  const pan = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.value = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.value;
      runOnJS(scrollLock)(false);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value * -1 > TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(pressHandler)(item.id, "yes");

            runOnJS(scrollLock)(true);
          }
        });
      } else {
        translateX.value = withSpring(0);
        runOnJS(scrollLock)(true);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          navigationTo(item.id, "yes");
        }}
      >
        <GestureHandlerRootView>
          <Animated.View style={rTaskContainerStyle}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
              <FontAwesome5
                name={"trash-alt"}
                size={70 * 0.4}
                color={"red"}
              ></FontAwesome5>
            </Animated.View>

            <PanGestureHandler
              on
              activateAfterLongPress={100}
              onGestureEvent={pan}
            >
              <Animated.View style={[styles.container, rStyle]}>
                <RadioButton
                  style={styles.check}
                  status={checks[isChecked]}
                  onPress={() => {
                    {
                      setChecked(isChecked ^ 1);
                      Checked();
                    }
                  }}
                />

                <View style={{ flex: 8 }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[styles.DesignText]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  CheckBoxDesign: {
    height: 50,
    width: 40,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    backgroundColor: "#391e7e",
    flex: 1,
  },
  container: {
    flex: 1,
    height: 100,
    backgroundColor: "#F3F8FF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  date: {
    marginTop: 10,
    fontSize: 10,
    color: "black",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 70,
  },
  DeleteIcon: {
    flex: 1,
    height: 50,
    width: 40,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  DesignText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },

  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "10%",
  },

  //imported

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DisplayList;
