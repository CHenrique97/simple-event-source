import { CardHeader, CardTitle } from "@/components/ui/card";
import "./fields.css"
import {useDroppable} from '@dnd-kit/core';

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
  
  
  return (
    <>
    <div ref={setNodeRef} style ={customStyle}> 
    <CardHeader>
    <CardTitle>{props.title}</CardTitle>

  </CardHeader>
    {props.children}
    </div>
    </>
  );
}