import {ItmeProps} from '@Api/items';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type CartItemProps = ItmeProps & {quantity: number; size: string};

type initialStateProps = {
  items: CartItemProps[];
  total: number;
};

const initialState: initialStateProps = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setCartItems: (
      state,
      action: PayloadAction<{items: CartItemProps[]; total: number}>,
    ) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    clearCartItems: state => {
      state.items = [];
      state.total = 0;
    },
    addItemToCart: (state, action: PayloadAction<CartItemProps>) => {
      let index = state.items.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (index > -1) {
        state.items[index].quantity += action.payload.quantity || 1;
        let itemTotal =
          parseInt(action.payload.price.amount, 10) *
          (action.payload.quantity || 1);
        state.total += itemTotal;
      } else {
        state.items = [...state.items, action.payload];
        let itemTotal =
          parseInt(action.payload.price.amount, 10) *
          (action.payload.quantity || 1);
        state.total += itemTotal;
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{id: ItmeProps['id']; size: CartItemProps['size']}>,
    ) => {
      let index = state.items.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (index > -1) {
        let removedItem = state.items[index];
        let itemTotal =
          parseInt(removedItem?.price.amount || '0', 10) *
          (removedItem?.quantity || 1);
        state.total -= itemTotal;
        state.items.splice(index, 1);
      }
    },
    increaseItemQuantity: (
      state,
      action: PayloadAction<{id: ItmeProps['id']; size: CartItemProps['size']}>,
    ) => {
      let index = state.items.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (index > -1) {
        state.items[index].quantity = state.items[index].quantity + 1;
        state.total += parseInt(state.items[index].price.amount, 10);
      }
    },
    decreaseItemQuantity: (
      state,
      action: PayloadAction<{id: ItmeProps['id']; size: CartItemProps['size']}>,
    ) => {
      let index = state.items.findIndex(
        item =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (index > -1) {
        let newQuantity = state.items[index].quantity - 1;
        if (newQuantity <= 0) {
          let removedItem = state.items[index];
          let itemTotal =
            parseInt(removedItem?.price.amount || '0', 10) *
            (removedItem?.quantity || 1);
          state.total -= itemTotal;
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity = state.items[index].quantity - 1;
          state.total -= parseInt(state.items[index].price.amount, 10);
        }
      }
    },
  },
});

export const {
  setCartItems,
  clearCartItems,
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
