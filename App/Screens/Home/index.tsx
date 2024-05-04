/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useLoader} from '@Utils/ContextAPI/LoaderManagement';
import {useIsUserAuthenticated} from '@Utils/Hooks/AuthenticationHooks';
import {StackScreenParams} from '@Screens/Stack';
import TopBar from '@Components/Molecules/TopBar';
import ShoppingCart from '@Components/Atoms/ShoppingCart';
import ItemList from '@Components/Organisms/ItemList';
import MiniCartPopup from '@Components/Organisms/MiniCartPopup';
import {getItemList} from '@Api/items';
import {useUpdateItemListAll} from '@Redux/Actions/ItemActions';
import {useGetCartItemCountAndTotal} from '@Redux/Selectors/CartSelectors';
import Storage from '@Utils/Storage';
import {StorageKeys} from '@Utils/Storage/storage';
import {useSetEntireCart} from '@Redux/Actions/CartActions';
import {CartItemProps} from '@Redux/Slices/CartSlice';

type HomeScreenProps = StackScreenParams<'Home'>;
const Home = ({navigation, route}: HomeScreenProps) => {
  const {isMiniCartOpen, openMiniCart, closeMiniCart, navigateToCart} = useHome(
    {
      navigation,
      route,
    },
  );
  return (
    <View className="flex-1 bg-white">
      <TopBar
        title={<Text className="text-orange text-2xl">Welcome</Text>}
        actionIcons={[
          {
            icon: <ShoppingCart />,
            onPress: openMiniCart,
            onLongPress: navigateToCart,
          },
        ]}
      />
      <ItemList />
      <MiniCartPopup open={isMiniCartOpen} close={closeMiniCart} />
    </View>
  );
};

export default Home;

type useHomeProps = {
  navigation: HomeScreenProps['navigation'];
  route: HomeScreenProps['route'];
};

const useHome = ({navigation, route}: useHomeProps) => {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(
    route.params?.showMiniCart || false,
  );

  const openMiniCart = useCallback(() => setIsMiniCartOpen(true), []);
  const closeMiniCart = useCallback(() => setIsMiniCartOpen(false), []);

  const {items: itemCount} = useGetCartItemCountAndTotal();

  const navigateToCart = useCallback(() => {
    if (itemCount > 0) {
      navigation.navigate('Cart');
    } else {
      setIsMiniCartOpen(true);
    }
  }, [itemCount]);

  const isAuthenticated = useIsUserAuthenticated();
  const {showLoader, hideLoader} = useLoader();

  const updateItems = useUpdateItemListAll();

  const updateEntireCart = useSetEntireCart();

  const getItems = useCallback(async () => {
    try {
      let items = await getItemList();
      let cartItems = await Storage.getItemFromStorage<CartItemProps[]>(
        StorageKeys.CART_ITEM_LIST,
        [],
      );
      let total = await Storage.getItemFromStorage(StorageKeys.CART_TOTAL, 0);
      updateItems(items);
      updateEntireCart(cartItems, total);
    } catch (error) {
      updateItems([]);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (route.params?.showMiniCart) {
      openMiniCart();
    }
  }, [route]);

  useEffect(() => {
    showLoader();
    if (!isAuthenticated) {
      navigation.navigate('Home');
      getItems();
    } else {
      getItems();
    }
    let timer = setTimeout(() => hideLoader(), 3000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isAuthenticated, showLoader, getItems]);

  return {
    isMiniCartOpen,
    openMiniCart,
    closeMiniCart,
    navigateToCart,
  };
};
