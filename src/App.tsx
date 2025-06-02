/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]); // guarda a lista original
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(response => {
      setTodos(response);
      setOriginalTodos(response);
    });
  }, []);

  const filterByActive = () => {
    setTodos(originalTodos.filter(todo => !todo.completed));
  };

  const filterByCompleted = () => {
    setTodos(originalTodos.filter(todo => todo.completed));
  };

  const resetFilters = () => {
    setTodos(originalTodos);
  };

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = originalTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );

    setTodos(filtered);
  }, [query, originalTodos]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByActive={filterByActive}
                filterByCompleted={filterByCompleted}
                resetFilters={resetFilters}
                query={query}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              <Loader />
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
        <TodoModal />
      </div>
    </>
  );
};
