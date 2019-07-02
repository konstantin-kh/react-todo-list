import React, {Component} from 'react';
import './App.css';
import Item from './Item'

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      todos: [],
      newTask: ''
    }
  }
  
  componentDidMount() {
    this.fetchTodos()
      .then((todos) => this.setState({todos}));
  }

  fetchTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => json.slice(0, 5));
  }

  getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  addTask = () => {
    const todos = this.state.todos.slice();
    const lastId = this.getRandomId(this.state.todos.length, this.state.todos.length * 100);
    
    todos.push({
        id: lastId,
        title: this.state.newTask
    });

    this.setState({
      todos,
      newTask: ''
    });
  }

  onRemove = (index) => {
    const todos = this.state.todos.slice();

    todos.splice(index, 1);
    this.setState({todos: [...todos]});
  }

  onChangeInput = (e) => {
    this.setState({newTask: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <input 
            value={this.state.newTask}
            onChange={this.onChangeInput}
            type="text"
            placeholder="new task"
        />
        <button 
          disabled={!this.state.newTask}
          onClick={this.addTask}
          className="btn">
            Add
        </button>
        <ul>
          {this.state.todos.map((todo, index)=> 
            <Item
              onRemove={() => this.onRemove(index)}
              key={todo.id} text={todo.title}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;