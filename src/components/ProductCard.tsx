import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  quantity: number;
  increments: number[];
  decrements: number[];
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
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 sm:p-6 w-full max-w-sm">
      <h3 className="text-xl sm:text-2xl font-semibold text-center text-white mb-2 w-full truncate overflow-hidden text-ellipsis">{name}</h3>
      <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>
      <img
        src={image}
        alt={name}
        className="w-3/4 sm:w-2/3 lg:w-1/2 h-auto object-contain rounded-md mb-4"
      />
      <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>
      <div className="flex items-center justify-between gap-2 w-full">
        {decrements.map((value) => (
          <button
            key={`decrement-${value}`}
            onClick={() => onDecrement(value)}
            className="text-red-500 font-semibold hover:text-red-600 px-3"
          >
            -{value}
          </button>
        ))}
        <input
          type="text"
          value={quantity}
          onChange={onInputChange}
          className="w-16 text-center bg-gray-200 rounded-lg p-1.5 appearance-none"
        />
        {increments.map((value) => (
          <button
            key={`increment-${value}`}
            onClick={() => onIncrement(value)}
            className="text-green-500 font-semibold hover:text-green-600 px-3"
          >
            +{value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
