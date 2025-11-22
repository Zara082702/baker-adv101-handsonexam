
import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
// Corrected paths for your file structure
import TodoForm from '../components/TodoForm'; 
import TodoItem from '../components/TodoItem';
import FilterTabs from '../components/FilterTabs';

// Helper function to safely read from browser's localStorage
const loadTodos = () => {
  if (typeof window !== 'undefined') {
    const storedTodos = localStorage.getItem('next-todo-list');
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
  return [];
};

// Helper function to safely write to browser's localStorage
const saveTodos = (todos) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('next-todo-list', JSON.stringify(todos));
  }
};

export default function Home() {
  
  const [todos, setTodos] = useState([]); 
  
  const [filter, setFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [isMounted, setIsMounted] = useState(false); 

  
  useEffect(() => {
   
    setTodos(loadTodos());
  
    setIsMounted(true); 
  }, []); 

 
  useEffect(() => {
    
    if (isMounted) { 
        saveTodos(todos);
    }
  }, [todos, isMounted]); 

 
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), 
      text,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]); 
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  
  const filteredAndSearchedTodos = useMemo(() => {
    let result = todos;

    if (filter === 'active') {
      result = result.filter(todo => !todo.isCompleted);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.isCompleted);
    }

    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(todo => 
        todo.text.toLowerCase().includes(lowerCaseSearch)
      );
    }

    return result;
  }, [todos, filter, searchTerm]); 

  return (
    <div 
      style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: '40px auto', 
        backgroundColor: 'white', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <Head>
        <title>Next.js Simple To-Do App</title>
      </Head>

      <h1 style={{ textAlign: 'center', color: '#000000ff', marginBottom: '30px', borderBottom: '2px solid #e0e0e0', paddingBottom: '10px' }}>
        Plan Better. Do More!
      </h1>
      
      <TodoForm addTodo={addTodo} />
      
      <FilterTabs currentFilter={filter} setFilter={setFilter} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          padding: '10px', 
          width: '100%', 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          outline: 'none'
        }}
      />

      <h2 style={{ borderBottom: '2px solid #1a73e8', paddingBottom: '5px', color: '#ca31f0ff', fontSize: '1.2em' }}>
        {filter === 'active' ? 'Tasks To Do' : 
         filter === 'completed' ? 'Completed Tasks' : 'All Tasks'}
      </h2>

      <div style={{ paddingTop: '10px' }}>
        {/* Only render the list content once the client is mounted */}
        {isMounted ? (
            filteredAndSearchedTodos.length > 0 ? (
                filteredAndSearchedTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                ))
            ) : (
                <p style={{ color: '#888', textAlign: 'center' }}>
                    {searchTerm ? 'No search results found.' : 'No tasks to display in this view.'}
                </p>
            )
        ) : (
            // Simple placeholder while loading
            <p style={{ color: '#888', textAlign: 'center' }}>Loading tasks...</p>
        )}
      </div>
    </div>
  );
}