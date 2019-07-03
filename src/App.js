import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Input, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './App.css';
// import Item from './Item'

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   input: {
//     margin: theme.spacing(1),
//   },
// }));

// const classes = useStyles();

class App extends Component {
  state = {
    todos: [],
    newTask: ''
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
      <List component="nav">
        {this.state.todos.map((todo, index) => {
          return (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.title} />
                <ListItemSecondaryAction>
                  <IconButton onClick={()=> this.onRemove(index)}
                     edge="end" aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          )
        })}
      </List>
     
        <Input
          value={this.state.newTask}
          // className={classes.input}
          onChange={this.onChangeInput}
          placeholder="New task"
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Button variant="contained" color="primary" 
          disabled={!this.state.newTask}
          onClick={this.addTask}
        >
            Add task
        </Button>
      </div>
    );
  }
}

export default App;