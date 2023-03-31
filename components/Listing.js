import React, { useState } from "react";
import DisplayList from "./DisplayList";
import { FlatList } from "react-native";

export default function Listing({
  filteredData,
  MoveToTrashAsync,
  navigationFunction,
  ComToPenAsync,
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
            ComToPenAsync={(id) => ComToPenAsync(id)}
            item={item}
            scrollLock={(scrollLock) => {
              setScrollLock(scrollLock);
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
