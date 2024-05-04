import {Provider} from 'react-redux';
import {store} from './Redux/store';
import AppStack from '@Screens/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoaderStateProvider} from '@Utils/ContextAPI/LoaderManagement';
import Loader from '@Components/Molecules/Loader';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <LoaderStateProvider>
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaView className="flex-1">
            <AppStack />
          </SafeAreaView>
          <Loader />
        </Provider>
      </NavigationContainer>
    </LoaderStateProvider>
  );
};

export default App;
