import { useCallback, useEffect, useRef } from 'react';
import { useTodos } from '@mp-todos/data-access';

export function App() {
  const { addTodo, getTodos, onToggle, todos } = useTodos();

  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await addTodo(textInputRef.current!.value);
    }
  }, [textInputRef]);

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

      <button onClick={onAddTodo}>Add todo</button>
    </div>
  );
}

export default App;
