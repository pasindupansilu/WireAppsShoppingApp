import BottomSheet from '@Components/Molecules/BottomSheet/BottomSheet';
import {useClearCart} from '@Redux/Actions/CartActions';
import {useGetCartItemCountAndTotal} from '@Redux/Selectors/CartSelectors';
import {StackScreenParams} from '@Screens/Stack';
import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';
import {useCallback} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

type MiniCartPopupProps = {
  open: boolean;
  close: () => void;
};
const MiniCartPopup = ({open, close}: MiniCartPopupProps) => {
  const navigation = useNavigation<StackScreenParams<'Home'>['navigation']>();
  const navigateToCart = useCallback(() => {
    navigation?.navigate('Cart');
    close();
  }, [navigation, close]);
  const {items, total} = useGetCartItemCountAndTotal();
  const clearCart = useClearCart();
  return (
    <BottomSheet visible={open} close={close}>
      <View className="px-3">
        <View className="flex-row items-center justify-between gap-2 mt-6 pb-5 border-b-[1px] border-[#CCCCCC]">
          <Text className="text-2xl text-oxfard-blue font-semibold">
            My Shopping Cart
          </Text>
          <RemixIcon
            name={items > 0 ? 'shopping-cart-2-fill' : 'shopping-cart-2-line'}
            size="24"
            color="#14213D"
          />
        </View>
        {items > 0 ? (
          <View className="z-50">
            <View className="flex-row items-center justify-between mt-6 pb-3">
              <Text className="text-dark-grey">No. of items in cart</Text>
              <Text className="text-dark-grey">{items.toLocaleString()}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2 pb-6 border-b-[1px] border-[#CCCCCC]">
              <Text className="text-sm font-bold text-dark-grey">
                Total price
              </Text>
              <Text className="text-xl font-bold text-dark-grey">
                GPB {total.toString()}
              </Text>
            </View>
            <View
              className={clsx(
                'flex-row items-center justify-between mt-6 w-full',
                {
                  '-mb-2': Platform.OS === 'ios',
                },
              )}>
              <TouchableOpacity
                onPress={clearCart}
                className=" bg-orange px-4 py-3 rounded-lg">
                <View className="flex-row items-center justify-center">
                  <Text className="text-sm font-semibold mr-1">Clear Cart</Text>
                  <RemixIcon name="delete-bin-line" size="16" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className=" bg-oxfard-blue px-4 py-3 rounded-lg min-h-fit"
                onPress={navigateToCart}>
                <View className="flex-row items-center justify-center">
                  <Text className="text-sm text-white mr-1">
                    View Full Cart
                  </Text>
                  <RemixIcon name="arrow-right-line" size="16" color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex-col items-center justify-between mt-8 pb-3">
            <Text className="text-black text-base font-medium">
              No items in cart
            </Text>
            <Text className="text-dark-grey mt-2 text-xs text-center mx-6">
              Continue to shop and add items to cart. You can see the total and
              number of items here.
            </Text>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default MiniCartPopup;
