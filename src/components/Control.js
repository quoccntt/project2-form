import React, { Component } from 'react';
import Seach from './Seach';
import Sort from './Sort';
class Control extends Component {
  render() {
    
return (
      <div>
         <div className="row mt-15">
            <Seach/>
           
             {/*Sort  */}
             <Sort/>
              </div>
      </div>
    );
  }
}

export default Control;