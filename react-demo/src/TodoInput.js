import React,{Component}from 'react';

export default class TodoInput extends Component{
  render(){
    return <input className='input' type='text' 
    value={this.props.content} 
    //defaultValue，只会影响 input 的第一次值，后面 newTodo 怎么变，都不会影响 input。
    onKeyPress = {this.submit.bind(this)}
    onChange = {this.changeTitle.bind(this)} />
  }
  submit(e){
    if(e.key === 'Enter'){
      this.props.onSubmit(e);
    }
  }
  changeTitle(e){
    this.props.onChange(e);
  }
  
}