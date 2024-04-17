import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

const Home: React.FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate('/')}
      sx={{
        '& > :not(style)': {
          m: 2,
          cursor: 'pointer'
        }
      }}>
      <SvgIcon fontSize="large">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    </Box>
  );
};

export default Home;
