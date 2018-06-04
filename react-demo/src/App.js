import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      newTodo:'test',
      todoList:[
        {id:1,title:'第一个待办事项'},
        {id:2,title:'第二个待办事项'}
      ]
    };
  }
render() {
  let todos = this.state.todoList.map((item,index)=>{
    return (
      <li key={`todoList${index}`}>
        <TodoItem todo={item} />
      </li>
    )
  })

  return (
    <div className="App">
      <h1>记事本</h1>
      <div className="inputWrapper">
        <TodoInput content={this.state.newTodo}/>
      </div>
      <ol>
        {todos}
      </ol>
    </div>
  )
}
}

export default App;
