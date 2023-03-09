export function ToyPreview({ toy }) {
  return (
    <>
      <img src={`https://robohash.org/${toy.name}`} alt="" />
      <div className="flex space-around pad-y-8">
        <h4 className="capitalize">{toy.name}</h4>
        <h4>${toy.price}</h4>
      </div>
    </>
  );
}
