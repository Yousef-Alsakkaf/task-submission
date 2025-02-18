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
    return <p className="text-center text-gray-500">No items available.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default ItemList;
