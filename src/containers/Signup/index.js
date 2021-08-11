import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input/index'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { signup } from '../../actions';
/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const userSignup = (e) => {
    e.preventDefault();
    const user =  { firstName, lastName, email, password} ;
    dispatch(signup(user));
  }
  if (user.loading) {
    return <p>Loading........</p>
  }
  if (auth.authenticate) {
    return <Redirect to={`/`}></Redirect>
  }

  return (
    <Layout>
      <Container>
        <Row style={{marginTop: "70px"}}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  >
                  </Input>
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  >
                  </Input>
                </Col>
              </Row>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </Input>
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Input>
              <Button variant="primary" type="submit" style={{ float: "right" }}>
                Submit
              </Button>
            </Form>


          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Signup