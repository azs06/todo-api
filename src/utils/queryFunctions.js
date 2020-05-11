import { pool } from '../models/pool';
import {
  insertTodo,
  dropTodoTable,
  createTodoTable,
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const dropTables = () => executeQueryArray([ dropTodoTable ]);
export const createTables = () => executeQueryArray([ createTodoTable ]);
export const insertIntoTables = () => executeQueryArray([ insertTodo ]);