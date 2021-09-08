import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

import { isEmail, isEmpty, isMatch, isLength } from './../utils/validation';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../redux/actions/authAction';
import AlertNotification, {
  AlertVariant
} from '../components/AlertNotification';

const initialUserState = {
  email: '',
  password: '',
  error: '',
  success: ''
};

const initialAlertState = {
  alertVariant: AlertVariant.danger,
  message: '',
  isAlertShown: false
};

const Login = () => {
  const [user, setUser] = useState(initialUserState);
  const [alert, setAlert] = useState(initialAlertState);
  const dispatch = useDispatch();
  const router = useRouter();

  const { email, password, error, success } = user;

  const { alertVariant, message, isAlertShown } = alert;

  const closeAlert = () => {
    setAlert({
      ...alert,
      isAlertShown: false
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, error: '', success: '' });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isEmpty(email)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Email field cannot be empty.'
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

    if (isEmpty(password)) {
      return setAlert({
        ...alert,
        isAlertShown: true,
        alertVariant: AlertVariant.danger,
        message: 'Password field cannot be empty.'
      });
    }

    try {
      const res = await axios.post(`${process.env.API_ROOT}/user/login`, {
        user: { email, password }
      });

      setUser({ ...user, error: '', success: res.data.message });

      localStorage.setItem('firstLogin', 'true');

      dispatch(dispatchLogin());
      router.push('/');
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
          <h3 className="mx-auto">Login</h3>
          <Form
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={handleSubmit}
          >
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

            <Form.Group className="mb-3">
              <NextLink href="/forgot-password">Forgot password?</NextLink>
            </Form.Group>

            <Form.Group className="mb-3">
              <NextLink href="/register">
                Not yet registered? Go to Register page.
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

export default Login;
