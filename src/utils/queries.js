export const createTodoTable = `
DROP TABLE IF EXISTS todo_items;
CREATE TABLE IF NOT EXISTS todo_items (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  added_date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN DEFAULT FALSE
  )
  `;

export const insertTodo = `
INSERT INTO todo_items(description, completed)
VALUES ('Take a walk', false),
      ('Cooke dinner', false)
`;

export const dropTodoTable = 'DROP TABLE todo_items';
