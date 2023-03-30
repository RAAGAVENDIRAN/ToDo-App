import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
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
  Swipeable,
} from "react-native-gesture-handler";
import { Button } from "@rneui/themed";
import AppText from "./AppText";

const checks = ["unchecked", "checked"];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 90;

function DisplayListPending({
  item,
  pressHandlerAsync,
  navigationTo,
  navigation,
  scrollLock,
  PenToComAsync,
}) {
  const [isChecked, setChecked] = useState(item.completed ? 1 : 0);

  const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(100);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const Unchecked = () => {
    PenToComAsync(item.id);
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
            runOnJS(pressHandlerAsync)(item.id, "no", item.createDate);
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
          navigationTo(item.id, "no", item.createDate, item.date, item.title);
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
              activateAfterLongPress={100}
              onGestureEvent={pan}
            >
              <Animated.View style={[styles.container, rStyle]}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <RadioButton
                    style={styles.check}
                    status={checks[isChecked]}
                    onPress={() => {
                      {
                        setChecked(isChecked ^ 1);
                        Unchecked();
                      }
                    }}
                  />

                  <View style={{ flex: 8 }}>
                    <AppText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[styles.DesignText]}
                    >
                      {item.title}
                    </AppText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText style={styles.dateStart}>{item.createDate}</AppText>
                  <AppText style={styles.date}>{item.date}</AppText>
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
    height: 100,
    backgroundColor: "#F3F8FF",
    justifyContent: "space-evenly",

    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  date: {
    fontFamily: "Poppins_300Light_Italic",
    fontSize: 10,
    color: "black",
    alignItems: "flex-end",
    marginRight: 20,
  },
  dateStart: {
    fontFamily: "Poppins_300Light_Italic",
    fontSize: 10,
    color: "black",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
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
    fontFamily: "Poppins_600SemiBold",
  },

  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "10%",
  },
});

export default DisplayListPending;
