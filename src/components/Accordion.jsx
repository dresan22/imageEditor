import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, TextField } from '@mui/material';
import useSettings from '../store/Context';

export default function SimpleAccordion() {
  const listOfSettings = ['Resize', 'Rotate', 'Effects'];

  const {
    height,
    setHeight,
    width,
    setWidth,
    angle,
    setAngle,
    image,
    setEditedImage,
    addGrayscale,
    rotateImage,
  } = useSettings();

  return (
    <Box
      sx={{
        my: 'auto',
      }}
    >
      {listOfSettings.map((setting) => {
        return (
          <Accordion key={setting}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>{setting}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {setting === 'Resize' && (
                  <>
                    <TextField
                      // id='outlined-basic'
                      label='Width'
                      type='number'
                      // variant='outlined'
                      value={width}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        mb: '1rem',
                      }}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        mb: '1rem',
                      }}
                      // id='outlined-basic'
                      type='number'
                      label='Height'
                      // variant='outlined'
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </>
                )}
                {setting === 'Rotate' && (
                  <>
                    <TextField
                      sx={{ my: 1 }}
                      id='outlined-basic'
                      label='Angle'
                      variant='outlined'
                      value={angle}
                      type='number'
                      onChange={(e) => {
                        setAngle(e.target.value);
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Button
                        sx={{ my: 1 }}
                        variant='contained'
                        onClick={() => setAngle(angle - 90)}
                      >
                        -90°
                      </Button>
                      <Button
                        sx={{ my: 1 }}
                        variant='contained'
                        onClick={() => setAngle(0)}
                      >
                        Reset
                      </Button>
                      <Button
                        sx={{ my: 1 }}
                        variant='contained'
                        onClick={() => setAngle(angle + 90)}
                      >
                        +90°
                      </Button>
                    </Box>
                  </>
                )}
                {setting === 'Effects' && (
                  <>
                    <Button
                      sx={{ my: 1 }}
                      variant='contained'
                      onClick={() => addGrayscale(image)}
                    >
                      Add grayscale
                    </Button>
                  </>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
