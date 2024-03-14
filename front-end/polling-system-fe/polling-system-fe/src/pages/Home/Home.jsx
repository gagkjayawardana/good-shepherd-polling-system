import React from 'react';
import styled from 'styled-components';
import Poll from '../../components/Poll/Poll';
import PieChart from '../../components/PieChart/PieChart';
import VoteTime from '../../components/Time/VoteTime';

const Home_Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
`;

const Home_Container = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Home() {
  return (
    <Home_Page>
      <div className="homePoll">
        <VoteTime targetDate="2024-03-17T12:00:00Z" />
        <Home_Container>
          <Poll />
          <PieChart />
        </Home_Container>
      </div>
    </Home_Page>
  );
}

export default Home;
