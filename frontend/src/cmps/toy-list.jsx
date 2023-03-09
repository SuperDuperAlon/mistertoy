import { ToyPreview } from "./toy-preview";
import { Link } from "react-router-dom";

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section className="toy-list">
      {toys.map((toy) => (
        <li className="toy-preview clean-list" key={toy._id}>
          <ToyPreview toy={toy} />
          <div className="flex justify-center">
            <button
              className="crud-btn"
              onClick={() => {
                onRemoveToy(toy._id);
              }}
            >
              x
            </button>
            <button className="crud-btn">
              <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
            </button>
            <button className="crud-btn">
              <Link to={`/toys/${toy._id}`}>Preview</Link>
            </button>
          </div>
        </li>
      ))}

      <Link to={`/toys/edit/`}>
        <li className="toy-preview clean-list plus-sign">+</li>
      </Link>
    </section>
  );
}
