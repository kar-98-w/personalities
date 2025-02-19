import { useState } from 'react';
import { sculptureList } from './data.tsx';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('');

  function handleSelectPerson(event) {
    const selectedName = event.target.value;
    setSelectedPerson(selectedName);
    const newIndex = sculptureList.findIndex(sculpture => sculpture.name === selectedName);
    if (newIndex !== -1) {
      setIndex(newIndex);
    }
  }

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % sculptureList.length);
  }

  function handleBackClick() {
    setIndex((prevIndex) => (prevIndex - 1 + sculptureList.length) % sculptureList.length);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];

  return (
    <div className="gallery-container">
      <h2>SOFTWARE DEVELOPERS</h2>
      <h3>Karl Moses Marron - C-PEITEL3</h3>

      
          <Typography variant="h5">
            <i>{sculpture.name}</i>
          </Typography>
          <Typography variant="body2">
            ({index + 1} of {sculptureList.length})
          </Typography>

          <FormControl component="fieldset">
            <FormLabel id="person-radio-group">Famous Personalities</FormLabel>
            <RadioGroup
              aria-labelledby="person-radio-group"
              name="famousPerson"
              value={selectedPerson}
              onChange={handleSelectPerson}
              row
            >
              {sculptureList.map((sculpture) => (
                <FormControlLabel
                  key={sculpture.name}
                  value={sculpture.name}
                  control={<Radio />}
                  label={sculpture.name}
                />
                
              ))}
            </RadioGroup>
            <img src={sculpture.url} alt={sculpture.alt} className="sculpture-image" />
          </FormControl>
          
          
          <button onClick={handleMoreClick}>
            {showMore ? 'Hide' : 'Show'} details
          </button>
          {showMore && (
            <Card variant="outlined" className="sculpture-card">
            <CardContent> <Typography variant="body1">{sculpture.description}</Typography>
            </CardContent>
      </Card>)}
      <div className="button-group">
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}
