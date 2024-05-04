/* eslint-disable react-native/no-inline-styles */
import CartItem from '@Components/Atoms/CartItem';
import TopBar from '@Components/Molecules/TopBar';
import {useClearCart} from '@Redux/Actions/CartActions';
import {
  useGetCartItemCountAndTotal,
  useGetCartItems,
  useGetTotalQty,
} from '@Redux/Selectors/CartSelectors';
import {StackScreenParams} from '@Screens/Stack';
import Storage from '@Utils/Storage';
import {StorageKeys} from '@Utils/Storage/storage';
import {useCallback, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

type CartScreenProps = StackScreenParams<'Cart'>;
const Cart = ({navigation}: CartScreenProps) => {
  const {itemList, total, totalQty, clearCart, saveCartItemList} = useCart({
    navigation,
  });
  return (
    <View className="flex-1 bg-white">
      <TopBar
        title={'My Shopping Cart'}
        titleAlign="center"
        showBackButton
        backAction={() => navigation.goBack()}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          gap: 12,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {itemList.map((item, key) => (
          <CartItem key={key} item={item} />
        ))}
      </ScrollView>
      <View className="border-t-[1px] border-light-grey">
        <View className="flex-row items-center justify-between px-6 mt-5">
          <Text className="text-oxfard-blue font-bold">Total No Items</Text>
          <Text className="text-oxfard-blue">{totalQty}</Text>
        </View>
        <View className="flex-row items-center justify-between pb-3 px-6 mt-1">
          <Text className="text-oxfard-blue font-bold">Total Price</Text>
          <Text className="text-xl text-orange font-bold">GPB {total}</Text>
        </View>
        <View className="flex-row items-center justify-between border-t-[1px] border-light-grey pt-4 mx-6">
          <TouchableOpacity
            className="mb-5 p-4 bg-orange rounded-xl"
            onPress={() => {
              clearCart();
              navigation.navigate('Home', {showMiniCart: true});
            }}>
            <View className="flex-1 flex-row items-center justify-center">
              <RemixIcon name="delete-bin-5-line" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveCartItemList}
            className="flex-1 mb-5 p-4 bg-dark-grey rounded-xl ml-4">
            <View className="flex-row items-center justify-center">
              <Text className="mr-3 text-white text-base font-bold">
                Save Cart
              </Text>
              <RemixIcon name="save-3-fill" color="white" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

type useCartProps = {
  navigation: CartScreenProps['navigation'];
};
const useCart = ({navigation}: useCartProps) => {
  const itemList = useGetCartItems();
  const {total} = useGetCartItemCountAndTotal();
  const totalQty = useGetTotalQty();
  const clearCart = useClearCart();

  useEffect(() => {
    if (itemList.length === 0) {
      navigation.navigate('Home', {showMiniCart: true});
    }
  }, [itemList, navigation]);

  const saveCartItemList = useCallback(async () => {
    try {
      await Storage.setItemToStorage(StorageKeys.CART_ITEM_LIST, itemList);
      await Storage.setItemToStorage(StorageKeys.CART_TOTAL, total);
    } catch (error) {
      console.log(error);
    }
  }, [itemList, total]);

  return {
    itemList,
    total,
    totalQty,
    clearCart,
    saveCartItemList,
  };
};
