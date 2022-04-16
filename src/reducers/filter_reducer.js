import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // load products
  if (action.type === LOAD_PRODUCTS) {
    // i used [...spread values ] to copy the values and not pointing to the same place in memory
    return {
      ...state,
      all_products: [...action.payload],
      filtred_products: [...action.payload],
    };
  }

  // grid view
  if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true };

  // list view
  if (action.type === SET_LISTVIEW) return { ...state, grid_view: false };

  // Update sort value (option)
  if (action.type === UPDATE_SORT) return { ...state, sort: action.payload };

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
