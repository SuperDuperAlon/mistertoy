import { ToyPreview } from "./ToyPreview";
import { ToyIndex } from "../views/toy-index";
import { Link } from "react-router-dom";

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section>
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />
          <div>
            <button
              onClick={() => {
                onRemoveToy(toy._id);
              }}
            >
              x
            </button>
            <button><Link to={`/toys/edit/${toy._id}`}>Edit</Link></button>
            <button><Link to={`/toys/${toy._id}`}>Preview</Link></button>
          </div>

        </li>
      ))}
    </section>
  );
}
