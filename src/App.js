import React, { Component } from 'react';
import './App.css';
import FormData from "./FormData";
import { Container, Col, Row, Button } from 'react-bootstrap';

//import * as d3 from "d3";


class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: 10
        }
        this.increase = this.increase.bind(this);
    }

    increase (event) {
        let v = this.state.data + 1
        this.setState({data: v});
    }


    render() {
        return (
           <Container>
               <Row>
                   <Col>
                        <FormData name={"Alma"} value={this.state.data}/>
                        <Button variant="primary" onClick={this.increase}>Increment</Button>
                   </Col>

                   <Col xs={8}>
                        Hi
                   </Col>
               </Row>
           </Container>
            // <div className="App">
            //   <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <p>
            //       Edit <code>src/App.js</code> and save to reload.
            //     </p>
            //     <a
            //       className="App-link"
            //       href="https://reactjs.org"
            //       target="_blank"
            //       rel="noopener noreferrer"
            //     >
            //       Learn React
            //     </a>
            //   </header>
            // </div>
        );
    }
}

export default App;
