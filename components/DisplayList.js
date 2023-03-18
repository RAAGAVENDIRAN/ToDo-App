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
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  Swipeable,
} from "react-native-gesture-handler";

const checks = ["unchecked", "checked"];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 70;

function DisplayList({ item, pressHandler }) {
  const [isChecked, setChecked] = useState(item.completed ? 1 : 0);

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.deleteBox}>
        <MaterialIcons
          name="delete"
          size={30}
          color="#391e7e"
          onPress={() => pressHandler(item.id)}
        />
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.container}>
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
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
    fontSize: 15,
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
