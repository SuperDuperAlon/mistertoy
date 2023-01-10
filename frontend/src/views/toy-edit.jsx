import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy());
  const navigate = useNavigate();
  const { toyId } = useParams();

  useEffect(() => {
    if (!toyId) return;
    loadToy();
  }, []);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log("Had issues in toy details", err);
        navigate("/toys");
      });
  }

  function handleChange({target}){
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    if (field === 'labels'){
        const newVal = value.split(',')
        console.log(newVal);
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: newVal }))
    }
    else setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
}


  function onSaveToy(ev) {
    ev.preventDefault();
    toyService
      .save(toyToEdit)
      .then((toy) => {
        console.log("toy saved", toy);
        showSuccessMsg("toy saved!");
        navigate("/toys");
      })
      .catch((err) => {
        console.log("err", err);
        showErrorMsg("Cannot save toy");
      });
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit.id ? "Edit this toy" : "Add a new toy"}</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Vendor : </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          value={toyToEdit.name}
          onChange={handleChange}
        />
        <label htmlFor="price">Price : </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          value={toyToEdit.price}
          onChange={handleChange}
        />
        <label htmlFor="labels">labels : </label>
        <input
          type="text"
          name="labels"
          id="labels"
          placeholder="Enter price"
          value={toyToEdit.labels}
          onChange={handleChange}
        />

        <div>
          <button>{toyToEdit._id ? "Save" : "Add"}</button>
          <Link to="/toys">Cancel</Link>
        </div>
      </form>
    </section>
  );
}
