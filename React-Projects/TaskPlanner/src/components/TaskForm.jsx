import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };
  const tagSelected = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  //   console.log(taskData.tags);

  const handleTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const finalTags = taskData.tags.filter((item) => item != tag);
      setTaskData((prev) => {
        return { ...prev, tags: finalTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          value={taskData.task}
          required
          type="text"
          className="task_input"
          onChange={handleChange}
          placeholder="Enter the Task Name"
        ></input>
        <div className="task_form_bottom_line">
          <div>
            <Tag
              tagName="HTML"
              name="tags"
              selected={tagSelected("HTML")}
              handleTag={handleTag}
            />
            <Tag
              tagName="CSS"
              name="tags"
              selected={tagSelected("CSS")}
              handleTag={handleTag}
            />
            <Tag
              tagName="JavaScript"
              selected={tagSelected("JavaScript")}
              name="tags"
              handleTag={handleTag}
            />
            <Tag
              tagName="React"
              name="tags"
              selected={tagSelected("React")}
              handleTag={handleTag}
            />
          </div>
          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              {" "}
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
