import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Todo = ({ item, toggleComplete, removeToDo }) => {
  return (
    <li>
      {item.title}
      <input
        type="checkbox"
        id={item.id}
        checked={item.complete}
        onChange={toggleComplete}
      />
      <label htmlFor={item.id} />
      <button onClick={removeToDo}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

const ToDoCount = ({ number }) => {
  return (
    <div>
      {number}
      {number > 1 || number === 0 ? ' Todos' : ' Todo'}
    </div>
  );
};

const ClearButton = ({ removeCompleted }) => {
  return <button onClick={removeCompleted}>Clear Completed</button>;
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [
        { id: 0, title: 'Learn React', complete: false },
        { id: 1, title: 'Try React', complete: false },
        { id: 2, title: 'Master React', complete: false }
      ],
      lastId: 0,
      inputValue: ''
    };
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(event) {
    event.preventDefault();
    const id = this.state.lastId + 1;
    if (this.toDoInput.value) {
      const newTodos = this.state.todos.concat({
        //Using old state and adding to it updating the state object
        id,
        title: this.toDoInput.value,
        // title: this.state.inputValue,
        complete: false
      });

      this.setState({
        todos: newTodos,
        lastId: id
      });
      this.toDoInput.value = '';
    }
  }

  toggleComplete(item) {
    let todos = this.state.todos.map(todo => {
      if (item.id === todo.id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    this.setState({ todos });
  }

  removeToDo(item) {
    let todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  }

  removeCompleted() {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  }

  hasCompleted() {
    let completed = this.state.todos.filter(todo => {
      return todo.complete;
    });
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    this.toDoInput.focus();
  }

  render() {
    return (
      <div className="todo-list">
        <h1>Todo App</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addTodo}>
            <input type="text" ref={input => (this.toDoInput = input)} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map((todo, i) => (
            <Todo
              key={i}
              item={todo}
              toggleComplete={this.toggleComplete.bind(this, todo)}
              removeToDo={this.removeToDo.bind(this, todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

export default App;

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.string.isRequired
};

Todo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  })
};
