import {ItmeProps} from '@Api/items';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialStateProps = {
  items: ItmeProps[];
  selectedBrand: ItmeProps['brandName'] | 'All';
};

const initialState: InitialStateProps = {
  items: [],
  selectedBrand: 'All',
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    updateItemListAll: (state, action: PayloadAction<ItmeProps[]>) => {
      state.items = action.payload;
    },
    updateSelectedBrand: (
      state,
      action: PayloadAction<InitialStateProps['selectedBrand']>,
    ) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const {updateItemListAll, updateSelectedBrand} = itemSlice.actions;

export default itemSlice.reducer;
