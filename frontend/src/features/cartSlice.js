import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //Check if
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `${state.cartItems[itemIndex].name}: added Quantity (${state.cartItems[itemIndex].cartQuantity})`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${tempProduct.name}: added new Product to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartTtems = state.cartItems.filter((cartItem) => {
        return cartItem.id !== action.payload.id;
      });

      state.cartItems = nextCartTtems;
      localStorage.setItem("cartItems", JSON.stringify(nextCartTtems));

      toast.error(`${action.payload.name}: removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => {
        return cartItem.id === action.payload.id;
      });

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name}: decreased quantity from cart`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartTtems = state.cartItems.filter((cartItem) => {
          return cartItem.id !== action.payload.id;
        });

        state.cartItems = nextCartTtems;
        toast.error(`${action.payload.name}: removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      if (localStorage.getItem("cartItems")) {
        localStorage.removeItem("cartItems");
      }
      toast.error(`Removed all items from cart`, {
        position: "bottom-left",
      });
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (accCartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          accCartTotal.total += itemTotal;
          accCartTotal.quantity += cartQuantity;
          return accCartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
