import React, {Component } from 'react';

class Nav extends Component {
  render(){
                                    //this.props will take the property from toggleNote in the Nav component, and making that valuye accessible 
    const { toggleNote, showNote } = this.props;

    return (
      <div className='nav-container'>
       <div className='nav-logo'>Note</div>
                                                                    {/* this onClick method will take the toggleNote and pass it thru App.js and that change the state */}
       <div className='nav-button' onClick={() => toggleNote()} >
        {showNote ? 'Cancel' : '+ Note' }
       </div>
      </div>  
    );
  }
}

export default Nav;