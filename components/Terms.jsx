import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "../styles/Terms.module.css"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function OutlinedCard() {
  return (
      <div className={styles.wrapper}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: {xs: 17,sm:17,md:17,lg:19,xl:21} }} variant="h5" color="error">Terms and Conditions</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography sx={{ fontSize: {xs: 12,sm:13,md:14,lg:14,xl:14} }} color="text.secondary" gutterBottom>
          {bull}By logging in you are agreeing to our terms and conditions.
        </Typography>
          <Typography sx={{ fontSize: {xs: 12,sm:13,md:14,lg:14,xl:14} }} color="text.secondary" gutterBottom>
          {bull}We may use cookies to store some web information on your device.
        </Typography>
        <Typography sx={{ fontSize: {xs: 12,sm:13,md:14,lg:14,xl:14} }} color="text.secondary" gutterBottom>
          {bull}We use third party providers to perform secure login.
        </Typography>
        <Typography sx={{ fontSize: {xs: 12,sm:13,md:14,lg:14,xl:14} }} color="text.secondary" gutterBottom>
          {bull}We may use your location to place a location based order.
        </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
  );
}