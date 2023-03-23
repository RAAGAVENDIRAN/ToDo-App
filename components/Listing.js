import React, { useState } from "react";
import DisplayList from "./DisplayList";
import { FlatList } from "react-native";

export default function Listing({
  filteredData,
  pressHandler,
  navigationFunction,
  compToPen,
}) {
  const [scrollLock, setScrollLock] = useState(true);

  return (
    <>
      <FlatList
        scrollEnabled={scrollLock}
        data={filteredData}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#C6CFFF" }}
        renderItem={({ item }) => (
          <DisplayList
            data={filteredData}
            compToPen={(id) => compToPen(id)}
            item={item}
            scrollLock={(scrollLock) => {
              setScrollLock(scrollLock);
            }}
            navigationTo={(id, completed) => navigationFunction(id, completed)}
            pressHandler={(id, completed) => pressHandler(id, completed)}
          />
        )}
      />
    </>
  );
}
