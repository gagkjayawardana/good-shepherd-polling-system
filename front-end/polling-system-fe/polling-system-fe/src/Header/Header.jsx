import React from 'react';
import styled from 'styled-components';
import schoolLogo from '../assests/logos/schoolLogo.png';
import clubLogo from '../assests/logos/clubLogo.png';
import Typography from '@mui/material/Typography';

const Header_Container = styled.div`
  width: 100%;
  min-height: 200px;
  height: fit-content;
  background-color: #000099;
  padding: top: 20px;
  padding-bottom: 20px;
`;

const Header_logos = styled.div`
  width: 200px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 20px;
`;

function Header() {
  return (
    <Header_Container>
      <Header_logos>
        <img src={schoolLogo} width="100" height="100" />
        <img src={clubLogo} width="100" height="100" />
      </Header_logos>
      <Typography
        sx={{
          color: '#ffffff',
          textAlign: 'center',
          '@media(max-width: 600px)': {
            fontSize: '20pt'
          }
        }}
        variant="h2"
        gutterBottom>
        Good Shepherd Convent Media Club
      </Typography>
    </Header_Container>
  );
}

export default Header;
