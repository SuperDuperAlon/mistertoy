export function ToyPreview({ toy }) {
  return (
    <>
      <img src={`https://robohash.org/${toy.name}`} alt="" />
      <h4>{toy.name}</h4>
      <h4>${toy.price}</h4>
    </>
  );
}
