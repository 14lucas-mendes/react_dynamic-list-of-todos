/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

const API_TODOS = 'http://localhost:5173/api/todos.json';
const API_USER = 'http://localhost:5173/api/users.json';

fetch(API_USER).then(response => response.json());

export const App: React.FC = () => {
  function getAll(): Promise<Todo[]> {
    return fetch(API_TODOS).then(response => response.json());
  }

  function getAllActive() {
    return getAll().then(todos =>
      todos.filter(todo => todo.completed === false),
    );
  }

  function getAllCompleted() {
    return getAll().then(todos =>
      todos.filter(todo => todo.completed === true),
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onClickAll={() => getAll}
                onClickHandlerActive={() => getAllActive}
                onClickHandlerCompleted={() => getAllCompleted}
              />
            </div>

            <div className="block">
              <Loader />
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
