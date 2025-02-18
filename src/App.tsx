// src/App.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Item } from './types';
import { fetchItems, addItem, updateItem, deleteItem } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const loadItems = async () => {
    try {
      setLoading(true);
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    } catch (err) {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = async (title: string, description: string) => {
    try {
      setLoading(true);
      const newItem = await addItem(title, description);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      setError("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (item: Item) => {
    try {
      setLoading(true);
      await updateItem(item);
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } catch (err) {
      setError("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sorted;
  }, [items, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ItemForm onAdd={handleAdd} />

      <div className="mb-4">
        <label className="mr-2">Sort by Title:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}
          className="border p-2"
        >
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? <p>Loading...</p> : <ItemList items={sortedItems} onDelete={handleDelete} onUpdate={handleUpdate} />}
    </div>
  );
};

export default App;
