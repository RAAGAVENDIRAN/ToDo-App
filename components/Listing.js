//Default Imports
import React, { useState } from "react";
import { FlatList } from "react-native";

//Components Import
import DisplayList from "./DisplayList";

export default function Listing({ filteredData, navigation }) {
  const [scrollLock, setScrollLock] = useState(true);

  return (
    <>
      <FlatList
        scrollEnabled={scrollLock}
        data={filteredData}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayList
            data={filteredData}
            item={item}
            scrollLock={(scrollLock) => {
              setScrollLock(scrollLock);
            }}
            navigation={navigation}
          />
        )}
      />
    </>
  );
}
