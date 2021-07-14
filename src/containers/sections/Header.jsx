import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
const Header = () => {
  return (
    <Grid>
      <GridItem bg="blue.500">
        <Heading>R&B</Heading>
        This is Header
      </GridItem>
    </Grid>
  );
};

export default Header;
