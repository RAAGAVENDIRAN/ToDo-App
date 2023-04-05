//default Imports
import React, { useState } from "react";
import { FlatList } from "react-native";

//Components Imports
import DisplayListPending from "./DisplayListPending";

export default function ListingPending({ filteredData, navigation }) {
  const [scrollLock, setScrollLock] = useState(true);
  return (
    <>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        scrollEnabled={scrollLock}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayListPending
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
