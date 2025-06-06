import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({ open, setOpen, todos }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {true ? (
        <Loader />
      ) : (
        todos.map(todo => (
          <div className="modal-card" key={todo.id}>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setOpen(false)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${todo.user?.email}`}>{todo.user?.name}</a>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
