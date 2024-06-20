import { set } from "firebase/database";
import { useState } from "react";

const items = [
  { id: 1, desc: "passports", quantity: 2, packed: false },
  { id: 2, desc: "octopus pillow", quantity: 1, packed: true },
  { id: 3, desc: "charger", quantity: 2, packed: true },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form() {
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return <Item item={item} />;
        })}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item["quantity"]} {item["desc"]}
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Already packed X/Y items on the list</em>
    </footer>
  );
}
