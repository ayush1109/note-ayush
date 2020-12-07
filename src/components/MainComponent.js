import React, { Component } from 'react';
import Footer from './footerComponent';
import Header from './headerComponent';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNotes, postNote, deleteNote, putNote, loginUser, logoutUser, signupUser } from '../redux/ActionCreators';
import Notes from './notesComponent';
import NoteDetail from './NoteDetailComponent';
import PostNote from './postNoteComponent';
import EditNote from './EditNoteComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
const mapStateToProps = state => {
    return {
      notes: state.notes,
      auth: state.auth
    }
  }


const mapDispatchtoProps = dispatch => ({
    postNote: (note, description) => { dispatch(postNote(note, description)) },
    signupUser: (creds) => dispatch(signupUser(creds)),
    deleteNote: (noteId) => { dispatch(deleteNote(noteId))},
    putNote: (note, noteId) => { dispatch(putNote(note, noteId))},
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchNotes: () => { dispatch(fetchNotes()) }
})

class Main extends Component {
    constructor(props) {
        super(props);
    
      }
    
      componentDidMount() {
        this.props.fetchNotes();
      }
    render() {

        const noteWithId = ({ match }) => {
            return (
                <NoteDetail note={this.props.notes.notes.filter((note) => note._id === match.params.noteId)[0]}
                isLoading={this.props.notes.isLoading}
                errMess={this.props.notes.errMess}
                deleteNote={this.props.deleteNote}
                />
            );
        }

        const note = () => {
          return (
            this.props.auth.isAuthenticated
            ?
            <Notes notes={this.props.notes}></Notes>
            :
            <div className="container">Login to see your notes</div>
          );
        }

        return (
            <div>
                <Header logoutUser={this.props.logoutUser}/>
                <Switch>
                <Route exact path="/notes" component={note}></Route>
                <Route path="/note/:noteId" component={noteWithId}></Route>
                <Route path="/postNotes" component={() => <PostNote postNote={this.props.postNote} />}></Route>
                <Route path="/editNotes" component={() => <EditNote putNote={this.props.putNote} />}></Route>
                <Route path="/login" component={() => <Login loginUser={this.props.loginUser}></Login>}></Route>
                <Route path="/signup" component={() => <Signup signupUser={this.props.signupUser}></Signup>}></Route>
                <Redirect to="/notes"></Redirect>
                </Switch>
                <Footer/>
            </div>
        );
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));