import React, { Component } from 'react';
import { Row, Col, Button, Form ,Label, FormGroup, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class PostNote extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.postNote(this.note.value);
        console.log(this.note.value)
        event.preventDefault();
        this.props.history.push('/notes');
        setInterval(() => {
            window.location.reload();

        }, 1000);
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
                    <Button type="submit" value="submit" color="primary">Add</Button>
                    </Form>
            </div>
        );
    }
}

export default withRouter(PostNote);
