import "./App.css";

import { DndContext } from "@dnd-kit/core";

import {DraggableCard} from "./card/cards";
import { Field } from "./fields/fields";
import { useState } from "react";
import Snapshot from "./card/snapshot";
import { ThemeProvider } from "./components/ui/theme-provider";
import { EventTypes } from "./event-types";
import useStore from "./store/useStore";

function App() {
  const snapshotStyle: React.CSSProperties = {
    margin: "5px",
    display: "flex",
    flexDirection:"column",
    alignContent: "flex-start",
    alignItems: "center",
    width: "500px", // Width of the square
    height: "400px", // Height of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventListStyle: React.CSSProperties = {
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    width: "300px", // Width of the square
    height: "400px", // Height of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventTypesStyle: React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "5px",
    width: "820px", // Width of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const isDropped = useStore((state) => state.isDropped);
  const setIsDropped = useStore((state) => state.setIsDropped);

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

const draggableMarkup =   <Field title="Event Types " style={eventTypesStyle}>
<EventTypes></EventTypes>
</Field>

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-45 max-w-screen-lg">
          <DndContext onDragEnd={handleDragEnd}>
            
            <div className="calculation-area space-y-4">
            <Field title="Event list" style={eventListStyle}></Field>
           

              <Field title="Snapshot" style={snapshotStyle}>
                <Snapshot />
              </Field>
            </div>
            {!isDropped ? draggableMarkup : null}

          </DndContext>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
