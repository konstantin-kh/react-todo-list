import React, {Component} from 'react';
import './App.css';
import Item from './Item'

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      todos: []
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

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.todos.map((todo)=> 
            <Item text={todo.title}/>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
