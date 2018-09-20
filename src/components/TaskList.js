import React, { Component } from 'react';

import TaskItem from './TaskItem';

class TaskList extends Component {

  render() {
    var { tasks } = this.props;
    var elmTask = tasks.map((task, index) => {
      return <TaskItem 
      key={task.id}
       index={index + 1} 
       task={task}
       onDelete={this.props.onDelete}
       onUpdate={this.props.onUpdate}
       onUpdateStatus={this.props.onUpdateStatus}
       />
    });

    return (
      <div>
        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Tên</th>
                  <th className="text-center">Trạng Thái</th>
                  <th className="text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td />
                  <td>
                    <input type="text" className="form-control" name="filterName" /></td>
                  <td>
                    <select className="form-control" name="filterStatus">
                      <option value={-1}>Tất Cả</option>
                      <option value={0}>Ẩn</option>
                      <option value={1}>Kích Hoạt</option>
                    </select></td>
                  <td />
                </tr>
                {elmTask}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;