import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Radio,
  RadioGroup
} from '@mui/material';
import categories from '../../Data/Category';

const Form2 = ({ category, setCategory, errors = {} }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('');

  const handleMainCategoryChange = (event) => {
    const mainCategory = event.target.value;

    if (mainCategory) {
      setSelectedMainCategory(mainCategory);
      setCategory([mainCategory]);
    } else {
     
      setSelectedMainCategory('');
      setCategory([]); 
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCategory((prev) => [...prev, name]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select the category of your item
      </Typography>
      <FormControl component="fieldset" error={!!errors.category}>
        <FormLabel component="legend">Main Category</FormLabel>
        <RadioGroup
          aria-label="main-category"
          name="main-category"
          value={selectedMainCategory}
          onChange={handleMainCategoryChange}
        >
          {categories.map((mainCategory) => (
            <FormControlLabel
              key={mainCategory.name}
              value={mainCategory.name}
              control={<Radio />}
              label={mainCategory.name}
            />
          ))}
        </RadioGroup>
        {selectedMainCategory && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">{selectedMainCategory}</Typography>
            <FormGroup>
              {categories.find(cat => cat.name === selectedMainCategory)?.subcategories.map((sub) => (
                <FormControlLabel
                  key={sub}
                  control={
                    <Checkbox
                      name={sub}
                      checked={category.includes(sub)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={sub}
                />
              ))}
            </FormGroup>
          </Box>
        )}
      </FormControl>
    </Paper>
  );
};

export default Form2;
