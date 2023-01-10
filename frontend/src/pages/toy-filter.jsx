import { useEffect, useRef, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { utilService } from "../services/util.service.js";

export function ToyFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(
    toyService.getDefaultFilter()
  );

  onSetFilter = useRef(utilService.debounce(onSetFilter));

  const elInputRef = useRef(null);

  useEffect(() => {
    elInputRef.current.focus();
  }, []);

  useEffect(() => {
    // update father cmp that filters change very type
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = [field] === 'active || done' ? +value : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onFilterBtns(ev) {
    ev.preventDefault()
    setFilterByToEdit(toyService.getDefaultFilter())
    let { value, name: field } = ev.target
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: +value }))
}

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="name">Vendor:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="By name"
          value={filterByToEdit.txt}
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

<div className="todo-filter-btns">
                <button value='' onClick={(ev) => onFilterBtns(ev)}>All</button>
                <button name="inStock" value={1} onClick={(ev) => onFilterBtns(ev)}>In Stock</button>
                <button name="outStock" value={1} onClick={(ev) => onFilterBtns(ev)}>Out of Stack</button>
                </div>
        <button hidden>Filter</button>
      </form>
    </section>
  );
}
