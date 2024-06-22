export default function Stats({ items }) {
  const itemLength = items.length;
  const itemPacked = items.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      <em>
        Already packed {itemPacked}/{itemLength} items on the list
      </em>
    </footer>
  );
}
