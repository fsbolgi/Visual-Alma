import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class FormControl extends Component {
    render() {
        let controlId = this.props.controlId;
        let controlLabel = this.props.controlLabel;
        let arrayOptions = this.props.arrayOptions;

        return (
            <Form.Group controlId={controlId}>
                <Form.Label>{controlLabel}</Form.Label>
                <Form.Control as="select">
                    {arrayOptions.map(op => (
                        <option value={op.val} key={op.val}>{op.name}</option>
                    )
                    )}
                </Form.Control>
            </Form.Group>

        );
    }

}

export default FormControl;