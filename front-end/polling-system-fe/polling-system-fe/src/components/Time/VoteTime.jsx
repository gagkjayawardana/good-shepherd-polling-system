import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

const Time_Container = styled.div`
  width: 100%;
  min-height: 130px;
  height: fit-content;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Remaining_Time = styled.div`
  display: flex;
  padding-top: 10px;
`;

function VoteTime({ targetDate }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateRemainingTime() {
    const currentDate = dayjs();
    const diff = dayjs(targetDate).diff(currentDate, 'second');

    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    const seconds = diff % 60;

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  const targetTime = dayjs(targetDate);
  const currentTime = dayjs();

  const endTimeGreaterThanCurrent = targetTime.isAfter(currentTime);

  return (
    <Time_Container>
      <Typography variant="h6" gutterBottom>
        Choose the most popular house in your school
      </Typography>
      <Remaining_Time>
        <Typography variant="h7" gutterBottom>
          Remaining Time:
        </Typography>
        {endTimeGreaterThanCurrent === true ? (
          <Typography
            sx={{ color: '#000099', marginTop: '-6px', marginLeft: '10px' }}
            variant="h5"
            gutterBottom>
            {String(remainingTime.days).padStart(2, '0')} :{' '}
            {String(remainingTime.hours).padStart(2, '0')} :{' '}
            {String(remainingTime.minutes).padStart(2, '0')} :{' '}
            {String(remainingTime.seconds).padStart(2, '0')}
          </Typography>
        ) : (
          <Typography
            sx={{ color: '#000099', marginTop: '-6px', marginLeft: '10px' }}
            variant="h5"
            gutterBottom>
            00 : 00 : 00 : 00
          </Typography>
        )}
      </Remaining_Time>
    </Time_Container>
  );
}

export default VoteTime;
