import React, { useState, FormEvent } from 'react';

interface ItemFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2 mb-2 w-full md:w-auto"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mr-2 mb-2 w-full md:w-auto"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
