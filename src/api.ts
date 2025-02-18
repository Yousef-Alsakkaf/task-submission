import { Item } from "./types";

const API_BASE = "https://jsonplaceholder.typicode.com/posts";

export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch items");
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.body,
  }));
};

export const addItem = async (
  title: string,
  description: string
): Promise<Item> => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ title, body: description }),
  });
  if (!res.ok) throw new Error("Failed to add item");
  const data = await res.json();
  return { id: data.id, title, description };
};

export const updateItem = async (item: Item): Promise<Item> => {
  const res = await fetch(`${API_BASE}/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ title: item.title, body: item.description }),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return item;
};

export const deleteItem = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
};
