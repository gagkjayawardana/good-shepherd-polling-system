import React, { useEffect } from 'react';
import styled from 'styled-components';
import Poll from '../../components/Poll/Poll';
import PieChart from '../../components/PieChart/PieChart';
import VoteTime from '../../components/Time/VoteTime';
import { useDispatch, useSelector } from 'react-redux';
import { getEventAction, selectEvent } from '../../redux/event/eventSlice';
import Header from '../../Header/Header';
import Footer from '../../components/Footer/Footer';

const Home_Page = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
`;

const Home_Container = styled.div`
  display: flex;
  padding-top: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const endTime = event.endTime;

  useEffect(() => {
    dispatch(getEventAction());
  }, []);
  return (
    <Home_Page>
      <div className="homePoll">
        <Header />
        {endTime && <VoteTime targetDate={endTime} />}
        <Home_Container>
          <Poll />
          <PieChart />
        </Home_Container>
        <Footer />
      </div>
    </Home_Page>
  );
}

export default Home;
