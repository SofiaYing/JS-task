import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      newTodo:'',
      todoList:[
        // {id:1,title:'第一个待办事项'},
        // {id:2,title:'第二个待办事项还没有开始做呢'}
      ]
    };
  }
render() {
  let todos = this.state.todoList.filter((item=>!item.deleted)).map((item,index)=>{
    return (
      <li key={`todoList${index}`}>
        <TodoItem todo={item} 
        onToggle={this.toggle.bind(this)}
        onDelete={this.delete.bind(this)}/>
      </li>
    )
  })
 
  
  return (
    <div className="App">
      <h1>记事本</h1>
      <div className="inputWrapper">
        <TodoInput content={this.state.newTodo} 
        onSubmit = {this.addTodoList.bind(this)} 
        onChange={this.changeTitle.bind(this)}/>
      </div>
      <ol className='todoWrapper'>
        {todos}
      </ol>
    </div>
  )
}
toggle(e, todo){
  todo.status = todo.status === 'completed' ? '' : 'completed'
  this.setState(this.state) 
  console.log(this.state);
}
delete(e,todo){
  todo.deleted = true;
  this.setState(this.state);
}
changeTitle(event){
  this.setState({
    newTodo:event.target.value,
    todoList:this.state.todoList
  })
}
addTodoList(event){
  this.state.todoList.push({
    id: idMaker(),
    title: event.target.value,
    status: null,
    deleted: false
  })
  this.setState({
    newTodo:'',
    todoList:this.state.todoList
  })
}


}

export default App;
let id = 0;
function idMaker() {
  id +=1;
  return id;
}