import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  // add to cart
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

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
