import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function addItems(item) {
    setItems((items) => [...items, item]);
  }

  function removeItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function checkItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form addItems={addItems} />
      <PackingList
        items={items}
        key={items.id}
        removeItems={removeItems}
        checkItems={checkItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ addItems }) {
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!desc) return;

    const newItem = {
      id: Date.now(),
      desc: desc,
      quantity: quantity,
      packed: false,
    };

    addItems(newItem);

    setDesc("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, removeItems, checkItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "desc") {
    sortedItems = items
      .slice()
      .sort((a, b) => a["desc"].localeCompare(b["desc"]));
  } else {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              removeItems={removeItems}
              checkItems={checkItems}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input Order</option>
          <option value="desc">Sort by Description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, removeItems, checkItems }) {
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

function Stats({ items }) {
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
