import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import { Button, Form, Card } from 'react-bootstrap';

import Layout from '../components/Layout';
import { isEmail, isEmpty, isMatch, isLength } from './../utils/validation';
import AlertNotification, {
  AlertVariant
} from '../components/AlertNotification';

const initialUserState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const initialAlertState = {
  alertVariant: AlertVariant.danger,
  message: '',
  isAlertShown: false
};

const Register = () => {
  const [user, setUser] = useState(initialUserState);
  const [alert, setAlert] = useState(initialAlertState);

  const { username, email, password, confirmPassword } = user;

  const { alertVariant, message, isAlertShown } = alert;

  const closeAlert = () => {
    setAlert({
      ...alert,
      isAlertShown: false
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isEmpty(username) || isEmpty(password)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Please fill in all fields'
      });
    }

    if (!isEmail(email)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Invalid email format'
      });
    }

    if (isLength(password)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Password must be at least 6 characters'
      });
    }

    if (!isMatch(password, confirmPassword)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Passwords do not match'
      });
    }
    try {
      const res = await axios.post(`${process.env.API_ROOT}/user/register`, {
        user: { username, email, password }
      });

      setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.success,
        message: res.data.message
      });
      setUser(initialUserState);
    } catch (err) {
      err.response.data.message &&
        setAlert({
          ...alert,
          isAlertShown: true,
          alertVariant: AlertVariant.danger,
          message: err.response.data.message
        });
    }
  };

  return (
    <Layout>
      <div className="pt-5 mx-auto  col-md-6 offset-md-3">
        <AlertNotification
          variant={alertVariant}
          title={'Notification'}
          message={message}
          show={isAlertShown}
          closeAlert={closeAlert}
        />
        <Card className="p-4">
          <h3 className="mx-auto">Register</h3>
          <Form
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                placeholder="Enter username"
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                onChange={handleChangeInput}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <NextLink href="/login">
                Already registered? Go to Login page.
              </NextLink>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
