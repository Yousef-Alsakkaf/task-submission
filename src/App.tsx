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
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
          Modern Item Manager
        </h1>
      </header>

      <main className="max-w-5xl mx-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center"
            role="alert"
          >
            {error}
          </div>
        )}

        <ItemForm onAdd={addNewItem} />

        <div className="flex items-center justify-center mb-8">
          <label htmlFor="sort" className="mr-3 text-lg text-white font-medium">
            Sort by Title:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">Loading...</div>
        ) : (
          <ItemList items={sortedItems} onDelete={deleteExistingItem} onUpdate={updateExistingItem} />
        )}
      </main>

      <footer className="mt-10 text-center text-white opacity-80">
        © {new Date().getFullYear()} Modern Item Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
