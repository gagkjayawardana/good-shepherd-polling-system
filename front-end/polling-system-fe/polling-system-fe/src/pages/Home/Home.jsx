import React from 'react';
import styled from 'styled-components';
import Poll from '../../components/Poll/Poll';

const Home_Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
`;

function Home() {
  return (
    <Home_Page>
      <div className="homePoll">
        <Poll />
      </div>
    </Home_Page>
  );
}

export default Home;
