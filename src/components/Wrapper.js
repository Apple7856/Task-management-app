import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardBox from "./CardBox";

const Wrapper = ({ heading, data, id }) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    backgroundColor: isDragging ? "#bae0ff" : "#fffbe6",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    backgroundColor: isDraggingOver ? "#fff" : "#e6fffb",
    width: 250,
  });
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="sub-box wrapper"
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <h3 className="sub-heading">{heading}</h3>
          {data.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <CardBox data={item} status={(item.start / item.end) * 100} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Wrapper;
