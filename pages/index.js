import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DropDown from '../src/Dropdown';
import Calculator from '../src/Calculator';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8 }}>
        <DropDown title="YTD Calculator">
          <Calculator />
        </DropDown>
      </Box>
    </Container>
  );
}
