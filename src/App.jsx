import { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import LocalStorageUtil from './storage';

const App = () => {
  const [todos, setTodos] = useState(LocalStorageUtil.getItem('todos'));
  const [todo, setTodo] = useState('');

  useEffect(() => {
    LocalStorageUtil.setItem('todos', todos);
  }, [todos]);
  
  const addTodo = () => {
    if (todo !== '') {
      const todoItem = { id: Math.random().toString(), value: todo, active: true };
      setTodos([...todos, todoItem]);
      setTodo('');
    }
  }

  const deleteTodo = id => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos([...filteredTodos]);
  }

  const toggleStatus = todo => {
    const findIndex = todos.findIndex(item => item.id === todo.id);
    todos[findIndex] = todo;
    setTodos([...todos]);
  }

  const onUpdateTodo = (value, id) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, value } : todo))
  }

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  }

  const onDragOver = e => {
    e.preventDefault();
  }

  const onDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex');
    const itemDragged = todos[dragIndex];
    const updatedTodos = [...todos];
    updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(dropIndex, 0, itemDragged);
    setTodos(updatedTodos);
  }

  return (
    <CssVarsProvider>
      <CssBaseline />
        <TodoInput 
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
        />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleStatus={toggleStatus}
          onUpdateTodo={onUpdateTodo}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
    </CssVarsProvider>
  );
}

export default App;