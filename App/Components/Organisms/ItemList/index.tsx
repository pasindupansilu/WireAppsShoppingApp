/* eslint-disable react-native/no-inline-styles */
import {
  useGetAllItems,
  useGetBrandList,
  useGetSelectedBrand,
} from '@Redux/Selectors/ItemSelectors';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import ListItem from './ListItem';
import clsx from 'clsx';
import {useUpdateSelectedBrand} from '@Redux/Actions/ItemActions';

const ItemList = () => {
  const itemList = useGetAllItems();
  const brands = useGetBrandList();
  const selectedBrand = useGetSelectedBrand();
  const updateSelectedBrand = useUpdateSelectedBrand();
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-[0.1] border-b-[1px] border-light-grey pb-3"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal>
        <View className="flex-row items-center gap-4">
          {['All', ...brands].map((brand, key) => (
            <TouchableOpacity
              key={`${brand}${key}`}
              onPress={() => updateSelectedBrand(brand)}
              className={clsx(
                'border-[1px] border-oxfard-blue px-4 py-2 rounded-full',
                {
                  'bg-oxfard-blue': selectedBrand === brand,
                },
              )}>
              <Text
                className={clsx('font-medium', {
                  'text-oxfard-blue': selectedBrand !== brand,
                  'text-white': selectedBrand === brand,
                })}>
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {brands.map(brand => {
          if (brand === selectedBrand || selectedBrand === 'All') {
            return (
              <View key={brand} className="flex-col">
                <View className="my-5">
                  <Text className="text-lg text-oxfard-blue font-bold">
                    {brand}
                  </Text>
                </View>
                {itemList
                  .filter(item => item.brandName === brand)
                  .map((item, key) => (
                    <ListItem item={item} key={`${item.id}${key}`} />
                  ))}
              </View>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default ItemList;
