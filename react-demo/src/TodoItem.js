import React,{Component} from 'react';

export default class TodoItem extends Component{
  // render(){
  //   return <div className='todoItem'>{this.props.todo.title}</div>
  // }
  render(){
    // const { todo }=this.props;
    // <label htmlFor='checkbox'>✔</label>
    return (
      <div className='checkboxWrapper'>
      <input id='checkbox' type="checkbox" checked={this.props.todo.status === 'completed'}
        onChange={this.toggle.bind(this)}/>
   
      <span className={`checkboxContent ${this.props.todo.status?'done' :''}`}> {this.props.todo.title}</span>
      <span className='delete' onClick={this.delete.bind(this)}>X</span>
      </div>
    )
  }
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }
  delete(e){
    this.props.onDelete(e,this.props.todo)
  }
}