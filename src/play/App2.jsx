import List from './list';
import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <input
        placeholder='type here'
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <List />
    </>
  );
}

export default App;