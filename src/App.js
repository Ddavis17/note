import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';
                                          //App is child to React.Component
 class App extends Component {
  constructor(){
                                          //calling super method allows us to use this keyword, initializes it
    super();
                                          //state is the data that changes. whenever the state changes, 
                                          //React will call the render method on the comp. and apply changes
    this.state = {
                                          //React will render Note comp if true, List comp. if false
      showNote: false,
      notes: []
    };
  }
                                //In order to change the value of a comp. state, setState method will be used
                                  //since showNote is boolean, ! will reverse the T = F, F = T
                                  //toggleNote is used to change value of showNote
  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote
    });
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  } 

   render(){
                                        //using object Destructuring, we made the indiv key accessable 
                                        //this.state.showNote = the method used and using showNote as the vari.
    const { showNote, notes } = this.state;

    return (
      <div className="App">
       <Nav toggleNote={this.toggleNote} showNote={showNote} />
                                        {/* state = either (list out the notes) or (interact with 1 single note) */}
                                        {/* if showNote is T, run Note comp.,, if F, run List comp. */}
      { showNote ? <Note /> : <List  getNotes={this.getNotes} /> } 
      </div>
    );
  }
}

export default App;
