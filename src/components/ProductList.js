import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products: filteredProducts, grid_view: gridView } =
    useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  // List View
  if (!gridView) return <ListView filteredProducts={filteredProducts} />;

  // Grid View
  return <GridView filteredProducts={filteredProducts} />;
};

export default ProductList;
