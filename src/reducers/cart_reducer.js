import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  ////// add to cart //////
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // check if item is in the cart
    const tempItem = state.cart.find((item) => item.id === id + color);
    // if item is in the cart, update the amount value
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          // check num of items in stock
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          // return tempCart with no change
          return tempCart;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      // create a new item in the cart
      const newItem = {
        id: id + color, // new id created to differentiate between different colors (cart item id)
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  ////// remove item from the cart //////
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  ////// clear cart //////
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  ////// toggle amount //////
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increment") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) newAmount = item.max;
          return { ...item, amount: newAmount };
        }
        if (value === "decrement") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) newAmount = 1;
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }

  // COUNT_CART_TOTALS
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_amount, total_items };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
