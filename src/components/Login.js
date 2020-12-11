import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.isLogIn ?
                    <Form className="login" onSubmit={this.props.logIn}>
                        <h2 className="text-center h2">LOG IN</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Email
</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" id="currentEmail" placeholder="enter your email" value={this.props.currentEmail} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Password
</Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" id="currentPassword" placeholder="Password" valuse={this.props.currentPassword} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                            <Button type="submit" variant="primary">Log in</Button>
                        </Form.Group>
                        {this.props.err ?
                            <Alert variant='danger'>
                                {this.props.err}
                            </Alert> : ''}

                    </Form> : <Redirect to={this.props.redirect} />
                }


            </React.Fragment>
        )
    }
}
export default Login