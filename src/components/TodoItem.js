// src/components/TodoItem.js

import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      updateTodo(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        margin: '10px 0', 
        border: todo.isCompleted ? '1px solid #d4edda' : '1px solid #eee',
        padding: '12px', 
        borderRadius: '6px',
        backgroundColor: todo.isCompleted ? '#e9f7ef' : 'white', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Task Text Display or Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleUpdate(); 
          }}
          autoFocus
          style={{ flexGrow: 1, padding: '5px', marginRight: '10px', border: '1px solid #1a73e8' }}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.isCompleted ? 'line-through' : 'none',
            flexGrow: 1, 
            cursor: 'pointer',
            padding: '5px',
            color: todo.isCompleted ? '#888' : '#333',
            fontSize: '1.1em'
          }}
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.text}
        </span>
      )}

      {/* Action Buttons Container */}
      <div style={{ display: 'flex', gap: '5px' }}>
        
        {/* Toggle Complete Button */}
        <button 
          onClick={() => toggleComplete(todo.id)}
          style={{ 
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            background: todo.isCompleted ? '#ff9800' : '#007bff', 
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        >
          {todo.isCompleted ? 'Undone' : 'Complete'}
        </button>
        
        {/* Edit Button */}
        <button 
          onClick={() => setIsEditing(true)} 
          disabled={isEditing} 
          style={{ 
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            background: '#ffc107', 
            color: '#333',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        >
          Edit
        </button>
        
        {/* Delete Button */}
        <button 
          onClick={() => deleteTodo(todo.id)} 
          style={{ 
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            background: '#dc3545', 
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;