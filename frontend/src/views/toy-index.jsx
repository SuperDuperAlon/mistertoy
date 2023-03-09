import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToyFilter } from "../cmps/toy-filter";
import { ToyList } from "../cmps/toy-list";
import { store } from "../store/store.js";
import {
  loadToys,
  removeToy,
  saveToy,
  setFilter,
} from "../store/toy.action.js";
import { useEffect } from "react";

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);

  useEffect(() => {
    onLoadToys(filterBy);
  }, [filterBy]);

  async function onLoadToys(filterBy) {
    try {
      await loadToys(filterBy);
      // showSuccessMsg('toys loaded')
    } catch (err) {
      console.log("there has been an error");
      // showErrorMsg('Cannot load toys')
    }
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId);
      // showSuccessMsg('toy removed')
    } catch (err) {
      // showErrorMsg('Cannot remove toy')
    }
  }

  async function onEditToy(toy) {
    try {
      await saveToy(toy);
      // showSuccessMsg(`toy updated to price: $${savedtoy.price}`)
    } catch (err) {
      // showErrorMsg('Cannot update toy')
    }
  }

  function onSetFilter(filter) {
    setFilter(filter);
  }

  return (
    <section>
      <ToyFilter onSetFilter={onSetFilter} />
      <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
    </section>
  );
}
