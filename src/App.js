import React, { Component } from 'react';

import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      tasks: [] ,
      isDisplayForm : false,
      taskEditing:null
    }
  }
  
  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }
  

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  ganerateID(){
    return this.s4() + this.s4() + '-' + this.s4() +'-' + this.s4()  + this.s4() + this.s4() + this.s4();
  
  }  
  toggleForm = () =>{
    this.setState({
    isDisplayForm : !this.state.isDisplayForm  
  });
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }
  onSubmit = (data) => {
    var {tasks} = this.state; // tasks = this.state.tasks
    data.id = this.ganerateID();
    tasks.push(data);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onUpdateStatus= (id) => {
    var {tasks} = this.state;
      var index = this.findIndex(id);
   
      if (index !== -1){
        tasks[index].status = !tasks[index].status;  
        this.setState({
          tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
  }
 

  findIndex = (id) =>{
     var {tasks } = this.state;
     var Reault = -1;
    tasks.forEach((task , index) =>{
      if(task.id === id){
         Reault = index;
      }
    
  });

  return Reault;
}
 onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1){
        tasks.splice(index, 1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onUpdate = (id) => {
    console.log(id);
  }
  render() {
    var {tasks, isDisplayForm} = this.state;
    var elmTaskForm = isDisplayForm 
    ? <TaskForm 
      onSubmit = {this.onSubmit}
    onCloseForm={ this.onCloseForm}/> : '';
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>

          <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
              {/* form */}
          {elmTaskForm}
            </div>
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button 
              onClick={this.toggleForm}
              type="button"
               className="btn btn-primary">
                <span className="fas fa-window-close mr-5" />Thêm Công Việc
          </button>

              {/* search && sort */}
              <Control />
              {/* List */}
              <TaskList  tasks ={ tasks} 
              onDelete = {this.onDelete}
              onUpdateStatus = {this.onUpdateStatus} 
              onUpdate={this.onUpdate}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;