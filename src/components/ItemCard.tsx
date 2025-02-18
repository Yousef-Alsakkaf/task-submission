import React, { useState, FormEvent } from "react";
import { Item } from "../types";

interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (item: Item) => Promise<void>;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDescription, setEditDescription] = useState(item.description);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await onUpdate({ ...item, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <li className="bg-white shadow rounded p-4 mb-4 transition transform hover:scale-105">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-1">{item.title}</h2>
          <p className="mb-3">{item.description}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ItemCard;
