import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToyFilter } from "../pages/toy-filter";
import { ToyList } from "../pages/ToyList";
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

  function onLoadToys(filterBy) {
    loadToys(filterBy)
      .then(() => {
        // showSuccessMsg('toys loaded')
      })
      .catch((err) => {
        // showErrorMsg('Cannot load toys')
        console.log("there has been an error");
      });
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        // showSuccessMsg('toy removed')
      })
      .catch((err) => {
        // showErrorMsg('Cannot remove toy')
      });
  }

  function onEditToy(toy) {
    saveToy(toy)
      .then((toy) => {
        // showSuccessMsg(`toy updated to price: $${savedtoy.price}`)
      })
      .catch((err) => {
        // showErrorMsg('Cannot update toy')
      });
  }

  function onSetFilter(filter) {
    setFilter(filter);
  }

  return (
    <section>
      <ToyFilter onSetFilter={onSetFilter} />
      <Link to={`/toys/edit`}>Add Toy</Link>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
    </section>
  );
}
