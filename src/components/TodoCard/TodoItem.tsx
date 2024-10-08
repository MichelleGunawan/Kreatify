"use client";
import React, { useState } from "react";
import Separator from "../Separator";
import "./styles/TodoItem.scss";

interface TodoTask {
  id: number;
  assignedBy: string;
  campaignName: string;
  dueDate: string;
  detail: string;
}

interface TodoItemProps {
  task: TodoTask;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const [status, setStatus] = useState("pending"); //pending || complete

  return (
    <div className="todo-item">
      <div className="h1 text-black">Campaign Name</div>
      <div className="todo-item-details-container">
        <div className="p2 text-black">task details</div>
      </div>

      <Separator />
      <div className="todo-item-footer">
        <div className="p2 text-black">Due date</div>
        <div className="todo-item-due-date-container">
          <div className="p2 todo-item-due-date">June 1st 2024</div>
        </div>
      </div>
      <div
        className={`todo-item-button ${status}`}
        onClick={() => {
          status == "complete" ? setStatus("pending") : setStatus("complete");
        }}
      >
        <div className="p2 todo-item-text">
          {status == "pending" ? "Complete" : "Completed"}
        </div>
      </div>
      {/* <div className="p2 todo-item-see-more">See more</div> */}
    </div>
  );
};

export default TodoItem;
