import {UserState} from '@Redux/Slices/UserSlice';
import {RootState} from '@Redux/store';
import {useSelector} from 'react-redux';

export const useGetUser = (): UserState => {
  const user = useSelector((state: RootState) => state.user);
  return user;
};
