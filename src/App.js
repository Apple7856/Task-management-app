import React, { createContext, useEffect, useState } from "react";
import "./app.css";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import dummyData from "./mock-data/data.json";

export const DataFlowContext = createContext();

const App = () => {
  const [selectedTask, setSelectedTask] = useState({});
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const localData = localStorage.getItem("tasks");
    if (localData) {
      let data = JSON.parse(localData);
      data = data.map((item) => {
        if (item.id == selectedTask.id) {
          return selectedTask;
        } else {
          return item;
        }
      });
      setTaskData(data);
      let stringData = JSON.stringify(data);
      localStorage.setItem("tasks", stringData);
    } else {
      setTaskData(dummyData);
      let stringData = JSON.stringify(dummyData);
      localStorage.setItem("tasks", stringData);
    }
  }, [selectedTask]);

  return (
    <div className="container">
      <div className="header">
        <h3 className="heading">Task Management App with Drag-and-Drop</h3>
      </div>
      <DataFlowContext.Provider value={{ selectedTask, setSelectedTask }}>
        <div className="main-box">
          <TaskList taskData={taskData} />
          <TaskItem />
          <TaskForm />
        </div>
      </DataFlowContext.Provider>
    </div>
  );
};

export default App;
