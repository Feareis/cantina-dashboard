import React from "react";
import ProductCardPrice from "./../../components/card/ProductCardPrice";

const products = [
  {
    id: 1,
    name: "Produit A",
    priceClean: 25.99,
    priceDirty: 19.99,
    additionalInfo: "Description du produit A, fabriqué avec soin.",
  },
  // Ajoutez d'autres produits ici
];

const MenuPrice: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <p>En cours ...</p>
    </div>
  );
};

export default MenuPrice;
