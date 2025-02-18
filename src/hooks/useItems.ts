import { useState, useEffect, useCallback } from "react";
import { Item } from "../types";
import { fetchItems, addItem, updateItem, deleteItem } from "../api";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    } catch (err) {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addNewItem = async (title: string, description: string) => {
    try {
      const newItem = await addItem(title, description);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      throw new Error("Failed to add item");
    }
  };

  const updateExistingItem = async (item: Item) => {
    try {
      await updateItem(item);
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } catch (err) {
      throw new Error("Failed to update item");
    }
  };

  const deleteExistingItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      throw new Error("Failed to delete item");
    }
  };

  return {
    items,
    loading,
    error,
    addNewItem,
    updateExistingItem,
    deleteExistingItem,
  };
};
