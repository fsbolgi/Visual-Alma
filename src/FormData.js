import React, { Component } from 'react';
import FormControl from "./FormControl";
import { Container, Button, Form } from 'react-bootstrap';

class FormData extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        let anno = event.currentTarget.formAnno.value;
        let ateneo = event.currentTarget.formAteneo.value;
        console.log(anno);
        console.log(ateneo);
    }

    render() {
        let myVal = this.props.name + this.props.value;
        return (
            <Form onSubmit ={this.submitForm}>
                <FormControl
                    controlId="formAnno"
                    controlLabel="ANNO"
                    arrayOptions={[2017, 2016, 2015, 2014, 2013]} />

                <FormControl
                    controlId="formAteneo"
                    controlLabel="ATENEO"
                    arrayOptions={["Bari", "Firenze", "Milano", "Pisa", "Torino"]} />

                <Button variant="primary" type="submit">
                    Submit
                    </Button>
            </Form>);
    }

}

export default FormData;