import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CartItemProps} from '@Redux/Slices/CartSlice';
import RemixIcon from 'react-native-remix-icon';
import Stepper from './Stepper';
import {
  useIncreaseItemQuantity,
  useDecreaseItemQuantity,
  useRemoveCartItem,
} from '@Redux/Actions/CartActions';
import Toast from 'react-native-toast-message';

type CartItemCompProps = {
  item: CartItemProps;
};
const CartItem = ({item}: CartItemCompProps) => {
  const increaseItemQty = useIncreaseItemQuantity();
  const decreaseItemQty = useDecreaseItemQuantity();
  const removeItem = useRemoveCartItem();
  return (
    <View
      key={`${item.id}`}
      className="border-[1px] border-light-grey p-4  rounded-lg">
      <View className="flex-row items-start justify-between pb-3 border-b-[1px] border-light-grey">
        <View className="flex-[0.7] flex-row  items-center">
          <View className="mr-4">
            <Image
              source={{uri: item.mainImage}}
              className="w-10 aspect-square"
            />
          </View>
          <View>
            <Text className="text-base">
              {item.name} <Text className="text-xs">(Size {item.size})</Text>
            </Text>
          </View>
        </View>
        <View className="pt-1">
          <TouchableOpacity
            onPress={() => {
              removeItem(item.id, item.size);
              Toast.show({
                type: 'success',
                text1: 'Item Removed Successfully',
                text2: `${item.name} - (Size: ${item.size}, Qty: ${item.quantity})`,
              });
            }}>
            <RemixIcon name="close-line" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center">
          <Text className="text-xs mr-2">Qty. </Text>
          <Stepper
            value={item.quantity}
            incrementAction={() => increaseItemQty(item.id, item.size)}
            decrementAction={() => decreaseItemQty(item.id, item.size)}
          />
          <Text className="text-xs mr-2">
            {'  X'} {item.price.currency} {parseInt(item.price.amount, 10)}
          </Text>
        </View>
        <Text className="text-base font-bold text-orange">
          {item.price.currency} {item.quantity * parseFloat(item.price.amount)}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;
