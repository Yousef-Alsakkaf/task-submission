import React from "react";
import { Item } from "../types";
import ItemCard from "./ItemCard";

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (item: Item) => Promise<void>;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onUpdate }) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-200 mt-6">No items available.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default ItemList;
