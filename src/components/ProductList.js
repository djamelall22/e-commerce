import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtred_products: filtredProducts } = useFilterContext();
  return <GridView filtredProducts={filtredProducts} />;
};

export default ProductList;
