// Import necessary modules
import React from "react";

// Define props interface for the ProductCard component
interface ProductCardProps {
  name: string; // Name of the product
  image: string; // Image URL for the product
  quantity: number; // Current quantity of the product
  increments: number[]; // Array of increment values
  decrements: number[]; // Array of decrement values
  onIncrement: (value: number) => void; // Callback for increment button clicks
  onDecrement: (value: number) => void; // Callback for decrement button clicks
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback for quantity input changes
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
    <div
      className="
        bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center
        transition-transform duration-200 hover:scale-105 sm:p-6 w-full max-w-sm
      "
    >
      {/* Product name */}
      <h3
        className="
          text-xl sm:text-2xl font-semibold text-center text-white mb-2
          w-full truncate overflow-hidden text-ellipsis
        "
      >
        {name}
      </h3>

      {/* Divider line */}
      <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>

      {/* Product image */}
      <img
        src={image}
        alt={name}
        className="w-3/4 sm:w-2/3 lg:w-1/2 h-auto object-contain rounded-md mb-4"
      />

      {/* Divider line */}
      <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Decrement buttons */}
        {decrements.map((value) => (
          <button
            key={`decrement-${value}`}
            onClick={() => onDecrement(value)}
            className="text-red-500 font-semibold hover:text-red-600 px-3"
          >
            -{value}
          </button>
        ))}

        {/* Quantity input */}
        <input
          type="text"
          value={quantity}
          onChange={onInputChange}
          className="w-16 text-center bg-gray-200 rounded-lg p-1.5 appearance-none"
        />

        {/* Increment buttons */}
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
