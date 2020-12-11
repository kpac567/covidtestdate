import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
    render() {
        return (
            <div>
                {this.props.redirect === "/" ?
                    <Form onSubmit={this.props.handleSubmit} id="signup">
                        <h2 className="text-center h2">CREATE NEW ACCOUNT</h2>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Email</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="email" placeholder="Enter email" id="email" value={this.props.email} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>UserName</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="string" placeholder="Enter user name" id="userName" value={this.props.userName} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Age</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" id="age" value={this.props.age} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Location</Form.Label>
                            <Col sm={8}>
                                <input type="text" name="name" list="countries" value={this.props.location} placeholder="Enter your location" id="location" onChange={this.props.handleChange} />
                                <datalist id="countries">
                                    {this.props.countries ?
                                        this.props.countries.map(country => {
                                            return (
                                                <option>{country.name}</option>
                                            )
                                        }) :  ''}
                                </datalist>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Gender</Form.Label>
                            <Col>
                                <Form.Check inline label="Female" id="female" checked={this.props.female} onChange={this.props.toggleGender} />
                                <Form.Check inline label="Male" id="male" checked={this.props.male} onChange={this.props.toggleGender} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} encType="multipart/form-data">
                            <Form.Label column sm={4}>Avatar</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="file" onChange={this.props.handleChange} id="image" required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>What are you looking for</Form.Label>
                            <Col sm={8}>
                                <Form.Check inline label="Female" checked={this.props.lookingForFemale} onChange={this.props.toggleLookingForGender} />
                                <Form.Check inline label="Male" checked={this.props.lookingForMale} onChange={this.props.toggleLookingForGender} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>From</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="number" id="lookingForAgeFrom" value={this.props.lookingForAgeFrom} onChange={this.props.handleChange} required />
                                    </Col>
                                    <Form.Label column sm={2}>To</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="number" id="lookingForAgeTo" value={this.props.lookingForAgeTo} onChange={this.props.handleChange} required />
                                    </Col>
                                </Form.Group>

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="password" placeholder="Password" id="password" value={this.props.password} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                                <Button variant="primary" type="submit"> Submit</Button>

                        </Form.Group>

                    </Form>
                    : <Redirect to={this.props.redirect} />
                }

            </div>
        )
    }
}

export default SignUp