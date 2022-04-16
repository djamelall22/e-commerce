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
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // fetch products from products_context.js
  const { products } = useProductsContext();
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); //at the first load the products array is empty;

  // set grid view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  // set list view
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // Update sort value (option)
  const updateSortValue = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FilterContext.Provider
      value={{ ...state, setListView, setGridView, updateSortValue }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
