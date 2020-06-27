import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import ChecklistReducer from '../entities/Checklist/reducers';

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
  }),
});