import React, { useState } from "react";
import close from "../assets/close.png";

const ModelBox = ({ setOpen, submitForm, data, isEdit, isRequired }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    desc: data.desc || "",
    start: data.start || "",
    end: data.end || "",
    priority: data.priority || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updateData = formData;
    data.id && (updateData["id"] = data.id);
    submitForm(updateData);
    setFormData({
      ...formData,
      title: "",
      desc: "",
      start: 0,
      end: 0,
      priority: "",
    });
    setOpen(false);
  };
  return (
    <div className="modal-box">
      <div className="modal-content">
        <div className="title-header">
          <h4 className="sub-heading">Task {isEdit ? "Edit" : "Create"}</h4>
          <img
            src={close}
            onClick={() => setOpen(false)}
            alt="close"
            className="img"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              autoComplete="off"
              maxLength={20}
              minLength={3}
              placeholder="Add your project name..."
              required
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="desc"
              value={formData.desc}
              cols={2}
              maxLength={50}
              placeholder="describe your project..."
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start:
            <input
              type="number"
              name="start"
              value={formData.start}
              autoComplete="off"
              maxLength={2}
              minLength={1}
              required={isRequired}
              disabled={!isRequired}
              onChange={handleChange}
            />
          </label>
          <label>
            End:
            <input
              type="number"
              name="end"
              value={formData.end}
              autoComplete="off"
              maxLength={2}
              minLength={1}
              required={isRequired}
              disabled={!isRequired}
              onChange={handleChange}
            />
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={formData.priority}
              required
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModelBox;
