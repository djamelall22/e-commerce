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
    // get max price and price
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    // i used [...spread values ] to copy the values and not pointing to the same place in memory
    return {
      ...state,
      all_products: [...action.payload],
      filtred_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }

  // grid view
  if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true };

  // list view
  if (action.type === SET_LISTVIEW) return { ...state, grid_view: false };

  // Update sort value (option)
  if (action.type === UPDATE_SORT) return { ...state, sort: action.payload };

  // filter products
  if (action.type === FILTER_PRODUCTS) {
    console.log("filtering products");
    return { ...state };
  }

  //  sort product by option
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtred_products } = state;
    let tempProducts = [...filtred_products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filtred_products: tempProducts };
  }

  // update filters
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state, [name]: value } };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
