import React from 'react';
import Loading from './LoadingComponent';
import { Card, CardText, CardTitle, CardImg, CardSubtitle, CardBody, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderNotes({ note }) {
    return (


        <Card body inverse style={{ backgroundColor: '#FFFF00', borderColor: '#FFA500' }}>
            <Link to={`/note/${note._id}`}>
            <CardBody>
                    <CardTitle><h2>{note.name}</h2></CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                    <CardText>Some quick example text.</CardText>
                </CardBody>
            </Link>
        </Card>
    );
}


const Notes = (props) => {
    const notes = props.notes.notes.map((note) => {
        return (
            <div key={note._id} className="col-12 col-md-4 m-1">
                <RenderNotes note={note}
                />
            </div>
        );
    });

    if (props.notes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.notes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.notes.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Notes</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className="row">
                    {notes}
                </div>
            </div>
        );
}



export default Notes;