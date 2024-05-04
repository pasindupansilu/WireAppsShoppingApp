import clsx from 'clsx';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

import {ActionIconProps} from './TopBar';
import BottomSheet from '../BottomSheet/BottomSheet';

type OptionsSheetProps = {
  visible: boolean;
  close: () => void;
  options: ActionIconProps[];
  classes?: string;
};

const OptionsSheet = ({
  visible = false,
  close = () => {},
  options,
}: OptionsSheetProps) => {
  return (
    <BottomSheet visible={visible} close={close} classes="min-h-0">
      <ScrollView
        className="mt-[11px] max-h-[80vh] p-1"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text className="mb-4 font-semibold text-black text-title">
          Settings
        </Text>
        {options.map((option, index) => (
          <TouchableOpacity
            key={`bottomSheetTopBarOption${index}`}
            className={clsx(
              'p-3 border-[1.5px] border-[#E9F1F4] rounded-2xl flex-row justify-between items-center',
              {
                'mb-2': index < options.length - 1,
              },
            )}
            onPress={() => {
              close();
              if (option?.onPress) {
                option?.onPress();
              }
            }}>
            <View className="flex-row items-center justify-start gap-4">
              {option.icon}
              <Text>{option.label ?? `Option ${index}`}</Text>
            </View>
            <View className="bg-[#F3F3F3] p-[6.4px] rounded-lg">
              <RemixIcon name="arrow-right-s-line" color="" size={18} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

export default OptionsSheet;
