import Model from '../models/model';

const todoItemsModel = new Model('todo_items');


export const addTodo = async (req, res) => {
  const { description, completed } = req.body;
  const columns = 'description, completed';
  const values = `'${description}', '${completed}'`;
  try {
    const data = await todoItemsModel.insertWithReturn(columns, values);
    res.status(200).json({ data: data.rows });
  } catch (err) {
    res.status(200).json({ data: err.stack });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params
  const body = req.body
  try {
    const data = await todoItemsModel.updateWithReturn(id, body)
    res.status(200).json({data: data.rows})
  } catch (err) {
    res.status(200).json({ data: err.stack })
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params
  try {
    const data = await todoItemsModel.deleteTodo(id)
    res.status(200).json('successfully deleted')
  }catch(err){
    res.status(200).json({data: err.stack})
  }
}

export const todosPage = async (req, res) => {
  try {
    const data = await todoItemsModel.select('description, added_date, completed');
    res.status(200).json({ todos: data.rows });
  } catch (err) {
    res.status(200).json({ data: err.stack });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params
  try {
    const data = await todoItemsModel.selectTodo('description, added_date, completed', id)
    res.status(200).json({todo: data.rows})
  } catch(err) {
    res.status(200).json({ data: err.stack });
  }
}