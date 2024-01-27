import React, { useContext, useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { DragDropContext } from "react-beautiful-dnd";
import { DataFlowContext } from "../App";

const TaskForm = () => {
  const [startData, setStartData] = useState([]);
  const [inProgressData, setInProgressData] = useState([]);
  const [completeData, setCompleteData] = useState([]);

  const { selectedTask, setSelectedTask } = useContext(DataFlowContext);

  useEffect(() => {
    let start = {
      high: [],
      medium: [],
      low: [],
    };
    let inProgress = {
      high: [],
      medium: [],
      low: [],
    };
    let complete = {
      high: [],
      medium: [],
      low: [],
    };
    if (selectedTask.category) {
      for (let value of selectedTask.category) {
        if (!value.start) {
          if (value.priority === "high") {
            start = { ...start, high: [...start.high, value] };
          } else if (value.priority === "medium") {
            start = { ...start, medium: [...start.medium, value] };
          } else {
            start = { ...start, low: [...start.low, value] };
          }
        } else if (value.start !== value.end) {
          if (value.priority === "high") {
            inProgress = { ...inProgress, high: [...inProgress.high, value] };
          } else if (value.priority === "medium") {
            inProgress = {
              ...inProgress,
              medium: [...inProgress.medium, value],
            };
          } else {
            inProgress = { ...inProgress, low: [...inProgress.low, value] };
          }
        } else {
          if (value.priority === "high") {
            complete = { ...complete, high: [...complete.high, value] };
          } else if (value.priority === "medium") {
            complete = { ...complete, medium: [...complete.medium, value] };
          } else {
            complete = { ...complete, low: [...complete.low, value] };
          }
        }
      }
    }
    setStartData([...start.high, ...start.medium, ...start.low]);
    setInProgressData([
      ...inProgress.high,
      ...inProgress.medium,
      ...inProgress.low,
    ]);
    setCompleteData([...complete.high, ...complete.medium, ...complete.low]);
    // setSelectedTask({
    //   ...selectedTask,
    //   start: [...complete.high, ...complete.medium, ...complete.low].length,
    // });
  }, [selectedTask]);

  const reOrder = (list, startIndex, endIndex, isCompleted) => {
    let temp = list[endIndex];
    list[endIndex] = list[startIndex];
    list[startIndex] = temp;
    if (!isCompleted) {
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
    }
    setSelectedTask({ ...selectedTask, start: list.length });
    return list;
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "task-form-1") {
        setStartData(
          reOrder(startData, source.index, destination.index, false)
        );
      } else if (source.droppableId === "task-form-2") {
        setInProgressData(
          reOrder(inProgressData, source.index, destination.index, false)
        );
      } else if (source.droppableId === "task-form-3") {
        setCompleteData(
          reOrder(completeData, source.index, destination.index, true)
        );
      }
      return;
    }

    if (source.droppableId === "task-form-1") {
      setStartData(removeItemById(draggableId, startData));
    } else if (source.droppableId === "task-form-2") {
      setInProgressData(removeItemById(draggableId, inProgressData));
    } else if (source.droppableId === "task-form-3") {
      setCompleteData(removeItemById(draggableId, completeData));
    }
    const task = findItemById(draggableId, [
      ...startData,
      ...inProgressData,
      ...completeData,
    ]);
    if (destination.droppableId === "task-form-1") {
      setStartData([...startData, task]);
    } else if (destination.droppableId === "task-form-2") {
      setInProgressData([...inProgressData, task]);
    } else if (destination.droppableId === "task-form-3") {
      setCompleteData([...completeData, task]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="sub-box-1 wrapper">
        <h3 className="sub-heading">Task Form</h3>
        <div className="sub">
          <Wrapper heading="Start" data={startData} id="task-form-1" />
          <Wrapper
            heading="In progress"
            data={inProgressData}
            id="task-form-2"
          />
          <Wrapper heading="Complete" data={completeData} id="task-form-3" />
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskForm;
