import "./App.css";

import { DndContext } from "@dnd-kit/core";

import { Card } from "./card/cards";
import { Field } from "./fields/fields";
import { useState } from "react";
import Snapshot from "./card/snapshot";

function App() {
  const snapshotStyle: React.CSSProperties = {
    margin: "5px",
    justifyContent: "center",
    alignContent: "flex-start",
    width: "400px", // Width of the square
    height: "400px", // Height of the square
    backgroundColor: "#333", // Dark grey background
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventListStyle: React.CSSProperties = {
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    width: "200px", // Width of the square
    height: "400px", // Height of the square
    backgroundColor: "#333", // Dark grey background
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventTypesStyle: React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "5px",
    width: "62xS0px", // Width of the square
    height: "100px", // Height of the square
    backgroundColor: "#333", // Dark grey background
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const [isDropped, setIsDropped] = useState(false);
  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  const draggableMarkup = <Card>Drag me</Card>;

  return (
    <div className="main">
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <div className="calculation-area">
          <Field title="Event list" style={eventListStyle}></Field>

          <Field title="Snapshot" style={snapshotStyle}>
            <Snapshot />
          </Field>
        </div>

        <Field title="" style={eventTypesStyle}>
          {isDropped ? draggableMarkup : "Drop here"}
        </Field>
      </DndContext>
    </div>
  );
}

export default App;
