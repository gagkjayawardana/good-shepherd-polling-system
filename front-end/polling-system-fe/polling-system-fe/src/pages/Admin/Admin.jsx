import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';

const Admin_Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
`;

const Admin_Container = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
`;

const Admin_Time = styled.div`
  width: fit-content;
  background-color: #66e0ff;
  border-radius: 10px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 20px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Time_Selector = styled.div`
  display: flex;
  margin-top: -20px;

  @media (max-width: 600px) {
    display: block;
  }
`;

const Start_Time = styled.div`
  margin-top: 20px;
`;

const End_Time = styled.div`
  margin-top: 20px;
`;

const Show_Result = styled.div`
  padding-top: 30px;
  padding-bottom: 20px;
`;

const Reset_Data = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Reset_Data_Container = styled.div`
  display: flex;

  @media (max-width: 600px) {
    display: block;
  }
`;

const Admin_Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
`;

function AdminPage() {
  const [startDateValue, setStartDateValue] = useState(null);
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);

  const submitTimes = () => {
    if ((startTimeValue, endTimeValue)) {
      const start = dayjs(startTimeValue.$d);
      const end = dayjs(endTimeValue.$d);

      const startTime = start.format('YYYY-MM-DD HH:mm:ss');
      const endTime = end.format('YYYY-MM-DD HH:mm:ss');

      localStorage.setItem('startTime', startTime);
      localStorage.setItem('endTime', endTime);
    } else {
      alert('Please select start and end time');
    }
  };
  const StartTimeSelector = () => {
    return (
      <Time_Selector>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              value={startDateValue}
              onChange={(newValue) => setStartDateValue(newValue)}
            />
          </DemoContainer>
          <Stack
            spacing={2}
            sx={{
              width: '260px',
              marginTop: '8px',
              marginLeft: '20px',
              '@media (max-width: 600px)': {
                width: '100%',
                marginLeft: '0'
              }
            }}>
            <TimePicker
              value={startTimeValue}
              onChange={setStartTimeValue}
              referenceDate={dayjs(startDateValue)}
            />
          </Stack>
        </LocalizationProvider>
      </Time_Selector>
    );
  };

  const EndTimeSelector = () => {
    return (
      <Time_Selector>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker value={endDateValue} onChange={(newValue) => setEndDateValue(newValue)} />
          </DemoContainer>
          <Stack
            spacing={2}
            sx={{
              width: '260px',
              marginTop: '8px',
              marginLeft: '20px',
              '@media (max-width: 600px)': {
                width: '100%',
                marginLeft: '0'
              }
            }}>
            <TimePicker
              value={endTimeValue}
              onChange={setEndTimeValue}
              referenceDate={dayjs(endDateValue)}
            />
          </Stack>
        </LocalizationProvider>
      </Time_Selector>
    );
  };

  const DisplayResults = () => {
    const [, setDisplayResults] = useState('yes');

    const showResults = (e) => {
      const value = e.currentTarget.value;
      setDisplayResults(value);
      localStorage.setItem('displayResults', value);
    };

    useEffect(() => {
      const savedDisplayResults = localStorage.getItem('displayResults');
      if (savedDisplayResults) {
        setDisplayResults(savedDisplayResults);
      }
    }, []);

    return (
      <Show_Result>
        <Typography variant="h4" gutterBottom>
          Display Results
        </Typography>
        <Typography variant="h6" gutterBottom>
          Do you want to show results?
          <>
            <Button
              sx={{
                textTransform: 'none',
                backgroundColor: '#000099',
                marginLeft: '20px',
                '&:hover': {
                  backgroundColor: '#8080ff'
                },
                '@media (max-width: 600px)': {
                  marginLeft: '0'
                }
              }}
              value="yes"
              onClick={showResults}
              variant="contained">
              Yes
            </Button>
            <Button
              sx={{
                textTransform: 'none',
                backgroundColor: '#000099',
                marginLeft: '20px',
                '&:hover': {
                  backgroundColor: '#8080ff'
                }
              }}
              value="no"
              onClick={showResults}
              variant="contained">
              No
            </Button>
          </>
        </Typography>
      </Show_Result>
    );
  };
  const ResetData = () => {
    return (
      <Reset_Data>
        <Typography variant="h4" gutterBottom>
          Reset Application
        </Typography>
        <Reset_Data_Container>
          <Typography variant="h6" gutterBottom>
            Do you want to delete all records?
          </Typography>
          <Button
            sx={{
              textTransform: 'none',
              backgroundColor: '#000099',
              marginLeft: '20px',
              '&:hover': {
                backgroundColor: '#8080ff'
              },
              '@media (max-width: 600px)': {
                marginLeft: '0'
              }
            }}
            value="yes"
            variant="contained">
            Yes
          </Button>
        </Reset_Data_Container>
      </Reset_Data>
    );
  };
  return (
    <Admin_Page>
      <Admin_Header>
        <Typography sx={{ color: '#000099' }} variant="h3" gutterBottom>
          Admin
        </Typography>
        <Button
          sx={{
            height: '50px',
            backgroundColor: '#000099',
            '&:hover': {
              backgroundColor: '#8080ff'
            }
          }}
          variant="contained"
          size="medium">
          Sign Out
        </Button>
      </Admin_Header>
      <Admin_Container>
        <Admin_Time>
          <Typography variant="h4" gutterBottom>
            Set Times
          </Typography>
          <>
            <Start_Time>
              <Typography variant="h6" gutterBottom>
                Start Time
              </Typography>
              {StartTimeSelector()}
            </Start_Time>
            <End_Time>
              <Typography variant="h6" gutterBottom>
                End Time
              </Typography>
              {EndTimeSelector()}
            </End_Time>
          </>
          <Button
            sx={{
              textTransform: 'none',
              backgroundColor: '#000099',
              marginTop: '20px',
              '&:hover': {
                backgroundColor: '#8080ff'
              }
            }}
            onClick={submitTimes}
            variant="contained">
            Submit
          </Button>
        </Admin_Time>

        <>{DisplayResults()}</>
        <>{ResetData()}</>
      </Admin_Container>
    </Admin_Page>
  );
}

export default AdminPage;
