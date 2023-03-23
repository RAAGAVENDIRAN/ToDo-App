import React, { useState } from "react";
import DisplayList from "./DisplayList";

import { FlatList } from "react-native";
import DisplayListPending from "./DisplayListPending";

export default function ListingPending({
  filteredData,
  pressHandler,
  navigationFunction,
  PentoCom,
}) {
  const [scrollLock, setScrollLock] = useState(true);
  return (
    <>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        scrollEnabled={scrollLock}
        style={{ backgroundColor: "#C6CFFF" }}
        renderItem={({ item }) => (
          <DisplayListPending
            data={filteredData}
            item={item}
            scrollLock={(scrollLock) => {
              setScrollLock(scrollLock);
            }}
            PentoCom={(id) => {
              PentoCom(id);
            }}
            navigationTo={(id, completed) => navigationFunction(id, completed)}
            pressHandler={(id, completed) => pressHandler(id, completed)}
          />
        )}
      />
    </>
  );
}