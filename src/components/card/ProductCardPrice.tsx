import React, { useState } from "react";
import { Info, X } from "lucide-react";

interface ProductCardPriceProps {
  name: string;
  image: string;
  priceClean: number;
  priceDirty: number;
  additionalInfo: string;
}

const ProductCardPrice: React.FC<ProductCardPriceProps> = ({
  name,
  image,
  priceClean,
  priceDirty,
  additionalInfo,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center
        transition-transform duration-150 hover:scale-105 sm:p-6 w-full max-w-sm transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`absolute inset-0 bg-gray-800 text-white rounded-lg flex flex-col items-center backface-hidden ${
          isFlipped ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={() => setIsFlipped(true)}
          className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
        >
          <Info size={20} />
        </button>
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-white mb-2 w-full truncate">
          {name}
        </h3>
        <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>
        <img
          src={image}
          alt={name}
          className="w-3/4 sm:w-2/3 lg:w-1/2 h-auto object-contain rounded-md mb-4"
        />
        <div className="w-full border-t border-gray-500 my-2 sm:my-4"></div>
        <div className="text-center">
          <p>
            <span className="font-semibold text-green-500">Propre:</span> {priceClean} €
          </p>
          <p>
            <span className="font-semibold text-red-500">Sale:</span> {priceDirty} €
          </p>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-gray-900 text-white rounded-lg p-4 flex flex-col items-center backface-hidden ${
          isFlipped ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={() => setIsFlipped(false)}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-md"
        >
          <X size={20} />
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Informations supplémentaires</h3>
          <p className="text-sm text-gray-300">{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPrice;
