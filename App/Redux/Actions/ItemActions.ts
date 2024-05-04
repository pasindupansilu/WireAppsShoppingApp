import {ItmeProps} from '@Api/items';
import {updateItemListAll, updateSelectedBrand} from '@Redux/Slices/ItemSlice';
import {useDispatch} from 'react-redux';

export const useUpdateItemListAll = () => {
  const dispatch = useDispatch();
  return (itemList: ItmeProps[]) => dispatch(updateItemListAll(itemList));
};

export const useUpdateSelectedBrand = () => {
  const dispatch = useDispatch();
  return (brand: string) =>
    dispatch(updateSelectedBrand(!brand ? 'All' : brand));
};
