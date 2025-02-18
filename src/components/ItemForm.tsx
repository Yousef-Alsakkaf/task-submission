import React, { useState, FormEvent } from "react";

interface ItemFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setIsSubmitting(true);
    try {
      await onAdd(title, description);
      setTitle("");
      setDescription("");
    } catch (error) {
      // Optionally handle error here (e.g., show a toast)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add New Item</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-md transition duration-200 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
