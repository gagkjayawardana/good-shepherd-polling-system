import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../redux/event/eventSlice';
import { selectVotes } from '../../redux/vote/voteSlice';

const PieChart_Container = styled.div`
  width: 50%;
  min-height: 400px;
  height: fit-content;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Display_Winner = styled.div`
  text-align: center;
  padding-bottom: 20px;
`;

function ResultChart() {
  const event = useSelector(selectEvent);
  const voteData = useSelector(selectVotes);

  const initialCounts = {
    Roses: 0,
    Violets: 0,
    Marguerites: 0,
    Lilies: 0
  };

  let values = { ...initialCounts };
  if (Array.isArray(voteData)) {
    values = voteData.reduce((accumulator, currentValue) => {
      accumulator[currentValue.vote]++;
      return accumulator;
    }, initialCounts);
  }

  const data = [
    { name: 'Roses', value: values.Roses },
    { name: 'Violets', value: values.Violets },
    { name: 'Marguerites', value: values.Marguerites },
    { name: 'Lilies', value: values.Lilies }
  ];

  const HouseColors = ['#ff0000', '#800080', '#ffff00', '#008000'];

  let greatestVote = '';
  let greatestCount = 0;

  for (const [vote, count] of Object.entries(values)) {
    if (count > greatestCount) {
      greatestCount = count;
      greatestVote = vote;
    }
  }

  const targetTime = dayjs(event.endTime);
  const currentTime = dayjs();

  const endTimeGreaterThanCurrent = targetTime.isAfter(currentTime);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <PieChart_Container>
      <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
        Check Your House
      </Typography>
      {event.resultStatus === 'yes' ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={HouseColors[index % HouseColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Typography
          sx={{ color: '#000099', textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}
          variant="h5"
          gutterBottom>
          {`Who's going to win?`} <br />
          Vote and take your house to Victory
        </Typography>
      )}
      {event.endTime && endTimeGreaterThanCurrent === false && (
        <Display_Winner>
          <Typography variant="h6" gutterBottom>
            Winner
          </Typography>
          <Typography variant="h4" gutterBottom>
            {greatestVote}
          </Typography>
        </Display_Winner>
      )}
    </PieChart_Container>
  );
}

export default ResultChart;
