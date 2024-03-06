import { useState } from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const TodoList = ({ todos, deleteTodo, toggleStatus, onUpdateTodo, onDragStart, onDragOver, onDrop }) => {
  const [filteredValue, setFilteredValue] = useState('All');

  const toggleTodoStatusButton = todo => (
    <IconButton aria-label="Add" size="sm" variant="plain" color="neutral">
      {todo.active
        ? <CheckBoxOutlineBlankIcon onClick={() => toggleStatus(todo.active = !todo.active)}/>
        : <CheckBoxIcon onClick={() => toggleStatus(todo.active = !todo.active)}/>
      }
    </IconButton>
  )

  const deleteTodoButton = id => (
    <IconButton aria-label="Delete" size="sm" color="danger">
      <Delete onClick={() => deleteTodo(id)} />
    </IconButton>
  )

  const handleFilter = (e, value) => {
    setFilteredValue(value)
  }

  const renderStatusSwither = () => {
    return (
      <div style={{ display: 'flex', padding: '8px 8px 0' }}>
        <Select defaultValue="All" onChange={handleFilter} sx={{ height: 36 }}>
          <Option value="All">All</Option>
          <Option value={true}>Active</Option>
          <Option value={false}>Completed</Option>
        </Select>
      </div>
    )
  }

  const renderList = () => (
    <>
      {renderStatusSwither()}
      <List>
        {todos
          .filter(todo => (typeof filteredValue !== 'string' ? todo.active === filteredValue : todo))
          .map((todo, index) => (
            <ListItem
              key={todo.id}
              sx={{
                border: .5,
                m: 1,
                p: 0,
                borderRadius: 5,
              }}
              variant='soft'
              draggable
              onDragStart={e => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, index)}
              startAction={toggleTodoStatusButton(todo)}      
              endAction={deleteTodoButton(todo.id)}
            >
              <Input
                type='text'
                variant='soft'
                sx={{
                  borderRadius: 5,
                  px: 5,
                  width: '100%'
                }}
      
                value={todo.value}
                onChange={e => onUpdateTodo(e.target.value, todo.id)}
              />
            </ListItem>
          ))}
      </List>
    </>
  );

  const renderStub = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p>No todos yet.</p>
    </div>
  );

  return (
    <Sheet
      sx={{
        width: 500,
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
      }}
      variant="soft"
    >
      {todos && todos.length > 0 ? renderList() : renderStub()}
    </Sheet>
  );
}

export default TodoList;