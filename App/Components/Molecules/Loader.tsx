import {View, Modal, ActivityIndicator} from 'react-native';
import {useLoader} from '@Utils/ContextAPI/LoaderManagement';

const Loader = () => {
  const {loading} = useLoader();
  return (
    <Modal
      visible={loading}
      animationType="fade"
      presentationStyle="fullScreen">
      <View className="bg-[#00000000] flex-1 items-center justify-center">
        <ActivityIndicator size={'small'} />
      </View>
    </Modal>
  );
};

export default Loader;
