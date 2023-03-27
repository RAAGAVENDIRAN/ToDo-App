import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToDoList from "./ToDoList";
import InputModel from "../components/InputModel";
import EditModel from "../components/EditModel";
import Login from "./Login";
import SignUp from "./SignUp";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

export default function NavigatorPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="TodoList"
          component={ToDoList}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="InputModel"
          component={InputModel}
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
        <Stack.Screen
          name="EditModel"
          component={EditModel}
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
