/* eslint-disable react-native/no-inline-styles */
import ShoppingCart from '@Components/Atoms/ShoppingCart';
import TopBar from '@Components/Molecules/TopBar';
import MiniCartPopup from '@Components/Organisms/MiniCartPopup';
import {useAddCartItem} from '@Redux/Actions/CartActions';
import {useGetItemByID} from '@Redux/Selectors/ItemSelectors';
import {CartItemProps} from '@Redux/Slices/CartSlice';
import {StackScreenParams} from '@Screens/Stack';
import clsx from 'clsx';
import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RemixIcon from 'react-native-remix-icon';
import Toast from 'react-native-toast-message';

export type ProductScreenProps = StackScreenParams<'Product'>;
const Product = ({navigation, route}: ProductScreenProps) => {
  const {
    selectedSize,
    setSelectedSize,
    sizePickerState,
    setSizePickerState,
    imageLoading,
    setImageLoading,
    isMiniCartOpen,
    openMiniCart,
    closeMiniCart,
    dropdownSizeList,
    item,
    onClick,
  } = useProduct({route});

  return (
    <View className="flex-1 bg-white">
      <TopBar
        title={'Product Details'}
        titleAlign="center"
        showBackButton
        backAction={() => navigation.goBack()}
        actionIcons={[
          {
            icon: <ShoppingCart />,
            onPress: openMiniCart,
          },
        ]}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View className="mb-6 relative">
          <View className="bg-white shadow p-3 rounded-2xl">
            <Image
              source={{uri: item?.mainImage, cache: 'reload'}}
              className="w-full aspect-square object-cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
          </View>
          {imageLoading ? (
            <View className="absolute w-full h-full items-center justify-center rounded-2xl bg-[#BBBBBBEE]">
              <ActivityIndicator size={'large'} />
            </View>
          ) : null}
        </View>
        <View className="mb-3 flex-row justify-end">
          <Text
            className={' text-2xl font-semibold'}
            style={{
              color:
                item?.colour && item.colour !== 'multicoloured'
                  ? item.colour
                  : 'orange',
            }}>
            {item?.price.currency} {item?.price.amount}
          </Text>
        </View>
        <View className="flex-row items-baseline justify-between border-b-[0.5px] border-light-grey pb-4">
          <Text
            className="text-xl font-bold text-oxfard-blue"
            textBreakStrategy="highQuality">
            {item?.name}
          </Text>
          <Text
            className="text-base text-justify"
            textBreakStrategy="simple"
            lineBreakStrategyIOS="push-out">
            {item?.brandName}
          </Text>
        </View>
        <Text className="mt-5">{item?.description}</Text>
        <View className="flex-row items-center justify-between mt-4 border-t-[0.5px] border-light-grey pt-5">
          <View className="flex-row items-center justify-start gap-2">
            {item?.colour && item?.colour !== 'multicoloured' ? (
              <View
                className="w-6 aspect-square rounded-full"
                style={{backgroundColor: item?.colour}}
              />
            ) : (
              <React.Fragment>
                <View className="w-6 aspect-square rounded-full bg-blue-500" />
                <View className="w-6 aspect-square rounded-full bg-green-400" />
                <View className="w-6 aspect-square rounded-full bg-purple-400" />
                <View className="w-6 aspect-square rounded-full bg-black" />
              </React.Fragment>
            )}
          </View>
          <View className="flex-1 flex-row items-center justify-end ml-8">
            <DropDownPicker
              placeholder="Select a size"
              setOpen={setSizePickerState}
              open={sizePickerState}
              closeAfterSelecting
              value={selectedSize}
              setValue={setSelectedSize}
              items={dropdownSizeList}
              multiple={false}
              style={{
                borderWidth: 0.5,
                width: 'auto',
                marginLeft: 12,
              }}
            />
          </View>
        </View>
        <View className="mt-4">
          <TouchableOpacity
            className={clsx(
              'w-full flex-row items-center justify-center p-4 rounded-xl',
              {
                'bg-orange': !!selectedSize,
                'bg-light-grey opacity-40': !selectedSize,
              },
            )}
            onPress={onClick}
            disabled={!selectedSize}>
            <Text className="mr-2 text-base font-bold">Add to cart</Text>
            <RemixIcon name="shopping-cart-2-line" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MiniCartPopup open={isMiniCartOpen} close={closeMiniCart} />
    </View>
  );
};

export default Product;

type useProductProps = {
  route: ProductScreenProps['route'];
};
const useProduct = ({route}: useProductProps) => {
  const [selectedSize, setSelectedSize] = useState<any>('');
  const [sizePickerState, setSizePickerState] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(false);

  const openMiniCart = useCallback(() => setIsMiniCartOpen(true), []);
  const closeMiniCart = useCallback(() => setIsMiniCartOpen(false), []);

  const {id} = route.params;
  const item = useGetItemByID(id);

  const dropdownSizeList = useMemo(
    () => [
      ...((item?.sizes || []).map(size => ({
        label: size,
        value: size,
      })) || [{label: 'No sizes available', value: '0'}]),
    ],
    [item],
  );
  const addItemToCart = useAddCartItem();

  const onClick = useCallback(() => {
    addItemToCart({...item, size: selectedSize, quantity: 1} as CartItemProps);
    Toast.show({
      type: 'success',
      text1: 'Added to the cart',
      text2: `${item?.name} - (Size: ${selectedSize}, Qty: 1)`,
    });
  }, [addItemToCart, item, selectedSize]);

  return {
    selectedSize,
    setSelectedSize,
    sizePickerState,
    setSizePickerState,
    imageLoading,
    setImageLoading,
    isMiniCartOpen,
    openMiniCart,
    closeMiniCart,
    dropdownSizeList,
    item,
    onClick,
  };
};
