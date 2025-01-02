import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  quantity: number;
  increments: number[]; // Tableau d'incréments, ex : [1, 10]
  decrements: number[]; // Tableau de décréments, ex : [10, 1]
  onIncrement: (value: number) => void;
  onDecrement: (value: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  quantity,
  increments,
  decrements,
  onIncrement,
  onDecrement,
  onInputChange,
}) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center transition duration-200 hover:scale-105">
      <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
      <div className="w-full border-t border-gray-500 my-2"></div>
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-md mb-4"
      />
      <div className="w-full border-t border-gray-500 my-2"></div>
      <div className="flex items-center gap-2 px-4 py-2">
        {decrements.map((value) => (
          <button
            key={`decrement-${value}`}
            onClick={() => onDecrement(value)}
            className="text-red-500 font-semibold hover:text-red-600 px-2"
          >
            -{value}
          </button>
        ))}
        <input
          type="text"
          value={quantity}
          onChange={onInputChange}
          className="w-20 text-center bg-gray-200 rounded-lg p-1 mx-2 appearance-none"
        />
        {increments.map((value) => (
          <button
            key={`increment-${value}`}
            onClick={() => onIncrement(value)}
            className="text-green-500 font-semibold hover:text-green-600 px-2"
          >
            +{value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
