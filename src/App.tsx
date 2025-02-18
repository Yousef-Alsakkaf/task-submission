import React, { useMemo, useState } from "react";
import { useItems } from "./hooks/useItems";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

const App: React.FC = () => {
  const { items, loading, error, addNewItem, updateExistingItem, deleteExistingItem } = useItems();
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Item Management</h1>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center" role="alert">
          {error}
        </div>
      )}

      <ItemForm onAdd={addNewItem} />

      <div className="flex items-center justify-center mb-6">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort by Title:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}
          className="border rounded p-2"
        >
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ItemList items={sortedItems} onDelete={deleteExistingItem} onUpdate={updateExistingItem} />
      )}
    </div>
  );
};

export default App;
