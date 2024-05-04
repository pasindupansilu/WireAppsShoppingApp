import {UserState, updateUser} from '../Slices/UserSlice';
import {useDispatch} from 'react-redux';

export const useUpdateUser = () => {
  const dispatch = useDispatch();
  return (user: UserState) => dispatch(updateUser(user));
};
