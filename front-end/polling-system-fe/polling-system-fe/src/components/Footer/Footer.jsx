import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@mui/material/Link';

const Footer_Container = styled.div`
  width: 100%;
  min-height: 300px;
  height: fit-content;
  background-image: linear-gradient(to bottom right, #0000ff, #00004d);
  padding-top: 50px;
  padding-bottom: 70px;
  padding-left: 50px;
  padding-right: 50px;
`;

const Contact_Us = styled.div`
  color: #ffffff;
`;

const Follow_Us = styled.div`
  color: #ffffff;
  margin-left: 100px;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const Footer_Content = styled.div`
  display: flex;
  padding-bottom: 20px;

  @media (max-width: 600px) {
    display: block;
  }
`;

function Footer() {
  const facebookLink = 'https://www.facebook.com/profile.php?id=61557109431844';
  return (
    <Footer_Container>
      <Footer_Content>
        <Contact_Us>
          <Typography variant="subtitle1" gutterBottom>
            <b>Contact Us</b>
          </Typography>
          <Typography sx={{ marginTop: '20px' }} variant="body1" gutterBottom>
            Media Club,
            <br />
            Good Shepherd Convent,
            <br />
            52 Wasala Rd,
            <br />
            Colombo 13
          </Typography>
        </Contact_Us>
        <Follow_Us>
          <Typography variant="subtitle1" gutterBottom>
            <b>follow us on Facebook</b>
          </Typography>
          <Link href={facebookLink}>
            <IconButton sx={{ marginLeft: '-10px' }} aria-label="facebook">
              <FacebookIcon sx={{ fontSize: 40, color: '#ffffff' }} />
            </IconButton>
          </Link>
        </Follow_Us>
      </Footer_Content>
      <hr />
      <Typography sx={{ color: '#ffffff' }} variant="caption" gutterBottom>
        Copyright 2024 — Good Shepherd Convent Media Club. All rights reserved. Website crafted by
        Gayal Jayawardana
      </Typography>
    </Footer_Container>
  );
}

export default Footer;
