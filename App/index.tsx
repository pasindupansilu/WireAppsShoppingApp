import {Provider} from 'react-redux';
import {store} from './Redux/store';
import AppStack from '@Screens/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoaderStateProvider} from '@Utils/ContextAPI/LoaderManagement';
import Loader from '@Components/Molecules/Loader';
import {SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <LoaderStateProvider>
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaView className="flex-1">
            <AppStack />
          </SafeAreaView>
          <Loader />
          <Toast />
        </Provider>
      </NavigationContainer>
    </LoaderStateProvider>
  );
};

export default App;
