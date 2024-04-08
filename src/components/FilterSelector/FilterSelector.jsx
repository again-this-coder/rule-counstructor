import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./FilterSelector.css";

const FilterSelector = ({ filters, selectedFilter, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="filter-selector-label">Select Filter</InputLabel>
      <Select
        labelId="filter-selector-label"
        id="filter-selector"
        value={selectedFilter}
        onChange={onChange}
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelector;
