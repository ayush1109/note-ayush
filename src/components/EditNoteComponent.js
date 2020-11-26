import React, { Component } from 'react';
import { Row, Col, Button, Form ,Label, FormGroup ,Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class EditNote extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleSubmit(event) {
        
        this.props.putNote(this.note.value, this.props.location.state._id);
        event.preventDefault();
        this.props.history.push('/notes');
        setInterval(() => {
            window.location.reload();

        }, 100);
    }

    render() {
        return (
            <div className="container">
                 <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="note">Note</Label>
                        <Input type="text" id="note" name="note"
                            innerRef={(input) => this.note = input} />
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Edit</Button>
                    </Form>
            </div>
        );
    }
}

export default withRouter(EditNote);
