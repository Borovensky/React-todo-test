import ModeToggle from './ModeToggle';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';


const TodoInput = ({ todo, setTodo, addTodo }) => {

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      addTodo(e.target.value)
    }
  }

  const createButton = () => {
    return (
      <Button
        color='neutral'
        onClick={addTodo}
        variant='soft'
      >
        Add to list
      </Button>
    )
  }

  return (
    <Sheet
      sx={{
        width: 500,
        mx: 'auto',
        mt: 4,
        py: 3, 
        px: 2, 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderBottom: 1,
        position: 'sticky',
        top: 0,
        zIndex: 2,
      }}
      variant="soft"
    >
      <div>
        <ModeToggle />
        <Typography level="h4" component="h1">
          React Todo App
        </Typography>
        <Typography level="body-sm">Create todos easy.</Typography>
        <div style={{ marginTop: '24px' }}>
          <Input
            type='text'
            name='todo'
            value={todo}
            onChange={e => setTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type here...'
            endDecorator={createButton()}
          />
        </div>
      </div>
    </Sheet>
  );
}

export default TodoInput;