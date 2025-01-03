// This file defines the prices for all products used in the ClientsSales component.
// Each product has two price tiers:
// - "propre": The price for clean sales
// - "sale": The price for dirty sales

const ProductPrices: { [key: string]: { propre: number; sale: number } } = {
  "Risotto": {
    propre: 250, // Clean sale price
    sale: 300,   // Dirty sale price
  },
  "Plateau": {
    propre: 350,
    sale: 400,
  },
  "Montara": {
    propre: 150,
    sale: 185,
  },
  "Jus de cerise": {
    propre: 70,
    sale: 85,
  },
  "Bière": {
    propre: 120,
    sale: 150,
  },
  "Bière pils": {
    propre: 150,
    sale: 180,
  },
  "Bière red": {
    propre: 250,
    sale: 300,
  },
  "Bière triple": {
    propre: 350,
    sale: 420,
  },
  "Menu xpress": {
    propre: 450,
    sale: 540,
  },
  "Menu survivaliste": {
    propre: 1200,
    sale: 1450,
  },
  "Menu paradise": {
    propre: 10500,
    sale: 12500,
  },
  "Menu el patron's": {
    propre: 28500,
    sale: 34200,
  },
};

export default ProductPrices;
