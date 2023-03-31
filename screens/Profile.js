import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";

function Profile({ navigation, route }) {
  //   const { completed, pending } = route.params;

  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];

  return (
    <View style={StyleSheet.container}>
      {/* <Text>{completed}</Text>
      <Text>{pending}</Text> */}
      <Text>mksd</Text>
      <Text>dssdsd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
