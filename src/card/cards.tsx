import {useDraggable} from '@dnd-kit/core';

export function DraggableCard(props:any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: "draggable"
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div  ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}