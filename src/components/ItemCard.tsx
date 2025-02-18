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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await onUpdate({ ...item, title: editTitle, description: editDescription });
      setIsEditing(false);
    } catch (error) {
      // Optionally handle error here
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await onDelete(item.id);
    } catch (error) {
      // Optionally handle error here
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <li className="bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-105">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              {isProcessing ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isProcessing}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isProcessing}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              {isProcessing ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ItemCard;
