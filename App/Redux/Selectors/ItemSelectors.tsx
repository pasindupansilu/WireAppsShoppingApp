import {ItmeProps} from '@Api/items';
import {RootState} from '@Redux/store';
import {useSelector} from 'react-redux';

export const useGetAllItems = (): ItmeProps[] => {
  const {items, selectedBrand} = useSelector((state: RootState) => state.items);
  return items.filter(
    item => item.brandName === selectedBrand || selectedBrand === 'All',
  );
};

export const useGetItemByID = (id: string): ItmeProps | null => {
  const {items} = useSelector((state: RootState) => state.items);
  if (items.length < 1) {
    return null;
  }
  return items.find(item => item.id === id) || null;
};

export const useGetBrandList = (): string[] => {
  const {items} = useSelector((state: RootState) => state.items);
  return [...new Set(items.map(item => item.brandName) as string[])];
};

export const useGetSelectedBrand = () => {
  const {selectedBrand} = useSelector((state: RootState) => state.items);
  return selectedBrand || 'All';
};
