import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { toyService } from "../services/toy.service.js";
// import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadToy();
  }, [toyId]);

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId);
      setToy(toy);
    } catch (err) {
      console.log("Had issues in toy details", err);
      // showErrorMsg('Cannot load toy')
      navigate("/toys");
    }
  }

  if (!toy) return <div>Loading...</div>;
  return (
    <section className="toy-details">
      <h1>{toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <img src={`https://robohash.org/${toy.name}`} alt="" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
        perferendis tempora aspernatur sit, explicabo veritatis corrupti
        perspiciatis repellat, enim quibusdam!
      </p>
      <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
    </section>
  );
}
