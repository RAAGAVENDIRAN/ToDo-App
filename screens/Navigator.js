import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToDoList from "./ToDoList";
import InputModel from "../components/InputModel";

const Stack = createNativeStackNavigator();

export default function NavigatorPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen
          name="TodoList"
          component={ToDoList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InputModel"
          component={InputModel}
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
