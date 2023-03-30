import React, { useState } from "react";
import DisplayList from "./DisplayList";

import { FlatList } from "react-native";
import DisplayListPending from "./DisplayListPending";

export default function ListingPending({
  filteredData,
  pressHandlerAsync,
  navigationFunction,
  PenToComAsync,
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
            PenToComAsync={(id) => {
              PenToComAsync(id);
            }}
            navigationTo={(id, completed, createdDate, date, title) =>
              navigationFunction(id, completed, createdDate, date, title)
            }
            pressHandlerAsync={(id, completed) =>
              pressHandlerAsync(id, completed)
            }
          />
        )}
      />
    </>
  );
}
