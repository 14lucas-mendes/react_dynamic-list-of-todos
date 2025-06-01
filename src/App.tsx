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

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByActive={() => filterByActive}
                filterByCompleted={() => filterByCompleted}
                resetFilters={() => resetFilters}
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
