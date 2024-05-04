import clsx from 'clsx';
import {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import OptionsSheet from './OptionsSheet';
import {RenderIconListOutput, TopBarProps} from './TopBar';

const TopBar = ({
  title = '',
  titleAlign = 'left',
  actionIcons,
  showBackButton = false,
  backAction,
  classNames = 'mx-6',
}: TopBarProps) => {
  const [bottomSheet, setBottomSheet] = useState<boolean>(false);
  const openBottomSheet = () => setBottomSheet(true);
  const closeBottomSheet = () => setBottomSheet(false);

  const renderIconList = (): RenderIconListOutput => {
    if (!!actionIcons && Array.isArray(actionIcons) === true) {
      if (actionIcons?.length > 2) {
        return (
          <>
            <TouchableOpacity onPress={openBottomSheet}>
              <RemixIcon name="list-settings-line" size={24} color="#7294A4" />
            </TouchableOpacity>
            <OptionsSheet
              visible={bottomSheet}
              close={closeBottomSheet}
              options={actionIcons}
            />
          </>
        );
      } else {
        return actionIcons.map((actionIcon, index) => (
          <TouchableOpacity
            key={`topBarOption${index}`}
            onPress={actionIcon.onPress}
            onLongPress={actionIcon.onLongPress}>
            {actionIcon.icon}
          </TouchableOpacity>
        ));
      }
    } else {
      return null;
    }
  };

  return (
    <View
      className={clsx(
        'mt-4 mb-6 flex-row items-center justify-between',
        classNames,
      )}>
      {showBackButton ? (
        <View className="flex-row items-center justify-start">
          <TouchableOpacity
            testID="back-button-touchable"
            className="rounded-[10.2px] p-[6.8px] bg-bg-card-blue-bg border border-bg-09-card-border"
            onPress={backAction}>
            <RemixIcon name="arrow-left-s-line" size={20.4} />
          </TouchableOpacity>
        </View>
      ) : null}
      <Text
        testID="topBar_title"
        className={clsx(
          'flex-1 text-grey-black text-xl not-italic font-bold mr-2',
          {
            'text-left': titleAlign === 'left',
            'text-center': titleAlign === 'center',
            'text-right': titleAlign === 'right',
            'ml-[11px]': showBackButton && titleAlign === 'left',
            'mr-[11px]': actionIcons?.length && titleAlign === 'right',
          },
        )}>
        {title}
      </Text>
      {showBackButton && !actionIcons?.length ? (
        <View className="w-[29.2px] aspect-square" />
      ) : (
        <View className="flex-row items-center justify-end gap-2">
          {renderIconList()}
        </View>
      )}
    </View>
  );
};

export default TopBar;
