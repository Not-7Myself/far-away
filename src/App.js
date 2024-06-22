import { useState } from "react";
import Logo from "./components/Logo.js";
import Form from "./components/Form.js";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats.js";

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

  function clearList() {
    setItems([]);
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
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
