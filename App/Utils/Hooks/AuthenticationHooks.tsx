import {useGetUser} from '@Redux/Selectors/UserSelectors';

export const useIsUserAuthenticated = (): boolean => {
  const {firstName} = useGetUser();
  return !!firstName;
};
