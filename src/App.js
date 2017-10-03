import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Todo = ({ item }) => {
  return (
    <li>
      {item.title}
      <input type="checkbox" id={item.id} checked={item.complete} />
      <label htmlFor={item.id} />
      <button>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

const ToDoCount = ({ number }) => {
  return <div>{number > 1 || number === 0 ? 'todos' : 'todo'}</div>;
};

const ClearButton = ({ removeCompleted }) => {
  //props.removeCompleted
  return <button onClick={removeCompleted}>Remove</button>;
};

class App extends Component {
  render() {
    //const todos = ['Learn React', 'React is fun'];
    const todos = [{ id: 0, title: 'Learn React', complete: false }];
    return (
      <div className="todo-list">
        <h1>Todo App</h1>
        <ul>{todos.map((todo, i) => <Todo key={i} item={todo} />)}</ul>
        <div className="todo-admin">
          <ToDoCount number={12} />
          <ClearButton removeCompleted={'I am a string'}>Hi There </ClearButton>
        </div>
      </div>
    );
  }
}

export default App;

() => {
  return console.log('Hello');
};

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
