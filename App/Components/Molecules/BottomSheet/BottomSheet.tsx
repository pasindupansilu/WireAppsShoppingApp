import clsx from 'clsx';
import {
  View,
  Modal,
  TouchableOpacity,
  ModalProps,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

export type BottomSheetProps = {
  close?: () => void;
  children: any;
  classes?: string;
  dark?: boolean;
  hideClose?: boolean;
} & ModalProps;

const BottomSheet = ({
  visible = false,
  close,
  children,
  classes = '',
  animationType = 'slide',
  dark = false,
  hideClose = false,
  ...props
}: BottomSheetProps) => {
  return (
    <Modal
      visible={visible}
      className="min-h-[50%] bg-transparent"
      transparent
      presentationStyle="overFullScreen"
      animationType={animationType}
      onRequestClose={close}
      {...props}>
      <ImageBackground
        source={require('./blackbgtransparent.png')}
        className="items-center justify-end flex-1"
        blurRadius={80}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          className={clsx(
            'flex-1 w-full items-end justify-end min-h-[30vh] h-fit max-h-max',
          )}>
          <View
            className={clsx(
              'w-full rounded-t-2xl p-4',
              {
                'bg-white': !dark,
                'bg-card-bg': dark,
                'pb-8': Platform.OS === 'android',
                'pb-10': Platform.OS === 'ios',
              },
              classes || '',
            )}>
            {!hideClose && (
              <TouchableOpacity
                className={clsx(
                  'absolute top-4 right-4 flex-row items-center justify-center w-[24px] h-[24px]  rounded-full p-[3px] z-50',
                  {
                    'bg-[#F3F3F3]': !dark,
                    'bg-icon-bg-12': dark,
                  },
                )}
                onPress={close}>
                <RemixIcon
                  name="close-fill"
                  size={18}
                  color={dark ? '#C9C9E0' : 'black'}
                />
              </TouchableOpacity>
            )}
            <View className="flex-1 items-center justify-center max-h-[5px] p-[5px]">
              <View
                className={clsx('h-[5px] w-[75px] rounded-[100px]', {
                  'bg-[#121212]': !dark,
                  'bg-[#FFFFFF1A]': dark,
                })}
              />
            </View>
            {children}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Modal>
  );
};

export default BottomSheet;
