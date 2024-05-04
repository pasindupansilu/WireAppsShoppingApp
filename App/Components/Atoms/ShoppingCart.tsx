import {useGetCartItemCountAndTotal} from '@Redux/Selectors/CartSelectors';
import clsx from 'clsx';
import {View, Text} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const ShoppingCart = () => {
  const {items} = useGetCartItemCountAndTotal();
  return (
    <View className="relative">
      {items > 0 ? (
        <View
          className={clsx(
            'absolute -right-2 bg-status-error z-50 aspect-square items-center justify-center rounded-full',
            {
              'w-4 -top-1': items <= 9,
              'w-5 -top-2': items > 9,
            },
          )}>
          <Text className="text-white font-bold text-xs">
            {items > 9 ? '+9' : items}
          </Text>
        </View>
      ) : null}
      <RemixIcon
        name={items > 0 ? 'shopping-cart-2-fill' : 'shopping-cart-2-line'}
        size="24"
      />
    </View>
  );
};

export default ShoppingCart;
