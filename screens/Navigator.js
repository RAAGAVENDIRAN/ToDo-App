import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToDoList from "./ToDoList";
import InputModel from "../components/InputModel";
import EditModel from "../components/EditModel";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Trash from "./Trash";
// import AuthStack from "./AppStack";

const Stack = createNativeStackNavigator();

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
          name="Trash"
          component={Trash}
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
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            animation: "flip",
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
