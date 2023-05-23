import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // initialize useNavigate and useDispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to call to access the mutation
  const [register, { isLoading }] = useRegisterMutation();

  //get user data
  const { userInfo } = useSelector((state) => state.auth);

  //redirect to home page when logged in successfully
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [
    //dependencies
    navigate,
    userInfo,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // check password and confirm password
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
    } else {
      try {
        //take login data and call login from mutations
        const res = await register({ name, email, password }).unwrap();
        //unwrap - unwraps the promise

        dispatch(setCredentials({ ...res })); //setting the user to localStorage to the state
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* loading spinner */}
        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Have an existing account? <Link to="/login">Login</Link> here.
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};
export default RegisterScreen;
