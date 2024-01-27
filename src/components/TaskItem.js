import React, { useContext, useEffect, useState } from "react";
import { DataFlowContext } from "../App";
import CardBox from "./CardBox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModelBox from "./ModelBox";

const TaskItem = () => {
  const { selectedTask, setSelectedTask } = useContext(DataFlowContext);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(selectedTask.category);
  }, [selectedTask]);

  const reOrder = (list, startIndex, endIndex) => {
    let temp = list[endIndex];
    list[endIndex] = list[startIndex];
    list[startIndex] = temp;
    const result = list.map((item, index) => {
      if (!index) {
        return { ...item, priority: "high" };
      } else if (index === list.length - 1) {
        return { ...item, priority: "low" };
      } else {
        return { ...item, priority: "medium" };
      }
    });
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    backgroundColor: isDragging ? "#bae0ff" : "#fffbe6",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    backgroundColor: isDraggingOver ? "#fff" : "#e6fffb",
    width: 250,
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const reorderedItems = reOrder(data, source.index, destination.index);
    setData(reorderedItems);
  };

  const submitForm = (formData) => {
    setData([...data, { ...formData, id: "category-" + Date.now() }]);
    setSelectedTask({
      ...selectedTask,
      end: selectedTask.end + 1,
      category: [...data, { ...formData, id: "category-" + Date.now() }],
    });
  };

  const deleteTask = (id) => {
    const fileterData = data.filter((item) => item.id !== id);
    setSelectedTask({
      ...selectedTask,
      category: [...fileterData],
    });
    setData(fileterData);
  };

  const editTask = (formData) => {
    const { id, title, desc, priority, start, end } = formData;
    let updateData = data.map((item) => {
      if (item.id == id) {
        return { ...item, title, desc, priority, start, end };
      } else {
        return item;
      }
    });
    setSelectedTask({
      ...selectedTask,
      category: [...updateData],
    });
    setData(updateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="sub-box wrapper"
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className="sub">
              <h3 className="sub-heading">Task Item</h3>
              <button className="button" onClick={() => setOpen(!open)}>
                + Add Item
              </button>
            </div>
            {data &&
              data.map((item, index) => (
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
                      <CardBox
                        data={item}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        status={(item.start / item.end) * 100}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {open && (
        <ModelBox
          setOpen={setOpen}
          submitForm={submitForm}
          data={data}
          isEdit={false}
          isRequired={true}
        />
      )}
    </DragDropContext>
  );
};

export default TaskItem;
