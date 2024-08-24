import { CardHeader, CardTitle } from "@/components/ui/card";
import "./fields.css"
import {useDroppable} from '@dnd-kit/core';
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Fields = {
  style?: React.CSSProperties; // React.CSSProperties is more appropriate for styling
  title?: string;
  data?: Record<string, any>; // or any other more specific type if you know the structure
  children?: React.ReactNode;
};


export const Field  = (props: Fields)  => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });

  const customStyle = { color: isOver ? 'green' : 'white',
    ...props.style
  }
  
  const [showTitle, setShowTitle] = useState(props.title !== "Snapshot");

  const handleRevealClick = () => {
    setShowTitle(true);
  };
  
  return (
    <>
    <div ref={setNodeRef} style ={customStyle}> 
    <CardHeader>
        {showTitle ? (
          <CardTitle>{props.title}</CardTitle>
        ) : (
          <Button onClick={handleRevealClick}>Reveal Name</Button>
        )}
  </CardHeader>
    {props.children}
    </div>
    </>
  );
}
