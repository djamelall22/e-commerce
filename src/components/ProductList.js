import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtred_products: filtredProducts, grid_view: gridView } =
    useFilterContext();

  if (filtredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  // List View
  if (!gridView) return <ListView filtredProducts={filtredProducts} />;

  // Grid View
  return <GridView filtredProducts={filtredProducts} />;
};

export default ProductList;
