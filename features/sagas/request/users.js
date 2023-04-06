import AsyncStorage from "@react-native-async-storage/async-storage";

async function getFromAsync() {
  const jsonValue = await AsyncStorage.getItem("@users");
  let users = JSON.parse(jsonValue).users;
  if (users) {
    return users;
  }
}

export default getFromAsync;
