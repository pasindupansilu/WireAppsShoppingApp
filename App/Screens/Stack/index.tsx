import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import Cart from '@Screens/Cart';
import Home from '@Screens/Home';
import Product from '@Screens/Product';

export type StackParamList = {
  Home:
    | {
        showMiniCart?: boolean;
      }
    | undefined;
  Product: {
    id: string;
  };
  Cart: undefined;
};

const Stack = createStackNavigator<StackParamList>();

type StackListItemProps = {
  name: keyof StackParamList;
  component: ({
    navigation,
    route,
  }: StackScreenParams<StackListItemProps['name']> | any) => JSX.Element;
};

export type StackScreenParams<T extends keyof StackParamList> =
  StackScreenProps<StackParamList, T>;

const StackList: StackListItemProps[] = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Product',
    component: Product,
  },
  {
    name: 'Cart',
    component: Cart,
  },
];

const AppStack = () => {
  return (
    <Stack.Navigator>
      {StackList.map((stackItem, key) => (
        <Stack.Screen
          key={`${key}${stackItem.name}`}
          name={stackItem.name}
          component={stackItem.component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppStack;
