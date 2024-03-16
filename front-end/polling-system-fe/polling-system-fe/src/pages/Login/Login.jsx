import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../redux/user/userSlice';

const Login_Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
`;

const Login_Container = styled.div`
  width: 40%;
  min-height: 400px;
  height: fit-content;
  border: 1px solid black;
  border-radius: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Login_Form = styled.div`
  padding-top: 20px;
`;

const LogErrMsg = styled.span`
  color: #b30000;
`;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    userName: '',
    password: ''
  };
  const validationSchema = yup.object().shape({
    userName: yup.string().required('Required'),
    password: yup.string().required('Required')
  });
  const onSubmit = (data) => {
    const userName = data.userName;
    const password = data.password;

    dispatch(loginUserAction({ userName, password, navigate }));
  };
  return (
    <Login_Page>
      <Login_Container>
        <Typography sx={{ color: '#000099' }} variant="h3" gutterBottom>
          Sign In
        </Typography>
        <Login_Form>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
              <Field
                as={TextField}
                name="userName"
                label="Filled"
                variant="filled"
                helperText={
                  <ErrorMessage name="userName" render={(msg) => <LogErrMsg>{msg}</LogErrMsg>} />
                }
                fullWidth
              />
              <Field
                as={TextField}
                sx={{ marginTop: '30px' }}
                name="password"
                type="password"
                label="Filled"
                variant="filled"
                helperText={
                  <ErrorMessage name="password" render={(msg) => <LogErrMsg>{msg}</LogErrMsg>} />
                }
                fullWidth
              />
              <Button
                sx={{
                  width: '100%',
                  marginTop: '50px',
                  textTransform: 'none',
                  backgroundColor: '#000099',
                  '&:hover': {
                    backgroundColor: '#8080ff'
                  }
                }}
                type="submit"
                variant="contained">
                Sign In
              </Button>
            </Form>
          </Formik>
        </Login_Form>
      </Login_Container>
    </Login_Page>
  );
}

export default LoginPage;
