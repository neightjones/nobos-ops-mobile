import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import ChainReducer from '../entities/Chain/reducer';
import ChecklistReducer from '../entities/Checklist/reducer';

const currentChecklistInstancePersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'currentInstance',
    'photoCache',
    'videoCache',
  ],
};

export default combineReducers({
  entities: combineReducers({
    checklists: persistReducer(
      currentChecklistInstancePersistConfig,
      ChecklistReducer
    ),
    chain: ChainReducer,
  }),
});