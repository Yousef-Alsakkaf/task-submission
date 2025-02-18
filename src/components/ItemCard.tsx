import React, { useState, FormEvent } from 'react';
import { Item } from '../types';

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
    <li className="border p-4 mb-2 rounded">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 mb-2 block w-full"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border p-2 mb-2 block w-full"
            required
          />
          <div>
            <button type="submit" className="bg-green-500 text-white p-2 mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="font-bold">{item.title}</h2>
          <p>{item.description}</p>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white p-2 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 text-white p-2"
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
