import {View, Text, TouchableOpacity} from 'react-native';
import RemixIcon from 'react-native-remix-icon';

type StepperProps = {
  value: number;
  incrementAction: () => void;
  decrementAction: () => void;
};
const Stepper = ({value, incrementAction, decrementAction}: StepperProps) => {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={incrementAction}
        className="bg-dark-grey p-0.5 rounded-l-lg">
        <RemixIcon name="add-line" color="white" />
      </TouchableOpacity>
      <View className="px-3 py-[5.5px] bg-light-grey">
        <Text>{value}</Text>
      </View>
      <TouchableOpacity
        onPress={decrementAction}
        className="bg-dark-grey p-0.5 rounded-r-lg">
        <RemixIcon name="subtract-line" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Stepper;
