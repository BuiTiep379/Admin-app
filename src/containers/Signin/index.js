import React, { useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input/index'
import { login, isUserLoggedIn } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [])
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,password
    }

    dispatch(login(user));
  }
  if (auth.authenticate) {
    return <Redirect to={`/`}></Redirect>
  }
  return (
    <Layout>
      <Container>
        <Row style={{marginTop: "70px"}}>
          <Col md={{span: 6, offset: 3}}>
            <Form onSubmit={userLogin}>
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
              <Button variant="primary" type="submit" style={{float: "right"}}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signin