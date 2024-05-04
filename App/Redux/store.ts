import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './Slices/UserSlice';
import ItemReducer from './Slices/ItemSlice';
import ShoppingCartReducer from './Slices/CartSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    items: ItemReducer,
    shoppingCart: ShoppingCartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
