// src/App.tsx
import React, { useEffect, useState } from "react";

// Define the Item interface (mapping JSONPlaceholder posts)
interface Item {
  id: number;
  title: string;
  description: string; // mapped from "body"
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  // Fetch items from JSONPlaceholder
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      // Map JSONPlaceholder data to our Item type
      const itemsData: Item[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.body,
      }));
      setItems(itemsData);
    } catch (err) {
      setError("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add a new item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: newTitle,
          body: newDescription,
        }),
      });
      if (!res.ok) throw new Error("Error creating item");
      const data = await res.json();
      // JSONPlaceholder returns a new id; update UI accordingly
      const addedItem: Item = {
        id: data.id,
        title: newTitle,
        description: newDescription,
      };
      setItems([addedItem, ...items]);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      setError("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting item");
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  // Set item to edit mode
  const handleEditItem = (item: Item) => {
    setEditItem(item);
  };

  // Update an item
  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: editItem.title,
          body: editItem.description,
        }),
      });
      if (!res.ok) throw new Error("Error updating item");
      // Update local state
      setItems(
        items.map((item) =>
          item.id === editItem.id ? { ...item, title: editItem.title, description: editItem.description } : item
        )
      );
      setEditItem(null);
    } catch (err) {
      setError("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  // Sorting logic (by title)
  const sortedItems = [...items];
  if (sortOrder === "asc") {
    sortedItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    sortedItems.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      {/* Form to add a new item */}
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 mr-2 mb-2 w-full md:w-auto"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 mr-2 mb-2 w-full md:w-auto"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </form>

      {/* Sorting Options */}
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

      {loading && <p>Loading...</p>}

      {/* List of Items */}
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id} className="border p-4 mb-2 rounded">
            {editItem && editItem.id === item.id ? (
              // Edit mode
              <form onSubmit={handleUpdateItem}>
                <input
                  type="text"
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                  className="border p-2 mb-2 block w-full"
                />
                <textarea
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  className="border p-2 mb-2 block w-full"
                />
                <button type="submit" className="bg-green-500 text-white p-2 mr-2">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="bg-gray-500 text-white p-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Display mode
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p>{item.description}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="bg-yellow-500 text-white p-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white p-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
