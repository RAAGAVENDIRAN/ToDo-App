import React, { useState } from "react";
import DisplayList from "./DisplayList";

import { FlatList } from "react-native";
import DisplayListPending from "./DisplayListPending";

export default function ListingPending({
  filteredData,
  MoveToTrashAsync,
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
        style={{ backgroundColor: "#fff" }}
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
            MoveToTrashAsync={(id, completed) =>
              MoveToTrashAsync(id, completed)
            }
          />
        )}
      />
    </>
  );
}
