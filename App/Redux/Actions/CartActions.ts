import {
  CartItemProps,
  addItemToCart,
  clearCartItems,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  setCartItems,
} from '@Redux/Slices/CartSlice';
import {useDispatch} from 'react-redux';
import Storage from '@Utils/Storage';
import {StorageKeys} from '@Utils/Storage/storage';

export const useAddCartItem = () => {
  const dispatch = useDispatch();
  return (item: CartItemProps) => dispatch(addItemToCart(item));
};

export const useRemoveCartItem = () => {
  const dispatch = useDispatch();
  return (id: string, size: string) => dispatch(removeItemFromCart({id, size}));
};

export const useClearCart = () => {
  const dispatch = useDispatch();
  return async () => {
    dispatch(clearCartItems());
    await Storage.removeItemsFromStorage([
      StorageKeys.CART_ITEM_LIST,
      StorageKeys.CART_TOTAL,
    ]);
  };
};

export const useIncreaseItemQuantity = () => {
  const dispatch = useDispatch();
  return (id: string, size: string) =>
    dispatch(increaseItemQuantity({id, size}));
};

export const useDecreaseItemQuantity = () => {
  const dispatch = useDispatch();
  return (id: string, size: string) =>
    dispatch(decreaseItemQuantity({id, size}));
};

export const useSetEntireCart = () => {
  const dispatch = useDispatch();
  return (items: CartItemProps[], total: number) =>
    dispatch(setCartItems({items, total}));
};
