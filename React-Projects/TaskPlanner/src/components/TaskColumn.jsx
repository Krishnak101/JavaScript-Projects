import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";
const TaskColumn = ({
  imageLogo,
  taskStatus,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  return (
    <div className="task_column">
      <div>
        <h2 className="task_column_heading">
          <img className="task_column_icon" src={imageLogo} alt=""></img>
          {taskStatus}
        </h2>
      </div>
      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment>
              <TaskCard
                key={index}
                title={task.task}
                tags={task.tags}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              ></TaskCard>
              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
    </div>
  );
};

export default TaskColumn;
