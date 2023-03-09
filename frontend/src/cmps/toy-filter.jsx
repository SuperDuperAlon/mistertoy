import { useEffect, useRef, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { utilService } from "../services/util.service.js";
// import { ToyFilterLabel } from "./toy-filter-label.jsx";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function ToyFilter({ onSetFilter }) {
  const theme = useTheme();
  const [filterByToEdit, setFilterByToEdit] = useState(
    toyService.getDefaultFilter()
  );

  onSetFilter = useRef(utilService.debounce(onSetFilter));

  const elInputRef = useRef(null);

  const labels = toyService.getLabels();

  function getStyles(label, labelName, theme) {
    return {
      fontWeight:
        labelName.indexOf(label) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {
    elInputRef.current.focus();
  }, []);

  useEffect(() => {
    // update father cmp that filters change very type
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;


    if (field) {
      value = [field] === "active || done" ? +value : value;
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
    }
    if (!field) {
      setFilterByToEdit((prevFilter) => ({...prevFilter, labels: value}))
    }
  }

  function onFilterBtns(ev) {
    ev.preventDefault();
    setFilterByToEdit(toyService.getDefaultFilter());
    let { value, name: field } = ev.target;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: +value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  return (
    <section className="toy-filter full main-layout">
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="name">Vendor:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="By name"
          value={filterByToEdit.name}
          onChange={handleChange}
          ref={elInputRef}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice}
          onChange={handleChange}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={filterByToEdit.labels}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {labels.map((label) => (
              <MenuItem
                key={label}
                value={label}
                style={getStyles(label, label, theme)}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="todo-filter-btns">
          <button value="" onClick={(ev) => onFilterBtns(ev)}>
            All
          </button>
          <button name="inStock" value={1} onClick={(ev) => onFilterBtns(ev)}>
            In Stock
          </button>
          <button name="outStock" value={1} onClick={(ev) => onFilterBtns(ev)}>
            Out of Stack
          </button>
        </div>
        <button hidden>Filter</button>
      </form>
    </section>
  );
}
