import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Poll_Container = styled.div`
  width: 50%;
  min-height: 400px;
  height: fit-content;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Vote_Options = styled.div`
  width: 100%;
  margin-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
`;

const Voting_Form = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const VoteErrMsg = styled.span`
  color: #b30000;
`;

function Poll() {
  const [anchorEl, setAnchorEl] = useState(null);
  let pollValue;
  if (anchorEl) {
    pollValue = anchorEl.value;
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const pollPopover = () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      email: ''
    };
    const validationSchema = yup.object().shape({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      email: yup.string().email('Please Enter Valid Email').required('Required')
    });
    const onSubmit = (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email.toLowerCase();
      const vote = pollValue;

      console.log('submit ', firstName, lastName, email, vote);

      data.firstName = '';
      data.lastName = '';
      data.email = '';
    };
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <Voting_Form>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <Form>
              <Typography sx={{ textAlign: 'center' }} variant="h6" gutterBottom>
                {pollValue}
              </Typography>
              <Field
                as={TextField}
                name="firstName"
                sx={{ marginTop: '20px' }}
                label="Enter Your First Name"
                size="small"
                helperText={
                  <ErrorMessage name="firstName" render={(msg) => <VoteErrMsg>{msg}</VoteErrMsg>} />
                }
                fullWidth
              />
              <Field
                as={TextField}
                name="lastName"
                sx={{ marginTop: '20px' }}
                label="Enter Your Last Name"
                size="small"
                helperText={
                  <ErrorMessage name="lastName" render={(msg) => <VoteErrMsg>{msg}</VoteErrMsg>} />
                }
                fullWidth
              />
              <Field
                as={TextField}
                name="email"
                sx={{ marginTop: '20px' }}
                label=" Enter Your Email"
                size="small"
                helperText={
                  <ErrorMessage name="email" render={(msg) => <VoteErrMsg>{msg}</VoteErrMsg>} />
                }
                fullWidth
              />
              <Button
                sx={{
                  width: '100%',
                  marginTop: '30px',
                  textTransform: 'none',
                  backgroundColor: '#000099',
                  '&:hover': {
                    backgroundColor: '#8080ff'
                  }
                }}
                type="submit"
                variant="contained">
                Submit Your Vote
              </Button>
            </Form>
          </Formik>
        </Voting_Form>
      </Popover>
    );
  };
  return (
    <Poll_Container>
      <Typography sx={{ textAlign: 'center' }} variant="h3" gutterBottom>
        Vote Now
      </Typography>
      <Vote_Options>
        <Button
          sx={{
            width: '100%',
            backgroundColor: '#ff0000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#666699'
            }
          }}
          value="Roses"
          onClick={handleClick}
          variant="contained">
          Roses
        </Button>
        {pollPopover()}
        <Button
          sx={{
            width: '100%',
            backgroundColor: '#800080',
            marginTop: '25px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#666699'
            }
          }}
          value="Violets"
          onClick={handleClick}
          variant="contained">
          Violets
        </Button>
        {pollPopover()}
        <Button
          sx={{
            width: '100%',
            backgroundColor: '#ffff00',
            marginTop: '25px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#666699'
            }
          }}
          value="Marguerites"
          onClick={handleClick}
          variant="contained">
          Marguerites
        </Button>
        {pollPopover()}
        <Button
          sx={{
            width: '100%',
            backgroundColor: '#008000',
            marginTop: '25px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#666699'
            }
          }}
          value="Lilies"
          onClick={handleClick}
          variant="contained">
          Lilies
        </Button>
        {pollPopover()}
      </Vote_Options>
    </Poll_Container>
  );
}

export default Poll;
