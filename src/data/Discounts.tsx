// This file defines all available discounts for "propre" sales.
// Discounts are represented as a key-value pair where the key is the discount name
// and the value is the corresponding percentage reduction.

const discounts: { [key: string]: number } = {
  "Milice": 0.2,      // 20% discount
  "Brasserie Cayo": 0.2,
  "Tabac Cayo": 0.2,
  "Repairico": 0.2,
  "Péricain": 0.1,   // 10%
  "Pas de remise": 0, // No discount applied
};

export default discounts;
