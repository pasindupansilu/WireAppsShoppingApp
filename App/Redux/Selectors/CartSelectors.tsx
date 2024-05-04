import {RootState} from '@Redux/store';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const useGetCartItems = () => {
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  return items;
};

export const useGetCartItemCountAndTotal = () => {
  const {items, total} = useSelector((state: RootState) => state.shoppingCart);
  return {items: items.length, total};
};

export const useGetIsAddedToCart = (id: string) => {
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  return items.findIndex(item => item.id === id) > -1;
};

export const useGetTotalQty = (): number => {
  const [totalQty, setTotalQty] = useState<number>(0);
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  useEffect(() => {
    setTotalQty(current => (current > 0 ? 0 : 0));
    items.forEach(item => {
      setTotalQty(current => (current += item.quantity));
    });
  }, [items]);

  return totalQty;
};
