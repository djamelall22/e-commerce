export const formatPrice = (number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number / 100
  );

// data = all_products / type = category, colors or company (elements inside all_products)
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
