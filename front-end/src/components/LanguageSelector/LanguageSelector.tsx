import React, { useContext, ReactElement } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Context } from '../LanguageWrapper/LanguageWrapper';

import { LANGUAGES } from '../../constants';

const LanguageSelector: React.FC = (): ReactElement => {
  const context = useContext(Context);
  const languages: string[][] = Object.entries(LANGUAGES);
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={context?.locale}
        onChange={(e: SelectChangeEvent) => context?.selectLanguage(e.target.value)}>
        {languages.map((lang: string[]) => (
          <MenuItem key={lang[0]} value={lang[0]}>
            {lang[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
