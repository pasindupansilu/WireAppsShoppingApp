import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import RemixIcon from 'react-native-remix-icon';
import {ItmeProps} from '@Api/items';
import {useNavigation} from '@react-navigation/native';
import {StackScreenParams} from '@Screens/Stack';

export type ListItemProps = {
  item: ItmeProps;
};

const ListItem = ({item}: ListItemProps) => {
  const navigation = useNavigation<StackScreenParams<'Home'>['navigation']>();
  const navigateItem = useCallback(() => {
    navigation.navigate('Product', {id: item.id});
  }, [item.id, navigation]);
  return (
    <TouchableOpacity
      onPress={navigateItem}
      className="border-[1px] border-light-grey justify-center py-3 px-3 rounded-md bg-white shadow mb-3">
      <View className="flex-row items-center pb-3 border-b-[1px] border-b-light-grey">
        <View className="border-[0px] p-2 mr-3">
          <Image
            source={{uri: item.mainImage, cache: 'reload'}}
            className="w-16 aspect-[2/1] object-cover"
          />
        </View>
        <View className="flex-1 flex-col items-start justify-between">
          <Text
            className="mb-2 text-base text-oxfard-blue font-medium"
            ellipsizeMode="tail"
            numberOfLines={2}>
            <Text className="font-light" ellipsizeMode="tail" numberOfLines={1}>
              {item.brandName}
            </Text>
            {' - '}
            {item.name}
          </Text>
          <Text className="text-xs font-light" ellipsizeMode="tail">
            Available Sizes - {item.sizes.join(', ')}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mt-3">
        <View className="flex-row items-center justify-start gap-2">
          {item.colour && item.colour !== 'multicoloured' ? (
            <View
              className="w-3 aspect-square rounded-full"
              style={{backgroundColor: item.colour}}
            />
          ) : (
            <React.Fragment>
              <View className="w-3 aspect-square rounded-full bg-blue-500" />
              <View className="w-3 aspect-square rounded-full bg-green-400" />
              <View className="w-3 aspect-square rounded-full bg-purple-400" />
              <View className="w-3 aspect-square rounded-full bg-black" />
            </React.Fragment>
          )}
        </View>
        <View className="flex-row items-center justify-end">
          <Text className="text-xs mr-2">See more</Text>
          <RemixIcon name="arrow-right-line" size={16} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
