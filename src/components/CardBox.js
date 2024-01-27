import React, { useState } from "react";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import ModelBox from "./ModelBox";

const CardBox = ({ data, deleteTask, editTask, status }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-box">
      <div className="title-header">
        <h4 className="sub-heading">{data.title}</h4>
        <div className="icon">
          <img
            src={editIcon}
            onClick={() => setOpen(data.id)}
            alt="edit"
            className="img"
          />
          <img
            src={deleteIcon}
            onClick={() => deleteTask(data.id)}
            alt="edit"
            className="img"
          />
        </div>
      </div>
      <p className="para">{data.desc.slice(0, 50)}</p>
      <div className="status-bar">
        <p className="para">
          Status: {data.start}/{data.end}
        </p>
        <div className="progress-bar">
          <div
            className="complete-status"
            style={{ width: status + "%" }}
          ></div>
        </div>
      </div>
      <p className="para">Priority: {data.priority}</p>
      {open && (
        <ModelBox
          setOpen={setOpen}
          submitForm={editTask}
          data={data}
          isEdit={true}
          isRequired={false}
        />
      )}
    </div>
  );
};

export default CardBox;
