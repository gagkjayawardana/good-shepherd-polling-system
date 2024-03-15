import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { VoteData } from './voteData';
import dayjs from 'dayjs';

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
  const initialCounts = {
    Roses: 0,
    Violets: 0,
    Marguerites: 0,
    Lilies: 0
  };

  const values = VoteData.reduce((accumulator, currentValue) => {
    accumulator[currentValue.vote]++;
    return accumulator;
  }, initialCounts);

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

  const targetTime = dayjs('2024-03-14 17:00:00');
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
      {endTimeGreaterThanCurrent === false && (
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
