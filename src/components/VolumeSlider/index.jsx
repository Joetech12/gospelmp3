import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function ContinuousSlider({ audioRef, MAX }) {
  const [values, setValues] = React.useState(MAX);

  const handleChange = (e, newValue) => {
    setValues(newValue);
    const { value } = e.target;
    const volume = Number(value) / MAX;
    audioRef.current.volume = volume;
  };

//   const muteVolume = () => {
//     audioRef.current.volume = 0;
//   };

  return (
    <div style={{ marginTop: '20px' }}>
      <Box sx={{ width: 300 }} md={{ width: 500 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {/* <VolumeDown /> */}
          <Slider
            aria-label="Volume"
            value={values}
            onChange={handleChange}
            min={0}
            max={MAX}
            style={{ color: 'black' }}
          />
          <VolumeUp />
        </Stack>
        {/* <Slider disabled defaultValue={30} min={0} max={30} aria-label="Disabled slider" /> */}
      </Box>
    </div>
  );
}
