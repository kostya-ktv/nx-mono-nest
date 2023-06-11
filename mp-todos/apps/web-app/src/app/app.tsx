import { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '@mp-todos/shared-types';
import axios from 'axios';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const api = axios.create({ baseURL: 'http://localhost:3333/api' });
  const textInputRef = useRef<HTMLInputElement>(null);

  const getTodos = useCallback(async () => {
    await api.get<Todo[]>('').then((res) => setTodos(res.data));
  }, []);

  const addTodo = useCallback(async () => {
    if (textInputRef.current) {
      await api
        .post('', {
          text: textInputRef.current!.value,
        })
        .then(async () => {
          textInputRef.current!.value = '';
          await getTodos();
        });
    }
  }, [textInputRef]);

  const onToggle = useCallback(
    async (id: number) => {
      const done = todos.find((todo) => todo.id === id)?.done;
      console.log(done);
      await api
        .post('setDone', {
          id,
          done: !done,
        })
        .then(async () => await getTodos());
    },
    [todos]
  );

  useEffect(() => {
    void getTodos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={() => onToggle(todo.id)}
            />
            {todo.text}
          </div>
        ))}
      </div>
      <div>
        <input ref={textInputRef} />
      </div>

      <button onClick={addTodo}>Add todo</button>
    </div>
  );
}

export default App;
