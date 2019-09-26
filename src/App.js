import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash'



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
      notes: [],
      note: {},
      newTag: false,
      error: ''
    };
  }
                                //In order to change the value of a comp. state, setState method will be used
                                  //since showNote is boolean, ! will reverse the T = F, F = T
                                  //toggleNote is used to change value of showNote
  toggleNote = () => {
    this.setState({
      showNote: !this.state.showNote,
      note: {}
    });
  }

  getNotes = () => {
              // 'notes/index'
    axios.get(urlFor('notes'))
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  } 

  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
    .then((res) => this.setState({note: res.data, showNote: true}))
    .catch((err) => console.log(err.response.data));
  }

  performSubmissionRequest = ( data, id) => {
    if (id) {
      return axios.patch(urlFor('notes/${id}'), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  }

  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
    .then((res) => this.setState({ showNote: false }))
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.content){
        this.setState({ error: "Missing Note Content!" });
      } else if (errors.title) {
        this.setState({  error: "Missing Note Title" })
      }
    });
  }

    deleteNote = (id) => {
      const newNotesState = this.state.notes.filter((note) => note.id !== id );
      axios.delete(urlFor(`notes/${id}`))
      .then((res) => this.setState({ notes: newNotesState }))
      .catch((err) => console.log(err.response.data) );
    }

    showTagForm = () => {
      this.setState({ newTag: true });
    }

    closeTagForm = () => {
      this.setState({ newTag: false });
    }

    submitTag = (data, noteId) => {
      axios.post(urlFor(`notes/${noteId}/tags`), data)
      .then((res) => this.getNote(noteId) )
      .catch((err) => {
        const {  errors } = err.response.data;
        if (errors.name){
          this.setState({ errors: "Missing Tag!" })
        }
      });
    }

    deleteTag = (noteId, id) => {
      axios.delete(urlFor(`/tags/${id}`))
      .then((res) => this.getNote(noteId)
      .catch((err) => console.log(err.response.data));
    }

    resetError = () => {
      this.setState({ error: ''  })
    }

   render(){
                                        //using object Destructuring, we made the indiv key accessable 
                                        //this.state.showNote = the method used and using showNote as the vari.
    const { showNote, notes, note, newTag, error } = this.state;
    //showNote === this.state.showNote
    //notes === this.state.notes

    return (
      <div className="App">
       <Nav toggleNote={this.toggleNote} showNote={showNote} />
       {error && <Flash error={error} resetError={this.resetError} />}
                                        {/* state = either (list out the notes) or (interact with 1 single note) */}
                                        {/* if showNote is T, run Note comp.,, if F, run List comp. */}
        { showNote ? 
        <Note 
        note={note}
        submitNote={this.submitNote}
        showTagForm={this.showTagForm}
        newTag={newTag}
        closeTagForm={this.closeTagForm}
        submitTag={this.submitTag}
        deleteTag={this.deleteTag}
        /> 
        :
         <List  
         getNotes={this.getNotes}
          notes={notes}
          getNote={this.getNote} 
          deleteNote={this.deleteNote} />
          }
      </div>
    );
  }
}

export default App;
