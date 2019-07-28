import React, { Component } from 'react';
import FormControl from "./FormControl";
import { Container, Button, Form } from 'react-bootstrap';
import { getAlmalaureaData } from './get.js';
import { get } from 'http';
import {getExampleData} from './getExampleData.js'

class FormData extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        let anno = event.currentTarget.formAnno.value;
        let ateneo = event.currentTarget.formAteneo.value;
        // getAlmalaureaData({"anno": anno, "ateneo": ateneo});
        console.log(getExampleData())
    }

    render() {
        let myVal = this.props.name + this.props.value;
        return (
            <Form onSubmit ={this.submitForm}>
                <FormControl
                    controlId="formAnno"
                    controlLabel="ANNO"
                    arrayOptions={[
                        { name: 2018, val: 2018},
                        { name: 2017, val: 2017},
                        { name: 2016, val: 2016},
                        { name: 2015, val: 2015},
                        { name: 2014, val: 2014}]} />

                <FormControl
                    controlId="formAteneo"
                    controlLabel="ATENEO"
                    arrayOptions={[
                        { name: "Bari", val: 70002},
                        { name: "Firenze", val: 70010},
                        { name: "Milano", val: 70015},
                        { name: "Pisa", val: 70024}]} />

                <Button variant="primary" type="submit">
                    Submit
                    </Button>
            </Form>);
    }

}

export default FormData;