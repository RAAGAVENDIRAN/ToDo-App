import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  CheckBox,
  Dimensions,
  TouchableOpacity,
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

const checks = ["unchecked", "checked"];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 70;

function DisplayList({ item, pressHandler, todos, handleEdit }) {
  const [isChecked, setChecked] = useState(item.completed ? 1 : 0);

  const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const pan = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value * -1 > TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(pressHandler)(item.id);
          }
          // pressHandler;
        });
      } else {
        translateX.value = withSpring(0);
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
      {/* {todos.length < 0 && <Text>You have no ToDos</Text>} */}
      <GestureHandlerRootView>
        <Animated.View style={rTaskContainerStyle}>
          <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
            <FontAwesome5
              name={"trash-alt"}
              size={70 * 0.4}
              color={"red"}
            ></FontAwesome5>
          </Animated.View>
          <PanGestureHandler onGestureEvent={pan}>
            <Animated.View style={[styles.container, rStyle]}>
              <RadioButton
                style={styles.check}
                status={checks[isChecked]}
                onPress={() => {
                  setChecked(isChecked ^ 1);
                }}
              />

              <View style={{ flex: 8 }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    styles.DesignText,
                    isChecked
                      ? { textDecorationLine: "line-through" }
                      : { textDecorationLine: "none" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
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
    height: 70,
    backgroundColor: "#031956",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  date: {
    marginTop: 10,
    fontSize: 10,
    color: "white",
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
    fontSize: 17,
    color: "white",
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

export default DisplayList;
