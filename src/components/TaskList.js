import React, { useContext, useEffect, useState } from "react";
import CardBox from "./CardBox";
import { DataFlowContext } from "../App";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ModelBox from "./ModelBox";

const TaskList = ({ taskData }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const { selectedTask, setSelectedTask } = useContext(DataFlowContext);

  useEffect(() => {
    setData(taskData);
  }, [taskData]);

  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
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
    let newData = [
      ...data,
      {
        ...formData,
        id: "task-list-" + Date.now(),
        start: 0,
        end: 0,
        category: [],
      },
    ];
    setData(newData);
    let stringData = JSON.stringify(newData);
    localStorage.setItem("tasks", stringData);
  };

  const deleteTask = (id) => {
    const fileterData = data.filter((item) => item.id !== id);
    if (selectedTask.id == id) {
      setSelectedTask({});
    }
    setData(fileterData);
  };

  const editTask = (formData) => {
    const { id, title, desc, priority } = formData;
    let updateData = data.map((item) => {
      if (item.id == id) {
        return { ...item, title, desc, priority };
      } else {
        return item;
      }
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
              <h3 className="sub-heading">Task List</h3>
              <button className="button" onClick={() => setOpen(!open)}>
                + Add Task
              </button>
            </div>
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    onClick={() => setSelectedTask(item)}
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
          isRequired={false}
        />
      )}
    </DragDropContext>
  );
};

export default TaskList;
