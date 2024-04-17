import React from 'react';

import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Home from './Home/Home';

import { Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(249,115,4,255)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        boxSizing: 'border-box',
        height: '5%',
        margin: '0'
      }}>
      <Home />
      <LanguageSelector />
    </Box>
  );
};

export default Header;
