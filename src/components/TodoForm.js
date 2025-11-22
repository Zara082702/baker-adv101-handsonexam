
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; 
    
    addTodo(input.trim());
    setInput(''); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '25px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ 
          padding: '10px', 
          flexGrow: 1, 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          outline: 'none'
        }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: '10px 15px', 
          border: 'none', 
          background: '#4CAF50', /* Green for creation */
          color: 'white', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;