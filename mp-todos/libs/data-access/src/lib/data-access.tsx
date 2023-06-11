import { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '@mp-todos/shared-types';
import axios from 'axios';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const api = axios.create({ baseURL: 'http://localhost:3333/api' });

  const getTodos = useCallback(async () => {
    await api.get<Todo[]>('').then((res) => setTodos(res.data));
  }, []);

  const addTodo = useCallback(async (text: string) => {
    await api
      .post('', {
        text,
      })
      .then(async () => {
        await getTodos();
      });
  }, []);

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

  return {
    todos,
    getTodos,
    addTodo,
    onToggle,
  };
}
