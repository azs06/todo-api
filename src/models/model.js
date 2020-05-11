import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    console.log(query)
    return this.pool.query(query);
  }
  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }
  async updateWithReturn(id, data) {
    const query = [`UPDATE ${this.table}`];
    query.push('SET');
    // Create another array storing each set command
    // and assigning a number value for parameterized query
    const set = [];
    Object.keys(data).forEach(function (key, i) {
      set.push(key + ' = ($' + (i + 1) + ')'); 
    });
    query.push(set.join(', '));
    // Add the WHERE statement to look up by id
    query.push('WHERE id = ' + id );
    query.push('RETURNING *');
    // Return a complete query string
    const sqlQuery =  query.join(' ');
    const values = Object.values(data)
    console.log(sqlQuery, values)
    return this.pool.query(sqlQuery, values)
  }
 
  async deleteTodo(id) {
    const query = `DELETE FROM ${this.table} WHERE id = $1`
    return this.pool.query(query, [id])
  }

  async selectTodo(columns, id) {
    return this.select(columns, ` WHERE id = ${id}`)
  }

}

export default Model;
