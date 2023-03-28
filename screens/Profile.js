// import React from "react";
// import { Text, View, StyleSheet, ScrollView } from "react-native";
// import PieChart from "react-native-pie-chart";

// function Profile({ navigation, route }) {
//   const { comLen, penLen } = route.params;

//   const widthAndHeight = 250;
//   const series = [123, 321, 123, 789, 537];
//   const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];

//   return (
//     <View style={StyleSheet.container}>
//       <Text>{comLen}</Text>
//       <Text>{penLen}</Text>

//       <ScrollView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Basic</Text>
//           <PieChart
//             widthAndHeight={widthAndHeight}
//             series={series}
//             sliceColor={sliceColor}
//           />
//           <Text style={styles.title}>Doughnut</Text>
//           <PieChart
//             widthAndHeight={widthAndHeight}
//             series={series}
//             sliceColor={sliceColor}
//             doughnut={true}
//             coverRadius={0.45}
//             coverFill={"#FFF"}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
