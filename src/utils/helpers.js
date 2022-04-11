export const formatPrice = (number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number / 100
  );

export const getUniqueValues = () => {};
