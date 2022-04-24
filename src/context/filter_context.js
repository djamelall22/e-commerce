import React, { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtred_products: [],
  all_products: [],
  grid_view: false,
  sort: "price-lowest",

  filters: {
    searchText: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0, //default value
    shipping: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch products from products_context.js
  const { products } = useProductsContext();
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); //at the first load the products array is empty;

  // sort and filter products
  useEffect(() => {
    // filter product by categorie, price, color ...
    dispatch({ type: FILTER_PRODUCTS });

    // sort production by option (a to z) ...
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  // set grid view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  // set list view
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // Update sort by option value
  const updateSortValue = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  //update filters
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // cause button don't have a value property
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    console.log("name " + name, "value " + value);
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  //clear filters
  const clearFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setListView,
        setGridView,
        updateSortValue,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
