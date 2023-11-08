import 'react-native-gesture-handler';
import Routes from './src/routes/routes';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  )
}