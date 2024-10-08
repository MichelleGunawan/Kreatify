import React from "react";

// Custom components
import TodoItem from "./TodoItem";

import "./styles/index.scss";

interface Task {
  id: number;
  assignedBy: string;
  campaignName: string;
  dueDate: string;
  detail: string;
}

interface TodoProps {
  title: string;
  data: any[]; //TODO: replace Task[];
}

const TodoCard: React.FC<TodoProps> = ({ title, data }) => {
  return (
    <div className="todo-card">
      <div className="todo-card-header-container">
        <div className="h1 todo-card-header">{title}</div>
        <div className="p2 text-gray-400">3 todos</div>
      </div>

      <div className="todo-card-items-container">
        {data.map((task, index) => (
          <TodoItem key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
