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
      .then((todos) => this.setState({todos}))
  }

  fetchTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => json.slice(0, 5))
  }

  addTaskHandler = () => {
    const todos = this.state.todos.slice();
    todos.push({
        id: 999,
        title: this.state.newTask
    })

    this.setState({todos})
  }

  changeInput = (e) => {
    this.setState({newTask: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <input 
            value={this.state.newTask}
            onChange={this.changeInput}
            type="text"
            placeholder="new task"
        />
        <button
            onClick={this.addTaskHandler}
            className="btn">
            Add
        </button>
        <ul>
          {this.state.todos.map((todo)=> 
            <Item key={todo.id} text={todo.title}/>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
