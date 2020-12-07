import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';

function RenderNoteDetails({ note }) {
    if (note != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card className="text-center" style={{ backgroundColor: '#ADD8E6', borderColor: '#FFA500' }}>
                    <CardBody>
                        <CardTitle><h2>{note.name}</h2></CardTitle>
                        <CardText>{note.description}</CardText>
                    </CardBody>

                </Card>
            </div>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }
}


const Note = (props) => {

    const removeNote = () => {
        props.deleteNote(props.note._id);
        props.history.push('/notes');
        setInterval(() => {
            window.location.reload();

        }, 500);
    }

    if(props.isLoading) 
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );

    else if(props.errMess)
            return (
                <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
            );
    else if (props.note == null) return <div></div>
    else
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>{props.note.name}</h3>
                    <hr></hr>
                </div>
            </div>
            <div className="row">
                <RenderNoteDetails note={props.note} />
            </div>
            <div className="row">
                <div className="col-12 col-md-2 m-1"><Button className="btn btn-warning"><Link to={{
                    pathname: '/editNotes',
                    state: props.note
                }}>Edit</Link></Button></div>
                <div className="col-12 col-md-2 m-1"><Button className="btn btn-danger" onClick={removeNote}>Delete</Button></div>
            </div>
        </div>

    );
}


export default withRouter(Note);