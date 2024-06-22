export default function Item({ item, removeItems, checkItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => checkItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item["quantity"]} {item["desc"]}
      </span>
      <button onClick={() => removeItems(item.id)}>❌</button>
    </li>
  );
}
